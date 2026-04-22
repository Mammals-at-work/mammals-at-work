#!/usr/bin/env node
/**
 * PostToolUse hook: validate WCAG AA contrast on edited CSS / Svelte files.
 *
 * Scans same-rule pairs of `color:` + `background(-color)?:` declarations,
 * parses hex / rgb[a] / hsl[a] / named colors, computes WCAG contrast ratio,
 * and emits a non-blocking warning via `systemMessage` when a pair is below AA.
 *
 * Input (stdin JSON from VS Code): { tool_name, tool_input: { file_path, ... }, ... }
 * Output (stdout JSON): { systemMessage?: string, continue: true }
 */

import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const EDIT_TOOLS = new Set([
	'edit',
	'create_file',
	'replace_string_in_file',
	'multi_replace_string_in_file',
	'insert_edit_into_file',
	'apply_patch',
]);

const TARGET_EXTS = new Set(['.svelte', '.css', '.scss', '.html']);

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

function readStdin() {
	return new Promise((resolve) => {
		let data = '';
		if (process.stdin.isTTY) return resolve('');
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', (c) => (data += c));
		process.stdin.on('end', () => resolve(data));
	});
}

function ok(msg) {
	if (msg) process.stdout.write(JSON.stringify({ continue: true, systemMessage: msg }));
	else process.stdout.write(JSON.stringify({ continue: true }));
	process.exit(0);
}

// --- color parsing -----------------------------------------------------------

const NAMED = {
	black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000',
	blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff', magenta: '#ff00ff',
	gray: '#808080', grey: '#808080', silver: '#c0c0c0', transparent: null,
};

function parseColor(raw) {
	if (!raw) return null;
	const s = raw.trim().toLowerCase();
	if (s in NAMED) return NAMED[s] ? hexToRgb(NAMED[s]) : null;
	if (s.startsWith('#')) return hexToRgb(s);
	const rgbMatch = s.match(/^rgba?\(([^)]+)\)$/);
	if (rgbMatch) {
		const parts = rgbMatch[1].split(/[ ,/]+/).filter(Boolean).slice(0, 3);
		if (parts.length < 3) return null;
		const [r, g, b] = parts.map((p) => (p.endsWith('%') ? Math.round(parseFloat(p) * 2.55) : parseInt(p, 10)));
		if ([r, g, b].some(Number.isNaN)) return null;
		return { r, g, b };
	}
	const hslMatch = s.match(/^hsla?\(([^)]+)\)$/);
	if (hslMatch) {
		const parts = hslMatch[1].split(/[ ,/]+/).filter(Boolean).slice(0, 3);
		if (parts.length < 3) return null;
		const h = parseFloat(parts[0]);
		const sat = parseFloat(parts[1]) / 100;
		const l = parseFloat(parts[2]) / 100;
		if ([h, sat, l].some(Number.isNaN)) return null;
		return hslToRgb(h, sat, l);
	}
	return null; // var(--x), gradients, currentColor, etc. — skip
}

function hexToRgb(hex) {
	let h = hex.replace('#', '');
	if (h.length === 3) h = h.split('').map((c) => c + c).join('');
	if (h.length === 4) h = h.slice(0, 3).split('').map((c) => c + c).join('');
	if (h.length === 8) h = h.slice(0, 6);
	if (h.length !== 6) return null;
	const n = parseInt(h, 16);
	if (Number.isNaN(n)) return null;
	return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function hslToRgb(h, s, l) {
	h = ((h % 360) + 360) % 360 / 360;
	if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	const hue2rgb = (t) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};
	return {
		r: Math.round(hue2rgb(h + 1 / 3) * 255),
		g: Math.round(hue2rgb(h) * 255),
		b: Math.round(hue2rgb(h - 1 / 3) * 255),
	};
}

// --- WCAG contrast -----------------------------------------------------------

function relLuminance({ r, g, b }) {
	const f = (v) => {
		v /= 255;
		return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
	};
	return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
	const la = relLuminance(a);
	const lb = relLuminance(b);
	const [hi, lo] = la > lb ? [la, lb] : [lb, la];
	return (hi + 0.05) / (lo + 0.05);
}

// --- rule-block scanner ------------------------------------------------------

/**
 * Extract { color, background(-color)? } pairs within the same CSS rule block.
 * Works for plain CSS and Svelte `<style>` blocks. Ignores `var(...)` (can't resolve).
 */
function findPairs(source) {
	// Strip comments
	const cleaned = source.replace(/\/\*[\s\S]*?\*\//g, '');
	// For .svelte, only look inside <style> blocks
	const styleBlocks = [];
	const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
	let m;
	let hasStyleTag = false;
	while ((m = styleRe.exec(cleaned)) !== null) {
		hasStyleTag = true;
		styleBlocks.push(m[1]);
	}
	const css = hasStyleTag ? styleBlocks.join('\n') : cleaned;

	const pairs = [];
	// Match rule bodies: { ... } with brace depth 1 (good enough for flat CSS)
	const ruleRe = /([^{}]*)\{([^{}]*)\}/g;
	let r;
	while ((r = ruleRe.exec(css)) !== null) {
		const selector = r[1].trim().slice(-80);
		const body = r[2];
		const colorMatch = body.match(/(?:^|[;\s])color\s*:\s*([^;]+?)\s*(?:;|$)/i);
		const bgMatch = body.match(/(?:^|[;\s])background(?:-color)?\s*:\s*([^;]+?)\s*(?:;|$)/i);
		if (!colorMatch || !bgMatch) continue;
		const fg = parseColor(colorMatch[1]);
		const bg = parseColor(bgMatch[1]);
		if (!fg || !bg) continue;
		pairs.push({ selector, fg, bg, fgRaw: colorMatch[1].trim(), bgRaw: bgMatch[1].trim() });
	}
	return pairs;
}

// --- main --------------------------------------------------------------------

(async () => {
	try {
		const raw = await readStdin();
		if (!raw) return ok();
		let payload;
		try { payload = JSON.parse(raw); } catch { return ok(); }

		const toolName = payload.tool_name || payload.toolName || '';
		if (!EDIT_TOOLS.has(toolName)) return ok();

		const filePath =
			payload.tool_input?.file_path ||
			payload.tool_input?.filePath ||
			payload.tool_input?.path ||
			'';
		if (!filePath) return ok();
		if (!TARGET_EXTS.has(extname(filePath).toLowerCase())) return ok();

		let content;
		try { content = readFileSync(filePath, 'utf8'); } catch { return ok(); }

		const pairs = findPairs(content);
		if (pairs.length === 0) return ok();

		const violations = [];
		for (const p of pairs) {
			const ratio = contrast(p.fg, p.bg);
			if (ratio < AA_LARGE) {
				violations.push(
					`  ✗ \`${p.selector}\` — ${p.fgRaw} on ${p.bgRaw} = ${ratio.toFixed(2)}:1 (below AA large 3:1)`,
				);
			} else if (ratio < AA_NORMAL) {
				violations.push(
					`  ⚠ \`${p.selector}\` — ${p.fgRaw} on ${p.bgRaw} = ${ratio.toFixed(2)}:1 (below AA normal 4.5:1, OK only for ≥18px bold or ≥24px)`,
				);
			}
		}

		if (violations.length === 0) return ok();

		const header = `Contrast check — ${filePath}`;
		const msg = [header, ...violations.slice(0, 6)].join('\n');
		return ok(msg);
	} catch {
		return ok(); // never block on hook failure
	}
})();
