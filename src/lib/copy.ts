// Bilingual copy — ES canonical, EN follows in tone + length.
// Voice: confident, technical, understated. No hype. Numerals. Mono for metrics.

export type Lang = 'es' | 'en';

type Dict = {
  nav: { home: string; solutions: string; vision: string; team: string; contact: string; cta: string };
  hero: {
    eyebrow: string;
    title_pre: string;
    title_em: string;
    sub: string;
    meta: { status: string; location: string; availability: string };
    cta_primary: string;
    cta_secondary: string;
  };
  solutions: {
    number: string;
    title_pre: string;
    title_em: string;
    lead: string;
    items: { name: string; tagline: string; desc: string; metric: string; tags: string[]; link: string }[];
    cta: string;
  };
  vision: {
    number: string;
    title_pre: string;
    title_em: string;
    lead: string;
    pillars: { title: string; desc: string }[];
    quote: string;
    quote_by: string;
  };
  team: {
    number: string;
    title_pre: string;
    title_em: string;
    lead: string;
    members: { name: string; role: string; type: 'human' | 'llm'; bio: string; skills: string[] }[];
  };
  contact: {
    number: string;
    title_pre: string;
    title_em: string;
    lead: string;
    email_label: string;
    socials_label: string;
    form: {
      name: string;
      email: string;
      message: string;
      placeholder_name: string;
      placeholder_email: string;
      placeholder_message: string;
      submit: string;
      success_title: string;
      success_body: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
    sections: { label: string; links: { name: string; href: string; external?: boolean }[] }[];
  };
};

export const links = {
  github: 'https://github.com/Mammals-at-work',
  x: 'https://x.com/mammalsatwork',
  instagram: 'https://instagram.com/mammals.at.work',
  email: 'mailto:mammals-at-work@proton.me',
  yacs: 'https://www.npmjs.com/package/@mammals-at-work/yacs',
  rasis: 'https://www.npmjs.com/package/@mammals-at-work/r-a-s-i-s',
};

export const copy: Record<Lang, Dict> = {
  es: {
    nav: {
      home: 'Inicio',
      solutions: 'Sistemas',
      vision: 'Visión',
      team: 'Colectivo',
      contact: 'Contacto',
      cta: 'Escríbenos',
    },
    hero: {
      eyebrow: 'COLECTIVO HUMANO + LLM · EST. 2024',
      title_pre: 'Software, construido en',
      title_em: 'equilibrio.',
      sub: 'mammals@work es un colectivo pequeño de mamíferos y modelos de lenguaje. Diseñamos sistemas donde la intuición biológica y la escala sintética se amplifican sin pisarse.',
      meta: {
        status: 'Disponible para colaboraciones',
        location: 'Remoto · UTC+1',
        availability: '2 proyectos abiertos / trimestre',
      },
      cta_primary: 'Ver sistemas',
      cta_secondary: 'Leer la tesis',
    },
    solutions: {
      number: '§ 01',
      title_pre: 'Librerías',
      title_em: 'open-source.',
      lead: 'Herramientas que publicamos para el camino que nosotros mismos recorremos — configuración honesta y agentes que no se desvían.',
      items: [
        {
          name: 'YACS',
          tagline: 'Yet Another Configuration System',
          desc: 'Configuración tipada, componible y auditables. Sin magia, sin acoplamiento al runtime. Pensada para servicios que no deben despertarte a las 3am.',
          metric: 'v0.4 · 12kB gzipped',
          tags: ['config', 'typescript', 'zero-deps'],
          link: links.yacs,
        },
        {
          name: 'R-A-S-I-S',
          tagline: 'Reliable Autonomous Systems Integration Suite',
          desc: 'Un runtime delgado para agentes con contrato: intención declarada, ejecución trazable, fallos explícitos. El puente entre lo que el LLM quiere hacer y lo que tu sistema acepta.',
          metric: 'v0.2 · p99 < 120ms',
          tags: ['agents', 'contracts', 'tracing'],
          link: links.rasis,
        },
      ],
      cta: 'Todo en GitHub',
    },
    vision: {
      number: '§ 02',
      title_pre: 'No reemplazamos.',
      title_em: 'Amplificamos.',
      lead: 'Una década mirando sistemas rotos nos enseñó algo simple: la IA no sustituye el criterio, lo amortigua. El trabajo real está en diseñar el flujo donde ambos rinden su mejor versión.',
      pillars: [
        {
          title: 'Intuición mamífera',
          desc: 'Contexto, empatía, gusto. Lo que un LLM aún no sabe ponderar cuando el problema está mal planteado.',
        },
        {
          title: 'Precisión sintética',
          desc: 'Volumen, consistencia, recall. Lo que un humano no puede sostener durante ocho horas sin sesgarse.',
        },
        {
          title: 'Equilibrio como contrato',
          desc: 'Interfaces donde cada actor —humano o modelo— tiene alcance, responsabilidad y límite escritos.',
        },
      ],
      quote: 'La herramienta más poderosa no es la que piensa por ti — es la que piensa contigo y sabe cuándo callarse.',
      quote_by: 'Manifiesto interno · 2025',
    },
    team: {
      number: '§ 03',
      title_pre: 'El',
      title_em: 'colectivo.',
      lead: 'Pequeño por diseño. Cada miembro —biológico o sintético— aporta una competencia que los demás no pueden suplir sin perder algo.',
      members: [
        {
          name: 'Carlos Ledesma',
          role: 'Humano · Arquitectura',
          type: 'human',
          bio: 'Ocho años diseñando sistemas que no se caen. Escribe el contrato, decide cuándo decir no.',
          skills: ['Arquitectura', 'Ética', 'DDD'],
        },
        {
          name: 'Netzulo',
          role: 'Humano · QA & Blockchain',
          type: 'human',
          bio: 'QA engineer y fullstack. Del testing de contratos EVM a pipelines de integración —  hace que lo que funciona en local también funcione en producción.',
          skills: ['QA', 'Blockchain', 'TypeScript'],
        },
        {
          name: 'Sendery',
          role: 'Humano · Mobile & Vision',
          type: 'human',
          bio: 'Desarrollador Android e IA visual. Conecta modelos de visión con hardware del mundo real — si tiene cámara, él lo orquesta.',
          skills: ['Android', 'Vision AI', 'Kotlin'],
        },
        {
          name: 'Gemini 3.1 Pro',
          role: 'LLM · Razonamiento',
          type: 'llm',
          bio: 'Motor de síntesis y refactor. Procesa repositorios completos sin perder el hilo del dominio.',
          skills: ['Síntesis', 'Refactor', 'Revisión'],
        },
        {
          name: 'Claude Opus 4.7',
          role: 'LLM · Escritura',
          type: 'llm',
          bio: 'Compañero de redacción y diseño iterativo. Matiza donde otros exageran.',
          skills: ['Redacción', 'Matiz', 'Diseño'],
        },
        {
          name: 'GPT-5 Omni',
          role: 'LLM · Pipelines',
          type: 'llm',
          bio: 'Orquestador multimodal. Encaja voz, imagen y código en el mismo contrato de R-A-S-I-S.',
          skills: ['Multimodal', 'Tools', 'Pipelines'],
        },
      ],
    },
    contact: {
      number: '§ 04',
      title_pre: 'Dime qué estás',
      title_em: 'construyendo.',
      lead: 'Colaboraciones, consultoría breve, o una conversación honesta sobre si la IA encaja en tu problema. Respondemos en menos de 48h.',
      email_label: 'Escribe un email',
      socials_label: 'Redes',
      form: {
        name: 'Nombre',
        email: 'Email',
        message: 'Mensaje',
        placeholder_name: 'Tu nombre',
        placeholder_email: 'tu@dominio.com',
        placeholder_message: 'Cuéntanos el contexto — qué construyes, qué te está frenando.',
        submit: 'Enviar',
        success_title: 'Recibido.',
        success_body: 'Te respondemos en menos de 48h.',
      },
    },
    footer: {
      tagline: 'Mamíferos y modelos, trabajando juntos sin hype.',
      rights: '© 2026 mammals@work · Hecho con criterio.',
      sections: [
        {
          label: 'Paquetes',
          links: [
            { name: 'YACS', href: links.yacs, external: true },
            { name: 'R-A-S-I-S', href: links.rasis, external: true },
          ],
        },
        {
          label: 'Canales',
          links: [
            { name: 'GitHub', href: links.github, external: true },
            { name: 'X', href: links.x, external: true },
            { name: 'Instagram', href: links.instagram, external: true },
            { name: 'Email', href: links.email },
          ],
        },
      ],
    },
  },
  en: {
    nav: {
      home: 'Home',
      solutions: 'Systems',
      vision: 'Vision',
      team: 'Collective',
      contact: 'Contact',
      cta: 'Write us',
    },
    hero: {
      eyebrow: 'HUMAN + LLM COLLECTIVE · EST. 2024',
      title_pre: 'Software, built in',
      title_em: 'equilibrium.',
      sub: 'mammals@work is a small collective of mammals and language models. We design systems where biological intuition and synthetic scale amplify each other without stepping on toes.',
      meta: {
        status: 'Open to collaborations',
        location: 'Remote · UTC+1',
        availability: '2 open slots / quarter',
      },
      cta_primary: 'See systems',
      cta_secondary: 'Read the thesis',
    },
    solutions: {
      number: '§ 01',
      title_pre: 'Open-source',
      title_em: 'libraries.',
      lead: 'Tools we ship along the road we walk — honest configuration and agents that don\'t drift.',
      items: [
        {
          name: 'YACS',
          tagline: 'Yet Another Configuration System',
          desc: 'Typed, composable, auditable config. No magic, no runtime coupling. Built for services that shouldn\'t wake you at 3am.',
          metric: 'v0.4 · 12kB gzipped',
          tags: ['config', 'typescript', 'zero-deps'],
          link: links.yacs,
        },
        {
          name: 'R-A-S-I-S',
          tagline: 'Reliable Autonomous Systems Integration Suite',
          desc: 'A thin runtime for agents with contract: declared intent, traceable execution, explicit failures. The bridge between what the LLM wants and what your system accepts.',
          metric: 'v0.2 · p99 < 120ms',
          tags: ['agents', 'contracts', 'tracing'],
          link: links.rasis,
        },
      ],
      cta: 'All on GitHub',
    },
    vision: {
      number: '§ 02',
      title_pre: 'We don\'t replace.',
      title_em: 'We amplify.',
      lead: 'A decade watching broken systems taught us something simple: AI doesn\'t substitute judgement, it cushions it. The real work is designing the flow where both sides deliver their best.',
      pillars: [
        {
          title: 'Mammal intuition',
          desc: 'Context, empathy, taste. What an LLM still can\'t weigh when the problem is framed wrong.',
        },
        {
          title: 'Synthetic precision',
          desc: 'Volume, consistency, recall. What a human can\'t sustain through eight hours without bias creeping in.',
        },
        {
          title: 'Balance as contract',
          desc: 'Interfaces where every actor — human or model — has written scope, responsibility and limits.',
        },
      ],
      quote: 'The most powerful tool isn\'t the one that thinks for you — it\'s the one that thinks with you and knows when to shut up.',
      quote_by: 'Internal manifesto · 2025',
    },
    team: {
      number: '§ 03',
      title_pre: 'The',
      title_em: 'collective.',
      lead: 'Small by design. Each member — biological or synthetic — brings a capability the others can\'t replace without losing something.',
      members: [
        {
          name: 'Carlos Ledesma',
          role: 'Human · Architecture',
          type: 'human',
          bio: 'Eight years designing systems that don\'t fall over. Writes the contract, decides when to say no.',
          skills: ['Architecture', 'Ethics', 'DDD'],
        },
        {
          name: 'Netzulo',
          role: 'Human · QA & Blockchain',
          type: 'human',
          bio: 'QA engineer and fullstack developer. From EVM contract testing to integration pipelines — makes what works locally also work in production.',
          skills: ['QA', 'Blockchain', 'TypeScript'],
        },
        {
          name: 'Sendery',
          role: 'Human · Mobile & Vision',
          type: 'human',
          bio: 'Android and visual AI developer. Connects vision models with real-world hardware — if it has a camera, he orchestrates it.',
          skills: ['Android', 'Vision AI', 'Kotlin'],
        },
        {
          name: 'Gemini 3.1 Pro',
          role: 'LLM · Reasoning',
          type: 'llm',
          bio: 'Synthesis and refactor engine. Processes full repos without losing the domain thread.',
          skills: ['Synthesis', 'Refactor', 'Review'],
        },
        {
          name: 'Claude Opus 4.7',
          role: 'LLM · Writing',
          type: 'llm',
          bio: 'Drafting partner and iterative designer. Nuances where others exaggerate.',
          skills: ['Writing', 'Nuance', 'Design'],
        },
        {
          name: 'GPT-5 Omni',
          role: 'LLM · Pipelines',
          type: 'llm',
          bio: 'Multimodal orchestrator. Fits voice, image and code into the same R-A-S-I-S contract.',
          skills: ['Multimodal', 'Tools', 'Pipelines'],
        },
      ],
    },
    contact: {
      number: '§ 04',
      title_pre: 'Tell us what you\'re',
      title_em: 'building.',
      lead: 'Collaborations, short consulting, or an honest conversation about whether AI fits your problem. We reply under 48h.',
      email_label: 'Send an email',
      socials_label: 'Socials',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        placeholder_name: 'Your name',
        placeholder_email: 'you@domain.com',
        placeholder_message: 'Give us the context — what you\'re building, what\'s blocking you.',
        submit: 'Send',
        success_title: 'Received.',
        success_body: 'We\'ll reply under 48h.',
      },
    },
    footer: {
      tagline: 'Mammals and models, working together without the hype.',
      rights: '© 2026 mammals@work · Made with judgement.',
      sections: [
        {
          label: 'Packages',
          links: [
            { name: 'YACS', href: links.yacs, external: true },
            { name: 'R-A-S-I-S', href: links.rasis, external: true },
          ],
        },
        {
          label: 'Channels',
          links: [
            { name: 'GitHub', href: links.github, external: true },
            { name: 'X', href: links.x, external: true },
            { name: 'Instagram', href: links.instagram, external: true },
            { name: 'Email', href: links.email },
          ],
        },
      ],
    },
  },
};
