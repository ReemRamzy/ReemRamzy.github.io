<script setup>
import { ref } from 'vue'
import {
  ArrowUpRight,
  Boxes,
  BriefcaseBusiness,
  Check,
  CloudCog,
  Code2,
  Database,
  ExternalLink,
  GitFork,
  Mail,
  Menu,
  Radio,
  ServerCog,
  Smartphone,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from '@lucide/vue'

const menuOpen = ref(false)

const navigation = [
  ['About', '#about'],
  ['Expertise', '#expertise'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

const expertise = [
  {
    icon: ServerCog,
    title: 'Backend Architecture',
    accent: 'from-blue-500/25 to-cyan-400/5',
    text: 'Laravel and Django services, REST and GraphQL APIs, authentication, queues, scheduled jobs, and modular architecture.',
    tags: ['Laravel', 'PHP 8+', 'Python', 'Django', 'REST', 'GraphQL'],
  },
  {
    icon: Radio,
    title: 'Real-Time Systems',
    accent: 'from-cyan-400/20 to-blue-500/5',
    text: 'Live tracking, status updates, chat, notifications, private channels, presence channels, and operational dashboards.',
    tags: ['Reverb', 'WebSockets', 'Broadcasting', 'Live Tracking'],
  },
  {
    icon: WalletCards,
    title: 'Fintech & Payments',
    accent: 'from-violet-500/20 to-fuchsia-400/5',
    text: 'Transaction processing, wallets, payment gateways, refunds, pricing rules, discount logic, and financial reports.',
    tags: ['Payments', 'Wallets', 'Refunds', 'Transactions'],
  },
  {
    icon: Sparkles,
    title: 'AI Integrations',
    accent: 'from-fuchsia-500/20 to-violet-500/5',
    text: 'Chatbots, OCR, document extraction, speech-to-text, image and video analysis, structured outputs, and automation.',
    tags: ['AI APIs', 'OCR', 'Speech', 'Automation'],
  },
  {
    icon: CloudCog,
    title: 'Cloud & Production',
    accent: 'from-sky-500/20 to-blue-500/5',
    text: 'AWS EC2, Linux, Docker, Nginx, SSL, Supervisor, GitHub Actions, monitoring, debugging, and deployment support.',
    tags: ['AWS', 'Docker', 'Linux', 'CI/CD', 'Supervisor'],
  },
  {
    icon: Code2,
    title: 'Frontend Engineering',
    accent: 'from-emerald-500/15 to-cyan-400/5',
    text: 'Responsive interfaces and admin dashboards using Vue, Nuxt, React, Next, JavaScript, Tailwind CSS, and Bootstrap.',
    tags: ['Vue', 'Nuxt', 'React', 'Next.js', 'Tailwind'],
  },
]

const projects = [
  {
    name: 'CarBreak',
    type: 'Real-Time Vehicle Services Platform',
    icon: 'CB',
    gradient: 'from-blue-500 to-cyan-400',
    description: 'An on-demand platform for valet parking, car washing, vehicle covering, and related vehicle services.',
    contribution: [
      'Built the complete bidirectional Laravel Reverb workflow.',
      'Connected customer, provider, and admin experiences with live events.',
      'Configured Supervisor for continuously running Reverb and workers.',
      'Developed a real-time operations, clients, employees, and reporting dashboard.',
    ],
    tags: ['Laravel', 'Reverb', 'WebSockets', 'Supervisor', 'MySQL'],
    links: [
      ['Website', 'https://carbreak.nahrdev.com/'],
      ['Customer app', 'https://play.google.com/store/apps/details?id=com.nahr.carbrake'],
      ['Provider app', 'https://play.google.com/store/apps/details?id=com.nahr.car_brake_provider'],
    ],
  },
  {
    name: 'TaNefer Tours',
    type: 'Tourism & Hotel Reservation Platform',
    icon: 'TN',
    gradient: 'from-violet-500 to-blue-500',
    description: 'A full-service travel platform covering hotels, flights, Nile cruises, tours, and customized trips.',
    contribution: [
      'Refactored a legacy full-stack codebase.',
      'Improved critical workflow structure, maintainability, and stability.',
      'Implemented a complete hotel reservation cycle with GTE.',
      'Covered search, availability, selection, booking, and confirmation.',
    ],
    tags: ['Laravel', 'PHP', 'GTE API', 'Refactoring', 'Booking'],
    links: [['Live platform', 'https://www.tanefer.com/']],
  },
  {
    name: 'ASAD',
    type: 'Construction Project Management',
    icon: 'AS',
    gradient: 'from-amber-500 to-orange-400',
    description: 'A client-facing construction platform for project progress, plans, documents, invoices, and updates.',
    contribution: [
      'Developed the custom administrative dashboard.',
      'Connected the mobile client application to the admin workflow.',
      'Centralized project stages, documents, updates, and operational data.',
      'Built controls for information displayed to clients.',
    ],
    tags: ['Laravel', 'Dashboard', 'MySQL', 'Mobile API'],
    links: [['App Store', 'https://apps.apple.com/us/app/asad/id6780917942']],
  },
  {
    name: 'Motah',
    type: 'Real-Time Home Services Platform',
    icon: 'MO',
    gradient: 'from-emerald-500 to-cyan-400',
    description: 'A platform connecting customers with technicians for electrical, plumbing, AC, cleaning, and other services.',
    contribution: [
      'Implemented the full Laravel Reverb communication cycle.',
      'Enabled customer, technician, and admin bidirectional updates.',
      'Delivered immediate request and service-status synchronization.',
      'Configured Supervisor for production stability.',
    ],
    tags: ['Laravel', 'Reverb', 'WebSockets', 'Supervisor'],
    links: [
      ['Customer app', 'https://play.google.com/store/apps/details?id=com.nahrdev.motah'],
      ['Worker app', 'https://play.google.com/store/apps/details?id=com.nahrdev.etqan'],
    ],
  },
  {
    name: 'Move Now',
    type: 'Real-Time Transportation Platform',
    icon: 'MN',
    gradient: 'from-sky-500 to-blue-500',
    description: 'A transportation platform supporting requests, provider assignment, location-aware workflows, pricing, and live status.',
    contribution: [
      'Implemented the full real-time request cycle with Reverb.',
      'Connected customers, drivers or providers, and administrators.',
      'Supported live status changes across the transport workflow.',
      'Configured Supervisor for reliable server processes.',
    ],
    tags: ['Laravel', 'Reverb', 'Location', 'Supervisor'],
    links: [['Google Play', 'https://play.google.com/store/apps/details?id=com.nahrdev.move_now']],
  },
  {
    name: 'Fastich POS',
    type: 'Cloud Point-of-Sale System',
    icon: 'FP',
    gradient: 'from-fuchsia-500 to-violet-500',
    description: 'A cloud POS platform for restaurants, cafés, food trucks, and retail businesses.',
    contribution: [
      'Debugged and maintained the production application.',
      'Investigated reported defects and identified technical causes.',
      'Implemented fixes without disrupting business-critical workflows.',
      'Supported ongoing application stability and maintenance.',
    ],
    tags: ['Debugging', 'Maintenance', 'POS', 'Production'],
    links: [
      ['Website', 'https://fastich.com/en/'],
      ['Google Play', 'https://play.google.com/store/apps/details?id=com.fastich.pos_flutter'],
    ],
  },
  {
    name: 'Venecia Resort',
    type: 'WordPress Booking Website',
    icon: 'VR',
    gradient: 'from-cyan-500 to-teal-400',
    description: 'A hospitality website presenting resort accommodation, facilities, and reservation information.',
    contribution: [
      'Developed and configured the WordPress website.',
      'Organized accommodation and hospitality content.',
      'Implemented the booking and reservation workflow.',
      'Built responsive desktop and mobile pages.',
    ],
    tags: ['WordPress', 'Booking', 'Responsive UI', 'CMS'],
    links: [],
  },
]

const experience = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Nahr Development',
    period: '2024 — Present',
    text: 'Building web applications and mobile backends, real-time logistics features, payment systems, AI integrations, dashboards, cloud deployments, and production support while leading assigned technical work.',
  },
  {
    role: 'Freelance Full Stack Developer',
    company: 'Remote',
    period: '2022 — 2024',
    text: 'Delivered Laravel, Vue, PHP, and WordPress applications from requirements and technical planning through deployment, integration, and maintenance.',
  },
  {
    role: 'Back-End Developer',
    company: 'Altatawwar Company',
    period: '2018 — 2019',
    text: 'Developed PHP and MySQL backend functionality, optimized schemas and queries, integrated APIs, supported deployments, and resolved production issues.',
  },
]
</script>

<template>
  <main class="overflow-hidden">
    <div class="grid-bg pointer-events-none fixed inset-0 -z-10"></div>

    <header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"
        aria-label="Primary navigation">
        <a href="#" class="group flex items-center gap-3 font-semibold text-white">
          <span
            class="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-blue-500/20">RR</span>
          <span>Reem Ramzy<span class="text-cyan-400">.</span></span>
        </a>

        <div class="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <a v-for="item in navigation" :key="item[0]" :href="item[1]" class="transition hover:text-white">{{ item[0]
            }}</a>
        </div>

        <a href="./Reem-Ramzy-Senior-Full-Stack-Engineer.pdf"
          class="hidden rounded-xl border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:border-blue-300/50 hover:bg-blue-500/20 md:block">
          View résumé
        </a>

        <button class="rounded-lg border border-white/10 p-2 text-slate-200 md:hidden" @click="menuOpen = !menuOpen"
          aria-label="Toggle navigation">
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </nav>

      <div v-if="menuOpen" class="border-t border-white/5 bg-ink-950 px-5 py-5 md:hidden">
        <div class="flex flex-col gap-4">
          <a v-for="item in navigation" :key="item[0]" :href="item[1]" class="text-slate-300"
            @click="menuOpen = false">{{ item[0] }}</a>
          <a href="./Reem-Ramzy-Senior-Full-Stack-Engineer.pdf" class="font-semibold text-cyan-300">View résumé</a>
        </div>
      </div>
    </header>

    <section
      class="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-5 pb-24 pt-32 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-24">
      <div>
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-200">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
          </span>
          Open to senior full-stack opportunities
        </div>

        <p class="section-kicker mb-4 text-xs font-bold text-blue-300">Senior Full Stack Engineer</p>
        <h1 class="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
          I engineer the systems
          <span class="text-gradient">behind the interface.</span>
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
          Building production applications across backend architecture, real-time workflows, fintech, dashboards, AI
          integrations, and cloud deployment using Laravel, PHP, Python, Vue, and React.
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <a href="#projects"
            class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 font-bold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-0.5">
            Explore projects
            <ArrowUpRight :size="18" />
          </a>
          <a href="mailto:reemramzym@gmail.com"
            class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10">
            <Mail :size="18" /> Contact me
          </a>
        </div>

        <div class="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-400">
          <span>Alexandria, Egypt</span>
          <span class="hidden h-1 w-1 rounded-full bg-slate-600 sm:block"></span>
          <span>Arabic — Native</span>
          <span class="hidden h-1 w-1 rounded-full bg-slate-600 sm:block"></span>
          <span>English — Fluent</span>
        </div>
      </div>

      <div class="glow-border glass relative rounded-3xl p-3 sm:p-5">
        <div class="overflow-hidden rounded-2xl border border-white/8 bg-[#080d1b]">
          <div class="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <div class="flex gap-2">
              <span class="h-3 w-3 rounded-full bg-rose-400/80"></span>
              <span class="h-3 w-3 rounded-full bg-amber-300/80"></span>
              <span class="h-3 w-3 rounded-full bg-emerald-400/80"></span>
            </div>
            <span class="font-mono text-xs text-slate-500">system-architecture.ts</span>
          </div>
          <div class="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-7 sm:text-sm">
            <p class="code-line text-violet-300" data-line="1">interface ProductionSystem &#123;</p>
            <p class="code-line pl-4 text-slate-300" data-line="2"><span class="text-blue-300">backend</span>: Laravel |
              Django;</p>
            <p class="code-line pl-4 text-slate-300" data-line="3"><span class="text-blue-300">clients</span>: Vue |
              React | Mobile;</p>
            <p class="code-line pl-4 text-slate-300" data-line="4"><span class="text-cyan-300">realtime</span>: Reverb +
              WebSockets;</p>
            <p class="code-line pl-4 text-slate-300" data-line="5"><span class="text-cyan-300">data</span>: MySQL +
              Redis;</p>
            <p class="code-line pl-4 text-slate-300" data-line="6"><span class="text-amber-300">payments</span>:
              Transactions + Wallets;</p>
            <p class="code-line pl-4 text-slate-300" data-line="7"><span class="text-fuchsia-300">intelligence</span>:
              AI APIs + OCR;</p>
            <p class="code-line pl-4 text-slate-300" data-line="8"><span class="text-emerald-300">delivery</span>:
              Docker + AWS + CI/CD;</p>
            <p class="code-line text-violet-300" data-line="9">&#125;</p>
            <p class="code-line mt-4 text-slate-500" data-line="10">// Reliable from request to production.</p>
          </div>
        </div>

        <div
          class="absolute -bottom-6 -left-5 hidden rounded-2xl border border-blue-300/15 bg-blue-500/10 px-5 py-4 backdrop-blur-xl sm:block">
          <p class="text-xs font-bold uppercase tracking-[.18em] text-blue-300">Core approach</p>
          <p class="mt-1 font-semibold text-white">Business flow → architecture → delivery</p>
        </div>
      </div>
    </section>

    <section id="about" class="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <p class="section-kicker text-xs font-bold text-cyan-300">About me</p>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Full-stack ownership, not isolated
            tickets.</h2>
        </div>
        <div class="space-y-5 text-lg leading-8 text-slate-300">
          <p>I develop scalable web applications, mobile backends, fintech systems, logistics platforms, and real-time
            products.</p>
          <p>My work spans API design, backend services, database performance, external integrations, operational
            dashboards, deployment, incident investigation, and production maintenance.</p>
          <p>I also lead assigned technical work, review code, support developers, estimate tasks, and coordinate
            delivery with product, frontend, and QA teams.</p>
        </div>
      </div>
    </section>

    <section id="expertise" class="scroll-mt-24 border-y border-white/5 bg-white/[.018] py-24">
      <div class="mx-auto max-w-7xl px-5 lg:px-8">
        <div class="max-w-3xl">
          <p class="section-kicker text-xs font-bold text-blue-300">Technical expertise</p>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">A stack designed around complete
            business workflows.</h2>
          <p class="mt-5 text-lg leading-8 text-slate-400">The portfolio presents skills as connected engineering
            capabilities rather than a wall of technology badges.</p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="item in expertise" :key="item.title"
            class="glass group relative overflow-hidden rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/25">
            <div :class="['absolute inset-0 bg-gradient-to-br opacity-80', item.accent]"></div>
            <div class="relative">
              <div class="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan-200">
                <component :is="item.icon" :size="23" />
              </div>
              <h3 class="mt-5 text-xl font-bold text-white">{{ item.title }}</h3>
              <p class="mt-3 leading-7 text-slate-400">{{ item.text }}</p>
              <div class="mt-5 flex flex-wrap gap-2">
                <span v-for="tag in item.tags" :key="tag"
                  class="rounded-md border border-white/8 bg-black/10 px-2.5 py-1 text-xs font-medium text-slate-300">{{
                  tag }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div class="glass glow-border grid items-center gap-8 rounded-3xl p-7 lg:grid-cols-[.65fr_1.35fr] lg:p-10">
        <div>
          <p class="section-kicker text-xs font-bold text-cyan-300">Real-time architecture</p>
          <h2 class="mt-4 text-3xl font-black text-white">One event, every interface updated.</h2>
          <p class="mt-4 leading-7 text-slate-400">A production pattern used across customer, provider, and
            administrative workflows.</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-5 sm:items-center">
          <div class="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <Smartphone class="mx-auto text-blue-300" />
            <p class="mt-2 text-sm font-semibold">Customer</p>
          </div>
          <div class="text-center text-cyan-400">
            <Zap class="mx-auto rotate-90 sm:rotate-0" />
          </div>
          <div class="rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-center">
            <Radio class="mx-auto text-cyan-300" />
            <p class="mt-2 text-sm font-semibold">Reverb</p>
          </div>
          <div class="text-center text-cyan-400">
            <Zap class="mx-auto rotate-90 sm:rotate-0" />
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <Boxes class="mx-auto text-violet-300" />
            <p class="mt-2 text-sm font-semibold">Provider & Admin</p>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" class="scroll-mt-24 py-24">
      <div class="mx-auto max-w-7xl px-5 lg:px-8">
        <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div class="max-w-3xl">
            <p class="section-kicker text-xs font-bold text-violet-300">Featured production work</p>
            <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">Products where my contribution is
              visible in the workflow.</h2>
          </div>
          <p class="max-w-lg text-sm leading-6 text-slate-500">Commercial source code is private. These case-study cards
            describe my direct role and link to the public products.</p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-2">
          <article v-for="project in projects" :key="project.name"
            class="glass group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-7">
            <div class="flex items-start justify-between gap-5">
              <div class="flex items-center gap-4">
                <div
                  :class="['grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-black text-white shadow-lg', project.gradient]">
                  {{ project.icon }}</div>
                <div>
                  <h3 class="text-2xl font-black text-white">{{ project.name }}</h3>
                  <p class="mt-1 text-sm text-slate-400">{{ project.type }}</p>
                </div>
              </div>
              <ArrowUpRight class="text-slate-600 transition group-hover:text-cyan-300" :size="21" />
            </div>

            <p class="mt-6 leading-7 text-slate-300">{{ project.description }}</p>

            <div class="mt-6 border-t border-white/7 pt-5">
              <p class="text-xs font-bold uppercase tracking-[.16em] text-blue-300">My contribution</p>
              <ul class="mt-4 space-y-3">
                <li v-for="point in project.contribution" :key="point"
                  class="flex gap-3 text-sm leading-6 text-slate-400">
                  <Check class="mt-1 shrink-0 text-cyan-400" :size="15" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-6 flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag"
                class="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">{{ tag }}</span>
            </div>

            <div v-if="project.links.length" class="mt-6 flex flex-wrap gap-3">
              <a v-for="link in project.links" :key="link[0]" :href="link[1]" target="_blank" rel="noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                {{ link[0] }}
                <ArrowUpRight :size="14" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="experience" class="scroll-mt-24 border-y border-white/5 bg-white/[.018] py-24">
      <div class="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
        <div>
          <p class="section-kicker text-xs font-bold text-blue-300">Experience</p>
          <h2 class="mt-4 text-3xl font-black text-white sm:text-4xl">Engineering across delivery, support, and
            leadership.</h2>
          <div class="mt-8 flex gap-3">
            <BriefcaseBusiness class="text-cyan-300" />
            <p class="text-sm leading-6 text-slate-400">Experience details are intentionally concise here; the full
              résumé is available as a PDF.</p>
          </div>
        </div>

        <div class="relative border-l border-white/10 pl-7">
          <article v-for="item in experience" :key="item.role" class="relative pb-12 last:pb-0">
            <span
              class="absolute -left-[2.1rem] top-1 h-3 w-3 rounded-full border-2 border-ink-950 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,.7)]"></span>
            <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <h3 class="text-xl font-bold text-white">{{ item.role }}</h3>
                <p class="mt-1 font-medium text-blue-300">{{ item.company }}</p>
              </div>
              <span class="font-mono text-xs text-slate-500">{{ item.period }}</span>
            </div>
            <p class="mt-4 leading-7 text-slate-400">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" class="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 lg:px-8">
      <div
        class="glow-border overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600/25 via-ink-900 to-violet-600/20 p-8 text-center sm:p-14">
        <p class="section-kicker text-xs font-bold text-cyan-300">Contact</p>
        <h2 class="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">Looking for a
          developer who can own the complete workflow?</h2>
        <p class="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">Open to Backend, Laravel, Python, and Full
          Stack Engineering opportunities.</p>

        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <!-- Email -->
          <a href="mailto:reemramzym@gmail.com"
            class="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 hover:-translate-y-1">
            Email Me
          </a>

          <!-- Phone -->
          <a href="tel:+201551157579"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:-translate-y-1">
            Call Me
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/201551157579" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300 transition hover:bg-emerald-500/20 hover:-translate-y-1">
            WhatsApp
          </a> <a href="https://www.linkedin.com/in/reem-ramzy-moh/" target="_blank" rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
            <ExternalLink :size="18" /> LinkedIn
          </a>
          <a href="https://github.com/ReemRamzy" target="_blank" rel="noreferrer"
            class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
            <GitFork :size="18" /> GitHub
          </a>
        </div>
      </div>
    </section>

    <footer class="border-t border-white/5 py-8">
      <div
        class="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 text-sm text-slate-500 sm:flex-row lg:px-8">
        <p>© {{ new Date().getFullYear() }} Reem Ramzy Mohammed.</p>
      </div>
    </footer>
  </main>
</template>
