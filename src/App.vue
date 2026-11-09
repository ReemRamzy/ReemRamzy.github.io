<script setup>
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowDown, ArrowUpRight, Mail, Menu, X } from '@lucide/vue'
import ArchitectureGraph from './components/ArchitectureGraph.vue'
import ContactPanel from './components/ContactPanel.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import SectionHeading from './components/SectionHeading.vue'
import SkillSystem from './components/SkillSystem.vue'
import { experience, projects } from './data/portfolio'

const menuOpen = ref(false)
const SystemMap = defineAsyncComponent(() => import('./components/SystemMap.vue'))
const activeSection = ref('about')
const main = ref(null)
let revealObserver
let sectionObserver
let pointerFrame

const navigation = [
  ['About', '#about'],
  ['Architecture', '#architecture'],
  ['Expertise', '#expertise'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

const vReveal = {
  mounted(element) {
    element.dataset.reveal = ''
  },
}

function updatePointer(event) {
  if (window.matchMedia('(pointer: coarse)').matches) return
  cancelAnimationFrame(pointerFrame)
  pointerFrame = requestAnimationFrame(() => {
    const bounds = main.value.getBoundingClientRect()
    main.value.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`)
    main.value.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`)
  })
}

onMounted(() => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
  }

  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort(
      (a, b) => b.intersectionRatio - a.intersectionRatio,
    )
    if (visible[0]) activeSection.value = visible[0].target.id
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.2, 0.5] })
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  sectionObserver?.disconnect()
  cancelAnimationFrame(pointerFrame)
})
</script>

<template>
  <main ref="main" class="site-shell" @pointermove="updatePointer">
    <div class="ambient-grid pointer-events-none fixed inset-0 -z-10"></div>
    <div class="pointer-aura pointer-events-none fixed inset-0 -z-10" aria-hidden="true"></div>

    <header class="site-header fixed inset-x-0 top-0 z-50">
      <nav class="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-3 lg:px-10"
        aria-label="Primary navigation">
        <a href="#" class="brand group flex items-center gap-3 font-semibold text-white">
          <span class="brand__mark">RR</span>
          <span class="brand__name">Reem Ramzy<span>.</span></span>
        </a>

        <div class="desktop-navigation hidden items-center gap-6 text-sm md:flex">
          <a v-for="item in navigation" :key="item[0]" :href="item[1]"
            :class="{ 'desktop-navigation__link--active': activeSection === item[1].slice(1) }"
            :aria-current="activeSection === item[1].slice(1) ? 'location' : undefined">
            {{ item[0] }}
          </a>
        </div>

        <a href="./Reem-Ramzy-Senior-Full-Stack-Engineer.pdf"
          class="resume-link hidden md:inline-flex">
          Résumé <ArrowUpRight :size="14" />
        </a>

        <button class="mobile-menu-button rounded-lg md:hidden"
          @click="menuOpen = !menuOpen" aria-label="Toggle navigation" aria-controls="mobile-navigation"
          :aria-expanded="menuOpen">
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </nav>

      <div v-if="menuOpen" id="mobile-navigation" class="border-t border-white/5 bg-ink-950 px-5 py-5 md:hidden">
        <div class="flex flex-col gap-4">
          <a v-for="item in navigation" :key="item[0]" :href="item[1]" class="text-slate-300"
            @click="menuOpen = false">{{ item[0] }}</a>
          <a href="./Reem-Ramzy-Senior-Full-Stack-Engineer.pdf" class="font-semibold text-cyan-300">View résumé <ArrowUpRight :size="14" /></a>
        </div>
      </div>
    </header>

    <section
      class="hero relative mx-auto grid min-h-screen max-w-[90rem] items-center gap-10 px-5 pb-20 pt-32 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pt-24">
      <div class="hero__copy relative z-10" v-reveal>
        <div
          class="availability mb-8 inline-flex items-center gap-2">
          <span class="availability__signal"></span>
          OPEN TO SENIOR FULL-STACK OPPORTUNITIES
        </div>

        <p class="eyebrow mb-5">FULL STACK ENGINEER <span>·</span> SYSTEMS THINKER</p>
        <h1 class="hero__title">
          I build the
          <span>systems</span>
          <span class="hero__title-outline">behind everything.</span>
        </h1>
        <p class="hero__intro">
          From interface to infrastructure, I connect application engineering, backend architecture, real-time systems, and Applied AI into products built for the real world.
        </p>

        <div class="hero__actions">
          <a href="#projects" class="button-primary">
            Explore selected work
            <ArrowUpRight :size="18" />
          </a>
          <a href="mailto:reemramzym@gmail.com" class="button-quiet">
            <Mail :size="16" /> Start a conversation
          </a>
        </div>

        <div class="hero__metadata">
          <span>Alexandria, Egypt</span><i></i><span>Arabic — Native</span><i></i><span>English — Fluent</span>
        </div>
      </div>

      <div class="hero__scene-wrap" v-reveal>
        <div class="hero__scene-chrome">
          <div><span class="live-dot"></span> SYSTEM TOPOLOGY <span class="hero__scene-dim">/ 01</span></div>
          <span class="hero__scene-coordinate">31°12' N&nbsp; 29°55' E</span>
        </div>
        <div class="hero__scene-frame">
          <div class="hero__scene-light" aria-hidden="true"></div>
          <SystemMap />
          <div class="hero__scene-legend">
            <span><i class="legend-dot legend-dot--blue"></i>APPLICATION</span>
            <span><i class="legend-dot legend-dot--violet"></i>INTELLIGENCE</span>
            <span><i class="legend-dot legend-dot--green"></i>INFRASTRUCTURE</span>
          </div>
        </div>
        <div class="hero__scene-foot">
          <span>END-TO-END ENGINEERING</span>
          <span>FROM REQUEST <i></i> TO PRODUCTION</span>
        </div>
      </div>
      <a href="#about" class="hero__scroll" aria-label="Scroll to learn more">
        <span>SCROLL TO EXPLORE</span><ArrowDown :size="14" />
      </a>
    </section>

    <div class="story-bridge" aria-hidden="true">
      <span>01</span><i></i><span>ENGINEERING COMPLETE SYSTEMS</span><i></i><span>APPLICATION → OPERATIONS → INTELLIGENCE</span>
    </div>

    <section id="about" class="content-section mx-auto max-w-[90rem] scroll-mt-24 px-5 py-24 lg:px-10 lg:py-32">
      <div class="about-layout" v-reveal>
        <div class="about-heading">
          <p class="eyebrow"><span>01 /</span> ABOUT</p>
          <h2>Built to connect the <span class="text-gradient">whole picture.</span></h2>
        </div>
        <div class="about-copy">
          <p class="about-lead">I develop scalable web applications, mobile backends, fintech systems, logistics platforms, and real-time products, connecting frontend experiences to backend services, APIs, and data.</p>
          <div class="about-copy__details">
            <p>
              My work spans system and API design, backend architecture, database performance, real-time workflows, and
              Applied AI integrations. I also work across Linux infrastructure, deployments, monitoring, troubleshooting,
              and production maintenance while continuing to deepen my DevOps capabilities.
            </p>
            <p>I also lead assigned technical work, review code, support developers, estimate tasks, and coordinate
              delivery with product, frontend, and QA teams.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="architecture" class="architecture-section scroll-mt-24">
      <div class="mx-auto max-w-[90rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading sequence="02 /" label="SYSTEM ARCHITECTURE"
          description="My scope spans the complete application lifecycle—from client experience and data through real-time delivery, infrastructure, and AI integrations."
          v-reveal>
          Every layer. <span class="text-gradient">One working system.</span>
        </SectionHeading>
        <ArchitectureGraph />
        <div class="capability-progression" v-reveal>
          <div v-for="(step, index) in ['Full Stack Engineering', 'Real-Time Systems', 'DevOps & Infrastructure', 'Applied AI']"
            :key="step" class="capability-progression__step">
            <span>0{{ index + 1 }}</span><strong>{{ step }}</strong>
            <ArrowUpRight v-if="index < 3" :size="15" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>

    <section id="expertise" class="content-section mx-auto max-w-[90rem] scroll-mt-24 px-5 py-24 lg:px-10 lg:py-32">
      <SectionHeading sequence="03 /" label="ENGINEERING TOOLKIT"
        description="Familiar technologies organized around how complete products are designed, built, connected, and operated."
        class="section-heading--skills" v-reveal>
        Capabilities, <span class="text-gradient">layer by layer.</span>
      </SectionHeading>
      <div class="skills-layout">
        <div class="skills-context" v-reveal>
          <p class="skills-context__label">SYSTEM / 06 LAYERS</p>
          <p class="skills-context__statement">From the <span>first pixel</span> to the <span>production signal.</span></p>
          <p class="skills-context__note">Hands-on AI application integration, with growing practice in retrieval architecture. DevOps and infrastructure are expanding strengths—not a separate engineering title.</p>
          <div class="skills-context__status"><span></span> CONTINUOUSLY EXPANDING</div>
        </div>
        <SkillSystem />
      </div>
    </section>

    <section id="projects" class="projects-section scroll-mt-24">
      <div class="mx-auto max-w-[90rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading sequence="04 /" label="SELECTED PRODUCTION WORK"
          description="Commercial source code is private. These case studies describe my direct role and link to public products where available."
          v-reveal>
          Systems with <span class="text-gradient">real-world stakes.</span>
        </SectionHeading>
        <ProjectShowcase :projects="projects" />
      </div>
    </section>

    <section id="experience" class="experience-section scroll-mt-24">
      <div class="mx-auto max-w-[90rem] px-5 py-24 lg:px-10 lg:py-32">
        <SectionHeading sequence="05 /" label="EXPERIENCE"
          description="Experience across delivery, support, and technical leadership. Full career details are available in the résumé."
          v-reveal>
          Engineering through <span class="text-gradient">every phase.</span>
        </SectionHeading>

        <div class="experience-list">
          <article v-for="(item, index) in experience" :key="item.role" class="experience-entry" v-reveal>
            <span class="experience-entry__index">0{{ index + 1 }}</span>
            <div class="experience-entry__role">
              <h3>{{ item.role }}</h3>
              <p>{{ item.company }}</p>
            </div>
            <p class="experience-entry__description">{{ item.text }}</p>
            <span class="experience-entry__period">{{ item.period }}</span>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" class="contact-section scroll-mt-24">
      <ContactPanel v-reveal />
    </section>

    <footer class="site-footer">
      <div class="mx-auto flex max-w-[90rem] flex-col justify-between gap-3 px-5 py-7 text-xs sm:flex-row lg:px-10">
        <p>© {{ new Date().getFullYear() }} Reem Ramzy Mohammed.</p>
        <p>ENGINEERED WITH INTENTION <span>·</span> ALEXANDRIA, EGYPT</p>
      </div>
    </footer>
  </main>
</template>
