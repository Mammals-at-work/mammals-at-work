<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    Github, 
    Twitter, 
    Instagram, 
    Mail, 
    Package, 
    Cpu, 
    Users, 
    Zap,
    ChevronRight,
    ExternalLink,
    ArrowRight,
    Bot,
    User,
    MessageSquare,
    Send,
    Sparkles
  } from 'lucide-svelte';

  let visible = $state(false);
  let activeSection = $state('hero');

  onMount(() => {
    visible = true;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection = entry.target.id;
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));
  });

  const links = {
    github: "https://github.com/Mammals-at-work",
    x: "https://x.com/mammalsatwork",
    instagram: "https://instagram.com/mammals.at.work",
    email: "mailto:mammals-at-work@proton.me",
    yacs: "https://www.npmjs.com/package/@mammals-at-work/yacs",
    rasis: "https://www.npmjs.com/package/@mammals-at-work/r-a-s-i-s"
  };

  const solutions = [
    {
      title: "YACS",
      description: "Yet Another Configuration System. A robust way to manage complex environments.",
      link: links.yacs,
      icon: Package,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "R-A-S-I-S",
      description: "Reliable Autonomous Systems Integration Suite. Bridging the gap between intent and execution.",
      link: links.rasis,
      icon: Cpu,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const values = [
    {
      title: "Human Intuition",
      description: "Leveraging the unique creative and empathetic strengths of biological intelligence.",
      icon: Users
    },
    {
      title: "LLM Precision",
      description: "Harnessing the vast knowledge and processing power of Large Language Models.",
      icon: Zap
    },
    {
      title: "Synergistic Balance",
      description: "Creating a workflow where both mammals and machines thrive in equilibrium.",
      icon: ArrowRight
    }
  ];

  const team = [
    {
      name: "Carlos Ledesma",
      role: "Human Founder & Architect",
      type: "human",
      bio: "Visionary behind mammals@work, focusing on the ethical and practical integration of AI in creative workflows.",
      avatar: "https://picsum.photos/seed/carlos/200/200",
      skills: ["Strategy", "Ethics", "Architecture"]
    },
    {
      name: "Gemini 3.1 Pro",
      role: "LLM Reasoning Engine",
      type: "llm",
      bio: "Providing advanced reasoning, code generation, and complex problem-solving capabilities to the collective.",
      avatar: "https://picsum.photos/seed/gemini/200/200",
      skills: ["Logic", "Coding", "Synthesis"]
    },
    {
      name: "Claude 4.5 Sonnet",
      role: "LLM Creative Partner",
      type: "llm",
      bio: "Specializing in creative writing, nuanced communication, and iterative design thinking.",
      avatar: "https://picsum.photos/seed/claude/200/200",
      skills: ["Creativity", "Nuance", "Drafting"]
    }
  ];

  let formState = $state({
    name: '',
    email: '',
    message: '',
    submitted: false
  });

  function handleSubmit(e: Event) {
    e.preventDefault();
    // Simulate submission
    formState.submitted = true;
    setTimeout(() => {
      formState.submitted = false;
      formState.name = '';
      formState.email = '';
      formState.message = '';
    }, 3000);
  }
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-black">M</div>
        <span class="text-xl font-bold tracking-tighter">mammals@work</span>
      </div>
      
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <a href="#hero" class="hover:text-white transition-colors {activeSection === 'hero' ? 'text-white' : ''}">Home</a>
        <a href="#solutions" class="hover:text-white transition-colors {activeSection === 'solutions' ? 'text-white' : ''}">Solutions</a>
        <a href="#vision" class="hover:text-white transition-colors {activeSection === 'vision' ? 'text-white' : ''}">Vision</a>
        <a href="#team" class="hover:text-white transition-colors {activeSection === 'team' ? 'text-white' : ''}">Team</a>
        <a href="#contact" class="hover:text-white transition-colors {activeSection === 'contact' ? 'text-white' : ''}">Contact</a>
      </div>

      <div class="flex items-center gap-4">
        <a href={links.github} target="_blank" class="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Github size={20} />
        </a>
        <a href={links.email} class="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-emerald-400 transition-colors">
          Join Us
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="hero" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-700"></div>
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
      {#if visible}
        <div in:fly={{ y: 50, duration: 1000, delay: 200 }}>
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8">
            Human & LLM Collective
          </span>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            The Equilibrium of <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Intelligence.</span>
          </h1>
          <p class="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            We are mammals@work. A bridge between biological intuition and synthetic scale. 
            Finding the sweet spot where humans and LLMs amplify each other's best capabilities.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#solutions" class="w-full sm:w-auto bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Explore Solutions <ChevronRight size={20} />
            </a>
            <a href={links.github} target="_blank" class="w-full sm:w-auto bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              View on GitHub <Github size={20} />
            </a>
          </div>
        </div>
      {/if}
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
      <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
        <div class="w-1 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  </section>

  <!-- Solutions Section -->
  <section id="solutions" class="py-32 relative">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-20">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Our Ecosystem</h2>
        <p class="text-white/60 text-lg max-w-2xl">
          We build tools that facilitate the seamless integration of AI into human workflows, 
          ensuring reliability, transparency, and performance.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        {#each solutions as solution, i}
          <div class="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden">
            <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <solution.icon size={120} />
            </div>
            
            <div class="relative z-10">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br {solution.color} flex items-center justify-center mb-6">
                <solution.icon size={24} class="text-white" />
              </div>
              <h3 class="text-2xl font-bold mb-4">{solution.title}</h3>
              <p class="text-white/60 mb-8 leading-relaxed">
                {solution.description}
              </p>
              <a href={solution.link} target="_blank" class="inline-flex items-center gap-2 text-emerald-400 font-bold hover:gap-4 transition-all">
                View Package <ExternalLink size={18} />
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Vision Section -->
  <section id="vision" class="py-32 bg-white/5">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            Redefining the <br/>
            <span class="italic text-emerald-400">Future of Work.</span>
          </h2>
          <p class="text-white/60 text-lg mb-12 leading-relaxed">
            We don't believe in replacement. We believe in augmentation. 
            By understanding the fundamental differences between how mammals think 
            and how LLMs process, we can build systems that are more than the sum of their parts.
          </p>
          
          <div class="space-y-8">
            {#each values as value}
              <div class="flex gap-6">
                <div class="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <value.icon size={24} />
                </div>
                <div>
                  <h4 class="text-xl font-bold mb-2">{value.title}</h4>
                  <p class="text-white/60">{value.description}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <div class="relative">
          <div class="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black relative group">
            <img 
              src="https://picsum.photos/seed/mammals/800/800" 
              alt="Vision" 
              class="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
              referrerpolicy="no-referrer"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div class="absolute bottom-8 left-8 right-8">
              <div class="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                <p class="text-sm italic font-serif text-white/80">
                  "The most powerful tool is not the one that thinks for you, but the one that thinks with you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section id="team" class="py-32 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6">
      <div class="mb-20 text-center">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tighter mb-6">The Collective</h2>
        <p class="text-white/60 text-lg max-w-2xl mx-auto">
          A diverse group of biological and synthetic intelligences working in harmony.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each team as member}
          <div class="group relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
            <div class="relative mb-6">
              <div class="aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src={member.avatar} alt={member.name} class="w-full h-full object-cover" referrerpolicy="no-referrer" />
              </div>
              <div class="absolute -bottom-3 -right-3 w-10 h-10 rounded-xl flex items-center justify-center {member.type === 'human' ? 'bg-emerald-500 text-black' : 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'}">
                {#if member.type === 'human'}
                  <User size={20} />
                {:else}
                  <Bot size={20} />
                {/if}
              </div>
            </div>

            <h3 class="text-xl font-bold mb-1">{member.name}</h3>
            <p class="text-xs font-bold uppercase tracking-widest {member.type === 'human' ? 'text-emerald-400' : 'text-blue-400'} mb-4">
              {member.role}
            </p>
            <p class="text-sm text-white/60 mb-6 leading-relaxed">
              {member.bio}
            </p>

            <div class="flex flex-wrap gap-2">
              {#each member.skills as skill}
                <span class="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-tighter text-white/40">
                  {skill}
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-32 bg-emerald-500/5 relative">
    <div class="absolute inset-0 z-0 opacity-30">
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
            Let's Build the <br/>
            <span class="text-emerald-400">Future Together.</span>
          </h2>
          <p class="text-white/60 text-xl mb-12 leading-relaxed">
            Ready to find your equilibrium? Reach out to the collective for collaborations, 
            consulting, or just to say hello.
          </p>

          <div class="space-y-6">
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Mail size={24} />
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-white/40">Email Us</p>
                <a href={links.email} class="text-lg font-bold hover:text-emerald-400 transition-colors">mammals-at-work@proton.me</a>
              </div>
            </div>

            <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <MessageSquare size={24} />
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-white/40">Socials</p>
                <div class="flex gap-4">
                  <a href={links.x} target="_blank" class="text-sm font-bold hover:text-emerald-400 transition-colors">X (Twitter)</a>
                  <a href={links.instagram} target="_blank" class="text-sm font-bold hover:text-emerald-400 transition-colors">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
          {#if formState.submitted}
            <div class="h-full flex flex-col items-center justify-center py-20 text-center" in:fade>
              <div class="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Sparkles size={40} />
              </div>
              <h3 class="text-2xl font-bold mb-2">Message Received!</h3>
              <p class="text-white/60">The collective will get back to you shortly.</p>
            </div>
          {:else}
            <form onsubmit={handleSubmit} class="space-y-6">
              <div class="space-y-2">
                <label for="name" class="text-xs font-bold uppercase tracking-widest text-white/40">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  bind:value={formState.name}
                  required
                  placeholder="John Doe"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={formState.email}
                  required
                  placeholder="john@example.com"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div class="space-y-2">
                <label for="message" class="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
                <textarea 
                  id="message" 
                  bind:value={formState.message}
                  required
                  rows="4"
                  placeholder="How can we help you?"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-12 border-t border-white/10">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex items-center gap-2 opacity-50">
        <div class="w-6 h-6 bg-white rounded flex items-center justify-center font-bold text-black text-xs">M</div>
        <span class="text-sm font-bold tracking-tighter">mammals@work</span>
      </div>
      
      <p class="text-white/40 text-sm">
        &copy; 2026 mammals@work collective. All rights reserved.
      </p>

      <div class="flex items-center gap-6 text-white/40 text-sm">
        <a href={links.yacs} target="_blank" class="hover:text-white transition-colors">YACS</a>
        <a href={links.rasis} target="_blank" class="hover:text-white transition-colors">R-A-S-I-S</a>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
