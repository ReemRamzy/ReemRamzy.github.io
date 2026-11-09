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
  <div class="project-showcase">
    <article v-for="(project, index) in projects.slice(0, 2)" :key="project.name"
      class="case-study" :class="{ 'case-study--reverse': index % 2 === 1 }" v-reveal>
      <div class="case-study__visual" :class="`case-study__visual--${index}`" aria-hidden="true">
        <div class="case-study__visual-grid"></div>
        <span class="case-study__visual-index">CASE / {{ String(index + 1).padStart(2, '0') }}</span>
        <div class="case-study__diagram">
          <div class="case-study__diagram-orbit case-study__diagram-orbit--one"></div>
          <div class="case-study__diagram-orbit case-study__diagram-orbit--two"></div>
          <div class="case-study__diagram-core">
            <span class="case-study__monogram">{{ project.icon }}</span>
            <span>{{ project.name }}</span>
          </div>
          <span class="case-study__diagram-node case-study__diagram-node--one"></span>
          <span class="case-study__diagram-node case-study__diagram-node--two"></span>
          <span class="case-study__diagram-node case-study__diagram-node--three"></span>
          <span class="case-study__diagram-link case-study__diagram-link--one"></span>
          <span class="case-study__diagram-link case-study__diagram-link--two"></span>
          <span class="case-study__diagram-link case-study__diagram-link--three"></span>
          <span class="case-study__data-label case-study__data-label--one">CLIENT</span>
          <span class="case-study__data-label case-study__data-label--two">SERVICE</span>
          <span class="case-study__data-label case-study__data-label--three">LIVE DATA</span>
        </div>
        <div class="case-study__visual-foot">
          <span>CONNECTED SYSTEM</span>
          <span>0{{ index + 1 }} — 02</span>
        </div>
      </div>

      <div class="case-study__content">
        <div class="case-study__meta">
          <span class="case-study__number">0{{ index + 1 }}</span>
          <span class="case-study__category">{{ project.category }}</span>
        </div>
        <h3 class="case-study__title">{{ project.name }}</h3>
        <p class="case-study__type">{{ project.type }}</p>
        <p class="case-study__description">{{ project.description }}</p>
        <div class="case-study__contribution">
          <span class="case-study__eyebrow">MY CONTRIBUTION</span>
          <p>{{ project.contribution[0] }}</p>
          <ul>
            <li v-for="point in project.contribution.slice(1)" :key="point">{{ point }}</li>
          </ul>
        </div>
        <div class="case-study__footer">
          <div class="case-study__stack">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <div v-if="project.links.length" class="case-study__links">
            <a v-for="link in project.links" :key="link[0]" :href="link[1]" target="_blank" rel="noreferrer">
              {{ link[0] }} <ArrowUpRight :size="14" />
            </a>
          </div>
        </div>
      </div>
    </article>

    <div class="project-index">
      <article v-for="(project, index) in projects.slice(2)" :key="project.name" class="project-index__item" v-reveal>
        <div class="project-index__topline">
          <span class="project-index__number">0{{ index + 3 }}</span>
          <span class="project-index__category">{{ project.category }}</span>
        </div>
        <div class="project-index__heading">
          <div>
            <h3>{{ project.name }}</h3>
            <p>{{ project.type }}</p>
          </div>
          <span :class="['project-index__monogram', `project-index__monogram--${index}`]">{{ project.icon }}</span>
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
  </div>
</template>

<style scoped>
.project-showcase { display: grid; gap: clamp(2.5rem, 7vw, 6rem); }

.case-study {
  display: grid;
  grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
  padding: clamp(1.2rem, 4vw, 3rem) 0;
  border-top: 1px solid rgba(148, 163, 184, .14);
}

.case-study--reverse .case-study__visual { order: 2; }
.case-study--reverse .case-study__content { order: 1; }

.case-study__visual {
  position: relative;
  display: grid;
  min-height: 390px;
  aspect-ratio: 1.22;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, .16);
  border-radius: 1.2rem;
  transition: border-color .45s ease, transform .55s cubic-bezier(.2,.7,.2,1);
  background:
    radial-gradient(ellipse at 50% 50%, rgba(14, 116, 144, .17), transparent 62%),
    linear-gradient(150deg, rgba(22, 38, 64, .75), rgba(7, 13, 26, .95));
}

.case-study__visual--1 {
  background:
    radial-gradient(ellipse at 53% 48%, rgba(124, 58, 237, .17), transparent 60%),
    linear-gradient(150deg, rgba(35, 29, 65, .75), rgba(7, 13, 26, .95));
}

.case-study__visual-grid {
  position: absolute;
  inset: 0;
  opacity: .38;
  background-image:
    linear-gradient(rgba(148, 163, 184, .09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, .09) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: radial-gradient(ellipse at center, black 8%, transparent 85%);
}

.case-study__visual-index,
.case-study__visual-foot {
  position: absolute;
  z-index: 3;
  color: #64748b;
  font-family: var(--font-mono);
  font-size: .56rem;
  letter-spacing: .14em;
}

.case-study__visual-index { top: 1.2rem; left: 1.2rem; }
.case-study__visual-foot { right: 1.2rem; bottom: 1.2rem; left: 1.2rem; display: flex; justify-content: space-between; }

.case-study__diagram { position: relative; width: min(74%, 350px); aspect-ratio: 1; }
.case-study__diagram { transition: transform .6s cubic-bezier(.2,.7,.2,1); }
.case-study:hover .case-study__visual { transform: translateY(-3px); border-color: rgba(103, 232, 249, .28); }
.case-study:hover .case-study__diagram { transform: perspective(900px) rotateY(-3deg) rotateX(1deg) scale(1.025); }
.case-study--reverse:hover .case-study__diagram { transform: perspective(900px) rotateY(3deg) rotateX(1deg) scale(1.025); }

.case-study__diagram-orbit {
  position: absolute;
  inset: 11%;
  border: 1px solid rgba(103, 232, 249, .3);
  border-radius: 50%;
  transform: rotate(-31deg) scaleY(.51);
  box-shadow: 0 0 35px rgba(34, 211, 238, .08);
}

.case-study__diagram-orbit--two {
  inset: 23%;
  border-color: rgba(167, 139, 250, .4);
  transform: rotate(38deg) scaleY(.61);
}

.case-study__visual--1 .case-study__diagram-orbit { border-color: rgba(167, 139, 250, .36); }
.case-study__visual--1 .case-study__diagram-orbit--two { border-color: rgba(96, 165, 250, .42); }

.case-study__diagram-core {
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  min-width: 6rem;
  justify-items: center;
  gap: .45rem;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(148, 163, 184, .24);
  border-radius: 1rem;
  background: rgba(7, 13, 27, .88);
  padding: .8rem 1rem;
  color: #dce5f2;
  font-size: .75rem;
  font-weight: 650;
  box-shadow: 0 10px 40px rgba(0, 0, 0, .35), 0 0 30px rgba(34, 211, 238, .09);
  backdrop-filter: blur(12px);
}

.case-study__monogram {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: .65rem;
  background: linear-gradient(135deg, #2563eb, #22d3ee);
  color: white;
  font-size: .65rem;
  font-weight: 800;
}

.case-study__visual--1 .case-study__monogram { background: linear-gradient(135deg, #7c3aed, #60a5fa); }

.case-study__diagram-node {
  position: absolute;
  z-index: 1;
  width: .56rem;
  height: .56rem;
  border: 1px solid #a5f3fc;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 14px 3px rgba(34, 211, 238, .35);
}

.case-study__diagram-node--one { top: 16%; left: 25%; }
.case-study__diagram-node--two { top: 26%; right: 15%; }
.case-study__diagram-node--three { right: 29%; bottom: 12%; }

.case-study__diagram-link {
  position: absolute;
  z-index: 0;
  height: 1px;
  transform-origin: left center;
  background: linear-gradient(90deg, rgba(103, 232, 249, .7), rgba(103, 232, 249, .06));
}

.case-study__diagram-link--one { top: 19%; left: 27%; width: 39%; transform: rotate(12deg); }
.case-study__diagram-link--two { top: 27%; right: 13%; width: 34%; transform: rotate(132deg); }
.case-study__diagram-link--three { right: 28%; bottom: 15%; width: 35%; transform: rotate(208deg); }

.case-study__data-label {
  position: absolute;
  color: #64748b;
  font-family: var(--font-mono);
  font-size: .49rem;
  letter-spacing: .12em;
}

.case-study__data-label--one { top: 5%; left: 6%; }
.case-study__data-label--two { top: 14%; right: 3%; }
.case-study__data-label--three { right: 2%; bottom: 4%; }

.case-study__content { padding: .5rem 0; }
.case-study__meta { display: flex; align-items: center; gap: .8rem; }
.case-study__number { color: #67e8f9; font-family: var(--font-mono); font-size: .72rem; }
.case-study__category { color: #8391a7; font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; }
.case-study__title { margin: 1.1rem 0 .1rem; color: #f8fafc; font-size: clamp(2.6rem, 5vw, 4.5rem); font-weight: 740; letter-spacing: -.075em; line-height: .96; }
.case-study__type { margin: .8rem 0 0; color: #8d9bb0; font-size: .9rem; }
.case-study__description { max-width: 34rem; margin: 1.5rem 0 0; color: #bdc8d8; font-size: 1rem; line-height: 1.8; }
.case-study__contribution { margin-top: 1.7rem; border-left: 1px solid rgba(103, 232, 249, .45); padding-left: 1rem; }
.case-study__eyebrow { color: #67e8f9; font-family: var(--font-mono); font-size: .57rem; letter-spacing: .16em; }
.case-study__contribution p { margin: .6rem 0 0; color: #e2e8f0; font-size: .84rem; font-weight: 600; line-height: 1.65; }
.case-study__contribution ul { display: grid; gap: .35rem; margin: .65rem 0 0; padding-left: 1rem; color: #8491a4; font-size: .74rem; line-height: 1.55; }
.case-study__footer { display: grid; gap: 1rem; margin-top: 1.5rem; }
.case-study__stack,
.project-index__stack { display: flex; flex-wrap: wrap; gap: .4rem; }
.case-study__stack span,
.project-index__stack span { border: 1px solid rgba(148, 163, 184, .14); border-radius: 999px; padding: .32rem .62rem; color: #9aa8bb; font-family: var(--font-mono); font-size: .59rem; }
.case-study__links { display: flex; flex-wrap: wrap; gap: 1rem; }
.case-study__links a,
.project-index__bottom > a { display: inline-flex; align-items: center; gap: .25rem; color: #a5f3fc; font-size: .72rem; font-weight: 650; transition: color .2s ease; }
.case-study__links a:hover,
.project-index__bottom > a:hover { color: white; }

.project-index {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 clamp(2rem, 6vw, 6rem);
  border-top: 1px solid rgba(148, 163, 184, .14);
}

.project-index__item { padding: 1.8rem 0; border-bottom: 1px solid rgba(148, 163, 184, .12); }
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
.project-index__private { color: #657187; font-size: .65rem; }

@media (max-width: 800px) {
  .case-study { grid-template-columns: 1fr; gap: 1.7rem; }
  .case-study--reverse .case-study__visual,
  .case-study--reverse .case-study__content { order: initial; }
  .case-study__visual { min-height: 300px; aspect-ratio: 1.5; }
}

@media (max-width: 560px) {
  .project-index { grid-template-columns: 1fr; }
  .case-study__visual { min-height: 250px; aspect-ratio: 1.2; }
  .case-study__title { font-size: 3.2rem; }
  .case-study__category { font-size: .58rem; }
}

@media (prefers-reduced-motion: reduce) {
  .case-study__visual,
  .case-study__diagram { transition: none; }
  .case-study:hover .case-study__visual,
  .case-study:hover .case-study__diagram,
  .case-study--reverse:hover .case-study__diagram { transform: none; }
}
</style>
