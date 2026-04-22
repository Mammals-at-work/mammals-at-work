<script lang="ts">
  import { onMount } from 'svelte';
  import { copy, type Lang, links } from './lib/copy';

  // ---------- State ----------
  let lang = $state<Lang>('es');
  let theme = $state<'dark' | 'light'>('dark');
  let activeSection = $state('hero');
  let scrollY = $state(0);
  let reduceMotion = $state(false);

  let formState = $state({ name: '', email: '', message: '', submitted: false });

  const t = $derived(copy[lang]);

  // ---------- Effects ----------
  onMount(() => {
    // Restore persisted preferences
    const savedLang = localStorage.getItem('maw:lang') as Lang | null;
    const savedTheme = localStorage.getItem('maw:theme') as 'dark' | 'light' | null;
    if (savedLang === 'es' || savedLang === 'en') lang = savedLang;
    if (savedTheme === 'dark' || savedTheme === 'light') theme = savedTheme;

    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if ((e.target as HTMLElement).dataset.reveal !== undefined) {
              e.target.classList.add('in');
            }
            if (e.intersectionRatio > 0.4 && e.target.id) {
              activeSection = e.target.id;
            }
          }
        });
      },
      { threshold: [0.15, 0.4, 0.6] }
    );
    document.querySelectorAll('[data-reveal], section[id]').forEach((el) => io.observe(el));

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  });

  // Reflect lang + theme to <html>
  $effect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('maw:lang', lang);
    localStorage.setItem('maw:theme', theme);
  });

  function toggleLang() {
    lang = lang === 'es' ? 'en' : 'es';
  }
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    formState.submitted = true;
    setTimeout(() => {
      formState = { name: '', email: '', message: '', submitted: false };
    }, 3600);
  }

  // Parallax translation helpers (driven by scrollY)
  const blobY = (rate: number) => `translate3d(0, ${-scrollY * rate}px, 0)`;
</script>

<!-- ============================================================
     Background layers (parallax: dotgrid 0.3, blobs 0.6/0.5/0.4)
     ============================================================ -->
<div class="bg-layers" aria-hidden="true">
  <div class="bg-dotgrid" style="transform: {blobY(0.3)}"></div>
  <img class="bg-blob b1" src="/brand/blob-violet.svg" alt="" style="transform: {blobY(0.6)}" />
  <img class="bg-blob b2" src="/brand/blob-cyan.svg" alt="" style="transform: {blobY(0.5)}" />
  <img class="bg-blob b3" src="/brand/blob-pink.svg" alt="" style="transform: {blobY(0.4)}" />
</div>

<!-- ============================================================ Nav ============================================================ -->
<div class="nav-wrap">
  <nav class="nav" aria-label="primary">
    <div class="nav-left">
      <img src="/brand/logo-mark.svg" alt="" width="32" height="32" />
      <span class="nav-name">mammals@work</span>
    </div>

    <div class="nav-links">
      {#each [['hero', t.nav.home], ['solutions', t.nav.solutions], ['vision', t.nav.vision], ['team', t.nav.team], ['contact', t.nav.contact]] as [id, label]}
        <a
          href="#{id}"
          class:active={activeSection === id}
          onclick={(e) => { e.preventDefault(); scrollTo(id); }}
        >{label}</a>
      {/each}
    </div>

    <div class="nav-right">
      <button class="icon-btn" onclick={toggleTheme} aria-label="toggle theme" title={theme === 'dark' ? 'Light' : 'Dark'}>
        {#if theme === 'dark'}
          <!-- sun -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        {:else}
          <!-- moon -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        {/if}
      </button>
      <button class="lang-toggle" onclick={toggleLang} aria-label="toggle language">
        <span class:on={lang === 'es'}>ES</span>
        <span class="sep">/</span>
        <span class:on={lang === 'en'}>EN</span>
      </button>
      <a class="btn-cta" href={links.email}>{t.nav.cta} <span class="arrow">→</span></a>
    </div>
  </nav>
</div>

<main class="page">
  <!-- ============================================================ Hero — violet dominant ============================================================ -->
  <section id="hero" class="hero container" data-accent="violet">
    <div data-reveal>
      <p class="eyebrow">{t.hero.eyebrow}</p>
      <h1 class="hero-title">
        {t.hero.title_pre}<br /><span class="em">{t.hero.title_em}</span>
      </h1>
      <p class="hero-sub">{t.hero.sub}</p>

      <ul class="hero-meta">
        <li><span class="dot"></span>{t.hero.meta.status}</li>
        <li>◦ {t.hero.meta.location}</li>
        <li>◦ {t.hero.meta.availability}</li>
      </ul>

      <div class="hero-cta">
        <button class="btn btn-primary" onclick={() => scrollTo('solutions')}>
          {t.hero.cta_primary} <span class="arrow">→</span>
        </button>
        <button class="btn btn-secondary" onclick={() => scrollTo('vision')}>
          {t.hero.cta_secondary} <span class="arrow">↓</span>
        </button>
      </div>
    </div>

    <!-- decorative marquee at the bottom -->
    <div class="hero-marquee" aria-hidden="true">
      <div class="track">
        {#each Array(3) as _}
          <span>YACS</span><span>·</span><span>R-A-S-I-S</span><span>·</span>
          <span>HUMAN ⊕ LLM</span><span>·</span><span>p99 &lt; 120ms</span><span>·</span>
          <span>TYPESCRIPT</span><span>·</span><span>EST. 2024</span><span>·</span>
        {/each}
      </div>
    </div>
  </section>

  <!-- ============================================================ Solutions — cyan dominant ============================================================ -->
  <section id="solutions" class="container section" data-accent="cyan">
    <header class="section-head" data-reveal>
      <div>
        <p class="section-number">{t.solutions.number}</p>
        <h2>{t.solutions.title_pre} <span class="accent-cyan">{t.solutions.title_em}</span></h2>
      </div>
      <p class="section-lead">{t.solutions.lead}</p>
    </header>

    <div class="solutions-grid">
      {#each t.solutions.items as item, i}
        <article class="solution-card" data-reveal style="--reveal-delay: {i * 80}ms">
          <div class="card-top">
            <p class="eyebrow mono">{item.tagline}</p>
            <span class="metric">{item.metric}</span>
          </div>
          <h3 class="solution-title">{item.name}</h3>
          <p class="solution-desc">{item.desc}</p>

          <div class="solution-tags">
            {#each item.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>

          <a class="solution-link" href={item.link} target="_blank" rel="noopener noreferrer">
            npm · @mammals-at-work/{item.name.toLowerCase()} <span class="arrow">↗</span>
          </a>
        </article>
      {/each}
    </div>

    <div class="solutions-foot" data-reveal>
      <a class="btn-ghost" href={links.github} target="_blank" rel="noopener noreferrer">
        {t.solutions.cta} <span class="arrow">↗</span>
      </a>
    </div>
  </section>

  <!-- ============================================================ Vision — pink dominant ============================================================ -->
  <section id="vision" class="container section" data-accent="pink">
    <header class="section-head" data-reveal>
      <div>
        <p class="section-number">{t.vision.number}</p>
        <h2>{t.vision.title_pre} <span class="accent-pink">{t.vision.title_em}</span></h2>
      </div>
      <p class="section-lead">{t.vision.lead}</p>
    </header>

    <div class="vision-grid">
      <ol class="pillars">
        {#each t.vision.pillars as pillar, i}
          <li data-reveal style="--reveal-delay: {i * 100}ms">
            <span class="pillar-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h4>{pillar.title}</h4>
              <p>{pillar.desc}</p>
            </div>
          </li>
        {/each}
      </ol>

      <figure class="quote-card" data-reveal>
        <blockquote>
          <span class="mark">“</span>
          {t.vision.quote}
        </blockquote>
        <figcaption>— {t.vision.quote_by}</figcaption>
      </figure>
    </div>
  </section>

  <!-- ============================================================ Team — yellow highlight ============================================================ -->
  <section id="team" class="container section" data-accent="yellow">
    <header class="section-head centered" data-reveal>
      <div>
        <p class="section-number">{t.team.number}</p>
        <h2>{t.team.title_pre} <span class="accent-yellow">{t.team.title_em}</span></h2>
      </div>
      <p class="section-lead">{t.team.lead}</p>
    </header>

    <div class="team-grid">
      {#each t.team.members as m, i}
        <article class="member" data-reveal style="--reveal-delay: {i * 80}ms">
          <div class="member-avatar" data-type={m.type}>
            {#if m.type === 'human'}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            {:else}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="3"/><path d="M12 8V4M8 4h8"/><circle cx="8.5" cy="14" r="1"/><circle cx="15.5" cy="14" r="1"/></svg>
            {/if}
          </div>
          <p class="member-role mono">{m.role}</p>
          <h3 class="member-name">{m.name}</h3>
          <p class="member-bio">{m.bio}</p>
          <ul class="member-skills">
            {#each m.skills as s}
              <li>{s}</li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>
  </section>

  <!-- ============================================================ Contact — violet dominant ============================================================ -->
  <section id="contact" class="container section" data-accent="violet">
    <div class="contact-grid">
      <div data-reveal>
        <p class="section-number">{t.contact.number}</p>
        <h2 class="contact-title">
          {t.contact.title_pre} <span class="accent-violet">{t.contact.title_em}</span>
        </h2>
        <p class="section-lead">{t.contact.lead}</p>

        <div class="contact-channels">
          <a class="channel" href={links.email}>
            <span class="channel-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
            </span>
            <div>
              <p class="eyebrow">{t.contact.email_label}</p>
              <p class="channel-value">mammals-at-work@proton.me</p>
            </div>
          </a>

          <div class="channel">
            <span class="channel-icon alt">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </span>
            <div>
              <p class="eyebrow">{t.contact.socials_label}</p>
              <p class="channel-value">
                <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a> ·
                <a href={links.x} target="_blank" rel="noopener noreferrer">X</a> ·
                <a href={links.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="form-card" data-reveal>
        {#if formState.submitted}
          <div class="form-success">
            <div class="success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>
            </div>
            <h3>{t.contact.form.success_title}</h3>
            <p>{t.contact.form.success_body}</p>
          </div>
        {:else}
          <form onsubmit={handleSubmit}>
            <label class="field">
              <span class="eyebrow">{t.contact.form.name}</span>
              <input
                type="text"
                required
                bind:value={formState.name}
                placeholder={t.contact.form.placeholder_name}
              />
            </label>
            <label class="field">
              <span class="eyebrow">{t.contact.form.email}</span>
              <input
                type="email"
                required
                bind:value={formState.email}
                placeholder={t.contact.form.placeholder_email}
              />
            </label>
            <label class="field">
              <span class="eyebrow">{t.contact.form.message}</span>
              <textarea
                rows="4"
                required
                bind:value={formState.message}
                placeholder={t.contact.form.placeholder_message}
              ></textarea>
            </label>
            <button type="submit" class="btn btn-primary btn-block">
              {t.contact.form.submit} <span class="arrow">→</span>
            </button>
          </form>
        {/if}
      </div>
    </div>
  </section>

  <!-- ============================================================ Footer ============================================================ -->
  <footer class="container footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="/brand/logo-mark.svg" alt="" width="28" height="28" />
          <span>mammals@work</span>
        </div>
        <p class="footer-tagline">{t.footer.tagline}</p>
      </div>

      {#each t.footer.sections as section}
        <div class="footer-col">
          <h5>{section.label}</h5>
          <ul>
            {#each section.links as link}
              <li>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                >{link.name}{link.external ? ' ↗' : ''}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <div class="colophon">
      <span>{t.footer.rights}</span>
      <span>v2.0 · {theme === 'dark' ? 'obsidian' : 'daylight'} · {lang.toUpperCase()}</span>
    </div>
  </footer>
</main>

<style>
  /* ============================================================
     Parallax background
     ============================================================ */
  .bg-layers {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .bg-dotgrid {
    position: absolute;
    inset: -20%;
    background-image: url('/brand/dot-grid.svg');
    background-size: 40px 40px;
    color: var(--obsidian-400);
    opacity: 0.22;
    mask-image: radial-gradient(ellipse at center, black 40%, transparent 78%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 78%);
    will-change: transform;
  }
  :global(html[data-theme='light']) .bg-dotgrid { opacity: 0.35; }
  .bg-blob {
    position: absolute;
    width: 60vw;
    height: 60vw;
    opacity: 0.32;
    filter: blur(80px);
    will-change: transform;
  }
  :global(html[data-theme='light']) .bg-blob { opacity: 0.22; filter: blur(110px); }
  .bg-blob.b1 { top: -15%; left: -12%; animation: drift1 18s var(--ease-in-out) infinite alternate; }
  .bg-blob.b2 { bottom: -22%; right: -18%; animation: drift2 22s var(--ease-in-out) infinite alternate; }
  .bg-blob.b3 { top: 45%; left: 32%; opacity: 0.18; animation: drift3 26s var(--ease-in-out) infinite alternate; }

  @keyframes drift1 { 0% { transform: translate(0,0) scale(1) rotate(0); } 100% { transform: translate(4vw,3vw) scale(1.12) rotate(6deg); } }
  @keyframes drift2 { 0% { transform: translate(0,0) scale(1) rotate(0); } 100% { transform: translate(-5vw,-3vw) scale(1.08) rotate(-8deg); } }
  @keyframes drift3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-3vw,4vw) scale(1.15); } }

  /* ============================================================
     Nav
     ============================================================ */
  .nav-wrap {
    position: sticky;
    top: 16px;
    z-index: var(--z-sticky);
    padding: 0 var(--gutter);
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  .nav {
    width: 100%;
    max-width: var(--container-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
    padding: 10px 14px 10px 14px;
    border-radius: var(--radius-pill);
    background: var(--bg-overlay);
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }
  .nav-left { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .nav-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  .nav-links {
    display: flex;
    gap: var(--space-5);
    flex: 1;
    justify-content: center;
  }
  .nav-links a {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-muted);
    position: relative;
    text-decoration: none;
    transition: color var(--dur-base) var(--ease-out-quart);
  }
  .nav-links a:hover,
  .nav-links a.active { color: var(--fg); }
  .nav-links a.active::after {
    content: '';
    position: absolute;
    left: 0; right: 0; bottom: -6px;
    height: 2px;
    background: var(--neon-violet);
    border-radius: 2px;
    box-shadow: 0 0 8px var(--neon-violet);
  }
  .nav-right { display: flex; align-items: center; gap: 8px; }
  .icon-btn {
    width: 34px; height: 34px;
    border: 1px solid var(--border);
    background: transparent;
    border-radius: var(--radius-pill);
    display: inline-flex; align-items: center; justify-content: center;
    color: var(--fg-muted);
    transition: all var(--dur-base) var(--ease-out-quart);
  }
  .icon-btn:hover { color: var(--neon-violet); border-color: var(--neon-violet); }
  .lang-toggle {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.08em;
    color: var(--fg-muted);
    border: 1px solid var(--border);
    padding: 8px 12px;
    border-radius: var(--radius-pill);
    background: transparent;
    display: inline-flex; gap: 6px; align-items: center;
    transition: all var(--dur-base) var(--ease-spring);
  }
  .lang-toggle:hover { border-color: var(--neon-violet); }
  .lang-toggle .on { color: var(--neon-violet); }
  .lang-toggle .sep { opacity: 0.4; }
  .btn-cta {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 13px;
    padding: 9px 16px;
    border-radius: var(--radius-pill);
    background: var(--fg);
    color: var(--bg);
    text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
    transition: transform var(--dur-base) var(--ease-spring),
                box-shadow var(--dur-base) var(--ease-out-quart),
                background var(--dur-base) var(--ease-out-quart);
  }
  .btn-cta:hover {
    transform: translateY(-2px);
    background: var(--neon-violet);
    color: #0A0A0F;
    box-shadow: var(--glow-violet);
  }
  .btn-cta .arrow { transition: transform var(--dur-base) var(--ease-spring); }
  .btn-cta:hover .arrow { transform: translateX(4px); }

  @media (max-width: 960px) {
    .nav-links { display: none; }
    .btn-cta { display: none; }
  }
  @media (max-width: 560px) {
    .nav-name { display: none; }
  }

  /* ============================================================
     Layout
     ============================================================ */
  .page { position: relative; z-index: 1; }
  .container {
    max-width: var(--container-lg);
    margin: 0 auto;
    padding: 0 var(--gutter);
  }
  .section { padding: var(--space-10) 0; }
  @media (max-width: 720px) { .section { padding: var(--space-8) 0; } }

  .eyebrow { display: inline-flex; align-items: center; gap: 8px; margin: 0; }
  .eyebrow::before {
    content: '';
    width: 24px;
    height: 1px;
    background: currentColor;
    opacity: 0.5;
  }
  .mono { font-family: var(--font-mono); }

  /* ============================================================
     Reveal
     ============================================================ */
  [data-reveal] {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 720ms var(--ease-out-expo) var(--reveal-delay, 0ms),
      transform 720ms var(--ease-out-expo) var(--reveal-delay, 0ms);
  }
  :global([data-reveal].in) {
    opacity: 1;
    transform: translateY(0);
  }

  /* ============================================================
     Hero (violet dominant)
     ============================================================ */
  .hero {
    min-height: 88vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: var(--space-9);
    padding-bottom: var(--space-8);
    position: relative;
  }
  .hero .eyebrow {
    color: var(--neon-violet);
    font-family: var(--font-mono);
    font-size: var(--fs-micro);
    letter-spacing: var(--tracking-eyebrow);
    text-transform: uppercase;
    margin-bottom: var(--space-5);
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: var(--fs-display-2xl);
    font-weight: 500;
    line-height: 0.94;
    letter-spacing: -0.035em;
    margin: 0;
  }
  .hero-title .em {
    background: linear-gradient(92deg, var(--neon-violet), var(--neon-pink) 55%, var(--neon-cyan));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .hero-sub {
    margin-top: var(--space-5);
    max-width: 60ch;
    font-size: var(--fs-body-lg);
    color: var(--fg-muted);
    line-height: var(--lh-loose);
  }
  .hero-meta {
    display: flex; gap: var(--space-6);
    margin: var(--space-7) 0 0;
    padding: 0;
    list-style: none;
    font-family: var(--font-mono);
    font-size: var(--fs-caption);
    color: var(--fg-subtle);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    flex-wrap: wrap;
  }
  .hero-meta li { display: inline-flex; align-items: center; gap: 8px; }
  .hero-meta .dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--neon-cyan);
    box-shadow: 0 0 12px var(--neon-cyan);
    animation: pulse 2.2s var(--ease-in-out) infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.82); } }
  .hero-cta {
    display: flex; gap: var(--space-3);
    margin-top: var(--space-7);
    flex-wrap: wrap;
  }

  .hero-marquee {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    overflow: hidden;
    padding: var(--space-4) 0;
    border-top: 1px solid var(--border);
    mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
  }
  .hero-marquee .track {
    display: inline-flex;
    gap: var(--space-5);
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    color: var(--fg-whisper);
    text-transform: uppercase;
    animation: marquee 40s linear infinite;
  }
  .hero-marquee .track span:nth-child(odd):not(:is(span:nth-child(2n))) { color: var(--neon-violet); }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

  /* ============================================================
     Buttons
     ============================================================ */
  .btn {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 14px;
    padding: 14px 22px;
    border-radius: var(--radius-pill);
    border: 1px solid transparent;
    display: inline-flex; align-items: center; gap: 10px;
    text-decoration: none;
    background: transparent;
    transition: transform var(--dur-base) var(--ease-spring),
                box-shadow var(--dur-base) var(--ease-out-quart),
                background var(--dur-base) var(--ease-out-quart),
                color var(--dur-base) var(--ease-out-quart),
                border-color var(--dur-base) var(--ease-out-quart);
  }
  .btn .arrow { transition: transform var(--dur-base) var(--ease-spring); display: inline-block; }
  .btn:hover .arrow { transform: translateX(4px); }
  .btn:active { transform: scale(0.96); }
  .btn-primary {
    background: var(--neon-violet);
    color: #0A0A0F;
    box-shadow: var(--glow-violet);
  }
  .btn-primary:hover { transform: translateY(-2px); }
  .btn-secondary {
    color: var(--fg);
    border-color: var(--border-strong);
  }
  .btn-secondary:hover { border-color: var(--neon-violet); color: var(--neon-violet); }
  .btn-block { width: 100%; justify-content: center; }

  .btn-ghost {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-muted);
    padding: 10px 0;
    display: inline-flex; gap: 10px; align-items: center;
    text-decoration: none;
    border-bottom: 1px solid var(--border);
    transition: color var(--dur-base) var(--ease-out-quart),
                border-color var(--dur-base) var(--ease-out-quart),
                gap var(--dur-base) var(--ease-spring);
  }
  .btn-ghost:hover { color: var(--neon-cyan); border-color: var(--neon-cyan); gap: 16px; }

  /* ============================================================
     Section heads
     ============================================================ */
  .section-head {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
    align-items: baseline;
  }
  .section-head.centered {
    grid-template-columns: 1fr;
    text-align: center;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: var(--space-9);
  }
  @media (max-width: 720px) {
    .section-head { grid-template-columns: 1fr; gap: var(--space-3); }
  }
  .section-head h2 {
    font-family: var(--font-display);
    font-size: var(--fs-h1);
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.04;
    margin: 0;
  }
  .section-head p.section-lead {
    color: var(--fg-muted);
    font-size: var(--fs-body-lg);
    line-height: var(--lh-normal);
  }
  .section-number {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.2em;
    color: var(--fg-subtle);
    text-transform: uppercase;
    margin: 0 0 var(--space-3);
  }

  /* ============================================================
     Solutions (cyan)
     ============================================================ */
  .solutions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }
  @media (max-width: 820px) { .solutions-grid { grid-template-columns: 1fr; } }
  .solution-card {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition:
      transform var(--dur-slow) var(--ease-out-expo),
      box-shadow var(--dur-slow) var(--ease-out-expo),
      border-color var(--dur-slow) var(--ease-out-expo);
  }
  .solution-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(92deg, var(--neon-cyan), var(--neon-violet));
    opacity: 0.55;
    transition: opacity var(--dur-base) var(--ease-out-quart);
  }
  .solution-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg), var(--glow-cyan);
    border-color: transparent;
  }
  .solution-card:hover::before { opacity: 1; }
  .card-top {
    display: flex; justify-content: space-between; align-items: baseline;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
  }
  .card-top .eyebrow {
    font-family: var(--font-mono);
    font-size: var(--fs-micro);
    letter-spacing: var(--tracking-eyebrow);
    text-transform: uppercase;
    color: var(--fg-subtle);
  }
  .card-top .eyebrow::before { background: var(--neon-cyan); opacity: 0.6; }
  .card-top .metric {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--neon-cyan);
    letter-spacing: 0.06em;
  }
  .solution-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.1;
    margin: 0 0 var(--space-3);
  }
  .solution-desc {
    font-size: var(--fs-body);
    line-height: var(--lh-normal);
    color: var(--fg-muted);
    margin: 0 0 var(--space-5);
  }
  .solution-tags {
    display: flex; gap: 6px; flex-wrap: wrap;
    margin-bottom: var(--space-5);
  }
  .solution-tags .tag {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 4px 10px;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-strong);
    color: var(--fg-subtle);
    letter-spacing: 0.04em;
  }
  .solution-link {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--neon-cyan);
    letter-spacing: 0.04em;
    text-decoration: none;
    display: inline-flex; gap: 6px; align-items: center;
    transition: gap var(--dur-base) var(--ease-spring);
  }
  .solution-link:hover { gap: 12px; }

  .solutions-foot { margin-top: var(--space-7); }

  /* ============================================================
     Vision (pink)
     ============================================================ */
  .vision-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: var(--space-8);
    align-items: start;
  }
  @media (max-width: 820px) { .vision-grid { grid-template-columns: 1fr; } }

  .pillars {
    list-style: none;
    padding: 0; margin: 0;
    display: flex; flex-direction: column;
  }
  .pillars li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-5);
    padding: var(--space-5) 0;
    border-bottom: 1px solid var(--border);
    transition: padding var(--dur-base) var(--ease-out-quart);
  }
  .pillars li:hover { padding-left: 8px; }
  .pillars li:hover h4 { color: var(--neon-pink); }
  .pillars li:last-child { border-bottom: 0; }
  .pillar-num {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--neon-pink);
    letter-spacing: 0.08em;
    padding-top: 6px;
  }
  .pillars h4 {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.015em;
    margin: 0 0 6px;
    transition: color var(--dur-base) var(--ease-out-quart);
  }
  .pillars p {
    margin: 0;
    color: var(--fg-muted);
    font-size: var(--fs-body);
    line-height: var(--lh-normal);
  }

  .quote-card {
    position: sticky;
    top: 120px;
    margin: 0;
    padding: var(--space-7);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    position: relative;
  }
  .quote-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 80% 20%, color-mix(in oklch, var(--neon-pink) 24%, transparent), transparent 55%),
      radial-gradient(circle at 10% 90%, color-mix(in oklch, var(--neon-violet) 20%, transparent), transparent 60%);
    pointer-events: none;
  }
  .quote-card blockquote {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.35;
    letter-spacing: -0.015em;
    margin: 0;
    color: var(--fg);
    position: relative;
  }
  .quote-card .mark {
    font-family: var(--font-display);
    font-size: 80px;
    line-height: 0;
    color: var(--neon-pink);
    display: block;
    margin-bottom: 24px;
    opacity: 0.7;
  }
  .quote-card figcaption {
    margin-top: var(--space-5);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fg-subtle);
    position: relative;
  }

  /* ============================================================
     Team (yellow highlight)
     ============================================================ */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }
  @media (max-width: 1060px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .team-grid { grid-template-columns: 1fr; } }

  .member {
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    position: relative;
    overflow: hidden;
    transition:
      transform var(--dur-slow) var(--ease-out-expo),
      border-color var(--dur-slow) var(--ease-out-expo),
      box-shadow var(--dur-slow) var(--ease-out-expo);
  }
  .member:hover {
    transform: translateY(-3px);
    border-color: var(--neon-yellow);
    box-shadow: var(--shadow-lg), var(--glow-yellow);
  }
  .member-avatar {
    width: 56px; height: 56px;
    border-radius: var(--radius-md);
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: var(--space-5);
    border: 1px solid var(--border-strong);
  }
  .member-avatar[data-type='human'] {
    background: color-mix(in oklch, var(--neon-yellow) 18%, transparent);
    color: var(--neon-yellow);
    border-color: color-mix(in oklch, var(--neon-yellow) 40%, transparent);
  }
  .member-avatar[data-type='llm'] {
    background: color-mix(in oklch, var(--neon-violet) 18%, transparent);
    color: var(--neon-violet);
    border-color: color-mix(in oklch, var(--neon-violet) 40%, transparent);
  }
  .member-role {
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--fg-subtle);
    margin: 0 0 6px;
  }
  .member-name {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0 0 var(--space-3);
  }
  .member-bio {
    font-size: 13px;
    color: var(--fg-muted);
    line-height: var(--lh-normal);
    margin: 0 0 var(--space-5);
  }
  .member-skills {
    list-style: none;
    padding: 0; margin: 0;
    display: flex; gap: 6px; flex-wrap: wrap;
  }
  .member-skills li {
    font-family: var(--font-mono);
    font-size: 10px;
    padding: 3px 8px;
    border-radius: var(--radius-xs);
    background: var(--obsidian-800);
    border: 1px solid var(--border);
    color: var(--fg-subtle);
    letter-spacing: 0.04em;
  }
  :global(html[data-theme='light']) .member-skills li { background: #F0EFEA; }

  /* ============================================================
     Contact (violet)
     ============================================================ */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
    align-items: start;
  }
  @media (max-width: 820px) { .contact-grid { grid-template-columns: 1fr; } }

  .contact-title {
    font-family: var(--font-display);
    font-size: var(--fs-display-lg);
    font-weight: 500;
    letter-spacing: -0.03em;
    line-height: 1;
    margin: 0 0 var(--space-5);
  }
  .contact-channels {
    margin-top: var(--space-7);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .channel {
    display: flex; gap: var(--space-4); align-items: center;
    padding: var(--space-4) var(--space-5);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: border-color var(--dur-base) var(--ease-out-quart),
                transform var(--dur-base) var(--ease-spring);
  }
  a.channel:hover { border-color: var(--neon-violet); transform: translateX(4px); }
  .channel-icon {
    width: 44px; height: 44px;
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: var(--radius-md);
    background: color-mix(in oklch, var(--neon-violet) 16%, transparent);
    color: var(--neon-violet);
  }
  .channel-icon.alt {
    background: color-mix(in oklch, var(--neon-cyan) 16%, transparent);
    color: var(--neon-cyan);
  }
  .channel .eyebrow {
    color: var(--fg-subtle);
    font-family: var(--font-mono);
    font-size: var(--fs-micro);
    letter-spacing: var(--tracking-eyebrow);
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .channel-value {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 15px;
    margin: 0;
    color: var(--fg);
  }
  .channel-value a { text-decoration: none; }
  .channel-value a:hover { color: var(--neon-violet); }

  .form-card {
    padding: var(--space-7);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
  }
  .form-card form { display: flex; flex-direction: column; gap: var(--space-4); }
  .field { display: flex; flex-direction: column; gap: 8px; }
  .field .eyebrow {
    color: var(--fg-subtle);
    font-family: var(--font-mono);
    font-size: var(--fs-micro);
    letter-spacing: var(--tracking-eyebrow);
    text-transform: uppercase;
  }
  .field input,
  .field textarea {
    width: 100%;
    padding: 12px 14px;
    background: var(--bg);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--fg);
    transition: border-color var(--dur-base) var(--ease-out-quart),
                box-shadow var(--dur-base) var(--ease-out-quart);
  }
  .field textarea { resize: vertical; min-height: 120px; }
  .field input:focus,
  .field textarea:focus {
    outline: none;
    border-color: var(--neon-violet);
    box-shadow: 0 0 0 3px var(--ring);
  }
  .field input::placeholder,
  .field textarea::placeholder { color: var(--fg-whisper); }

  .form-success {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--space-8) 0;
    gap: var(--space-3);
  }
  .success-icon {
    width: 64px; height: 64px;
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    background: color-mix(in oklch, var(--neon-violet) 18%, transparent);
    color: var(--neon-violet);
    box-shadow: var(--glow-violet);
  }
  .form-success h3 {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 500;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .form-success p { margin: 0; color: var(--fg-muted); }

  /* ============================================================
     Footer
     ============================================================ */
  .footer {
    padding: var(--space-9) var(--gutter) var(--space-7);
    margin-top: var(--space-10);
    border-top: 1px solid var(--border);
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-7);
  }
  @media (max-width: 720px) {
    .footer-grid { grid-template-columns: 1fr; }
  }
  .footer-logo { display: flex; align-items: center; gap: 10px; }
  .footer-logo span {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.01em;
  }
  .footer-tagline {
    margin-top: var(--space-3);
    max-width: 40ch;
    color: var(--fg-muted);
    font-size: var(--fs-body-sm);
    line-height: var(--lh-normal);
  }
  .footer-col h5 {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--fg-subtle);
    margin: 0 0 var(--space-3);
  }
  .footer-col ul { list-style: none; padding: 0; margin: 0; }
  .footer-col li { padding: 6px 0; }
  .footer-col a {
    font-size: 14px;
    color: var(--fg);
    text-decoration: none;
    transition: color var(--dur-base) var(--ease-out-quart);
  }
  .footer-col a:hover { color: var(--neon-violet); }

  .colophon {
    padding-top: var(--space-5);
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-3);
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--fg-whisper);
    letter-spacing: 0.05em;
  }
</style>
