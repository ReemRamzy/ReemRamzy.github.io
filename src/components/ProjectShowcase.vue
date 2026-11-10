<script setup>
import { ArrowUpRight } from '@lucide/vue'

const vReveal = {
  mounted(element) {
    element.dataset.reveal = ''
  },
}

defineProps({
  projects: { type: Array, required: true },
})
</script>

<template>
  <div class="project-index">
    <article v-for="(project, index) in projects" :key="project.name"
      class="project-index__item" v-reveal>
      <div class="project-index__topline">
        <span class="project-index__number">0{{ index + 1 }}</span>
        <span class="project-index__category">{{ project.category }}</span>
      </div>
      <div class="project-index__heading">
        <div>
          <h3>{{ project.name }}</h3>
          <p>{{ project.type }}</p>
        </div>
        <span :class="['project-index__monogram', `project-index__monogram--${index % 5}`]"
          aria-hidden="true">{{ project.icon }}</span>
      </div>
      <p class="project-index__description">{{ project.description }}</p>
      <details class="project-index__details">
        <summary>View contribution <span>+</span></summary>
        <ul>
          <li v-for="point in project.contribution" :key="point">{{ point }}</li>
        </ul>
      </details>
      <div class="project-index__bottom">
        <div class="project-index__stack">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        <a v-for="link in project.links" :key="link[0]" :href="link[1]" target="_blank" rel="noreferrer">
          {{ link[0] }} <ArrowUpRight :size="13" />
        </a>
        <span v-if="!project.links.length" class="project-index__private">No public link</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.project-index {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 clamp(2rem, 6vw, 6rem);
  border-top: 1px solid rgba(148, 163, 184, .14);
}

.project-index__item {
  min-width: 0;
  padding: 1.8rem 0;
  border-bottom: 1px solid rgba(148, 163, 184, .12);
  transition: border-color .25s ease, transform .35s ease;
}

.project-index__item:hover {
  transform: translateY(-2px);
  border-color: rgba(103, 232, 249, .3);
}

.project-index__topline { display: flex; align-items: center; gap: .8rem; }
.project-index__number { color: #67e8f9; font-family: var(--font-mono); font-size: .66rem; }
.project-index__category { color: #738198; font-size: .61rem; letter-spacing: .1em; text-transform: uppercase; }
.project-index__heading { display: flex; justify-content: space-between; gap: 1rem; margin-top: 1rem; }
.project-index__heading h3 { margin: 0; color: #f1f5f9; font-size: 1.45rem; font-weight: 680; letter-spacing: -.05em; }
.project-index__heading p { margin: .35rem 0 0; color: #8a98ab; font-size: .77rem; }
.project-index__monogram { display: grid; width: 2.6rem; height: 2.6rem; flex: 0 0 auto; place-items: center; border: 1px solid rgba(148, 163, 184, .18); border-radius: .8rem; background: linear-gradient(140deg, rgba(245, 158, 11, .13), rgba(249, 115, 22, .04)); color: #fbbf24; font-family: var(--font-mono); font-size: .67rem; }
.project-index__monogram--1 { background: linear-gradient(140deg, rgba(16, 185, 129, .13), rgba(34, 211, 238, .04)); color: #6ee7b7; }
.project-index__monogram--2 { background: linear-gradient(140deg, rgba(96, 165, 250, .13), rgba(59, 130, 246, .04)); color: #93c5fd; }
.project-index__monogram--3 { background: linear-gradient(140deg, rgba(217, 70, 239, .13), rgba(139, 92, 246, .04)); color: #e879f9; }
.project-index__monogram--4 { background: linear-gradient(140deg, rgba(34, 211, 238, .13), rgba(20, 184, 166, .04)); color: #67e8f9; }
.project-index__description { margin: 1rem 0; color: #9aa8bb; font-size: .8rem; line-height: 1.7; }
.project-index__details { border-top: 1px solid rgba(148, 163, 184, .1); padding-top: .75rem; }
.project-index__details summary { display: flex; justify-content: space-between; color: #8491a4; cursor: pointer; font-size: .7rem; list-style: none; }
.project-index__details summary::-webkit-details-marker { display: none; }
.project-index__details summary span { color: #67e8f9; font-size: 1rem; transition: transform .2s ease; }
.project-index__details[open] summary span { transform: rotate(45deg); }
.project-index__details ul { display: grid; gap: .4rem; padding-left: 1rem; color: #8491a4; font-size: .72rem; line-height: 1.6; }
.project-index__bottom { display: flex; flex-wrap: wrap; align-items: center; gap: .8rem; margin-top: 1.1rem; }
.project-index__stack { display: flex; flex-wrap: wrap; gap: .4rem; }
.project-index__stack span { border: 1px solid rgba(148, 163, 184, .14); border-radius: 999px; padding: .32rem .62rem; color: #9aa8bb; font-family: var(--font-mono); font-size: .59rem; }
.project-index__bottom > a { display: inline-flex; align-items: center; gap: .25rem; color: #a5f3fc; font-size: .72rem; font-weight: 650; transition: color .2s ease; }
.project-index__bottom > a:hover { color: white; }
.project-index__private { color: #657187; font-size: .65rem; }

@media (max-width: 560px) {
  .project-index { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .project-index__item,
  .project-index__details summary span { transition: none; }
}
</style>
