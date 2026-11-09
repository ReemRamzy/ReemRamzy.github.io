<script setup>
import { ref } from 'vue'

const selected = ref(1)

const systems = [
  { layer: '01', name: 'Client experience', technologies: 'Vue · React · Mobile apps', color: 'cyan' },
  { layer: '02', name: 'API surface', technologies: 'REST · GraphQL · Integrations', color: 'blue' },
  { layer: '03', name: 'Application services', technologies: 'Laravel · Django · Python', color: 'blue' },
  { layer: '04', name: 'Data & state', technologies: 'MySQL · MongoDB · Redis', color: 'violet' },
  { layer: '05', name: 'Live events', technologies: 'Reverb · WebSockets · Queues', color: 'cyan' },
  { layer: '06', name: 'Runtime & delivery', technologies: 'Linux · Docker · AWS · CI/CD', color: 'emerald' },
  { layer: '07', name: 'Applied intelligence', technologies: 'AI APIs · Retrieval · Automation', color: 'violet' },
]
</script>

<template>
  <div class="architecture-graph">
    <div class="architecture-graph__canvas">
      <div class="architecture-graph__orbit architecture-graph__orbit--outer" aria-hidden="true"></div>
      <div class="architecture-graph__orbit architecture-graph__orbit--inner" aria-hidden="true"></div>
      <div class="architecture-graph__core" aria-hidden="true">
        <span>APP</span><strong>↔</strong><span>WORLD</span>
      </div>
      <div class="architecture-graph__coordinates" aria-hidden="true">
        <span>APPLICATION RUNTIME / 07 LAYERS</span>
        <span>SCHEMATIC 01.01</span>
      </div>
      <span class="architecture-graph__axis architecture-graph__axis--vertical" aria-hidden="true"></span>
      <span class="architecture-graph__axis architecture-graph__axis--horizontal" aria-hidden="true"></span>
      <span class="architecture-graph__pulse" aria-hidden="true"></span>
    </div>

    <div class="architecture-graph__layers" role="list" aria-label="Application architecture layers">
      <button v-for="(item, index) in systems" :key="item.layer" type="button"
        class="architecture-node" :class="[`architecture-node--${item.color}`, { 'architecture-node--active': selected === index }]"
        :aria-pressed="selected === index" @mouseenter="selected = index" @focus="selected = index"
        @click="selected = index">
        <span class="architecture-node__number">{{ item.layer }}</span>
        <span class="architecture-node__copy">
          <span class="architecture-node__name">{{ item.name }}</span>
          <span class="architecture-node__tech">{{ item.technologies }}</span>
        </span>
        <span class="architecture-node__point" aria-hidden="true"></span>
      </button>
    </div>
    <p class="architecture-graph__hint"><span></span> Select a layer to trace its place in the system</p>
  </div>
</template>

<style scoped>
.architecture-graph {
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
}

.architecture-graph__canvas {
  position: relative;
  display: grid;
  min-height: 480px;
  aspect-ratio: .92;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, .12);
  border-radius: 50% 50% 1.4rem 1.4rem;
  background:
    radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, .15), transparent 60%),
    linear-gradient(rgba(148, 163, 184, .04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, .04) 1px, transparent 1px),
    rgba(7, 13, 27, .7);
  background-size: auto, 32px 32px, 32px 32px, auto;
}

.architecture-graph__orbit {
  position: absolute;
  left: 50%;
  top: 50%;
  border: 1px solid rgba(103, 232, 249, .18);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-24deg);
}

.architecture-graph__orbit--outer {
  width: 78%;
  height: 39%;
  box-shadow: 0 0 44px rgba(34, 211, 238, .07), inset 0 0 30px rgba(59, 130, 246, .06);
}

.architecture-graph__orbit--inner {
  width: 58%;
  height: 29%;
  border-color: rgba(167, 139, 250, .2);
  transform: translate(-50%, -50%) rotate(54deg);
}

.architecture-graph__core {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: .65rem;
  border: 1px solid rgba(148, 163, 184, .2);
  border-radius: 999px;
  background: rgba(6, 12, 26, .8);
  padding: .7rem 1rem;
  box-shadow: 0 0 48px rgba(59, 130, 246, .15);
  color: #94a3b8;
  font-family: var(--font-mono);
  font-size: .58rem;
  letter-spacing: .12em;
  backdrop-filter: blur(12px);
}

.architecture-graph__core strong {
  color: #67e8f9;
  font-size: 1rem;
}

.architecture-graph__coordinates {
  position: absolute;
  inset: 1.2rem 1.2rem auto;
  display: flex;
  justify-content: space-between;
  gap: .5rem;
  color: #526179;
  font-family: var(--font-mono);
  font-size: .48rem;
  letter-spacing: .1em;
}

.architecture-graph__axis {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(103, 232, 249, .22), transparent);
}

.architecture-graph__axis--vertical {
  width: 1px;
  height: 70%;
  background: linear-gradient(transparent, rgba(103, 232, 249, .25), transparent);
}

.architecture-graph__axis--horizontal {
  width: 82%;
  height: 1px;
}

.architecture-graph__pulse {
  position: absolute;
  top: 50%;
  left: 9%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #a5f3fc;
  box-shadow: 0 0 13px 4px rgba(34, 211, 238, .35);
  animation: orbit-pulse 6s ease-in-out infinite;
}

.architecture-graph__layers {
  position: relative;
  display: grid;
  gap: .3rem;
}

.architecture-graph__layers::before {
  position: absolute;
  z-index: -1;
  top: 1rem;
  bottom: 1rem;
  left: 2.45rem;
  width: 1px;
  background: linear-gradient(to bottom, rgba(34, 211, 238, .25), rgba(148, 163, 184, .12), rgba(167, 139, 250, .25));
  content: "";
}

.architecture-node {
  position: relative;
  display: grid;
  grid-template-columns: 2.3rem minmax(0, 1fr) .5rem;
  align-items: center;
  gap: 1rem;
  border: 1px solid transparent;
  border-radius: .8rem;
  background: transparent;
  padding: .85rem .9rem;
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition: background .3s ease, border-color .3s ease, transform .3s ease;
}

.architecture-node:hover,
.architecture-node--active {
  transform: translateX(4px);
  border-color: rgba(148, 163, 184, .14);
  background: linear-gradient(100deg, rgba(255, 255, 255, .055), rgba(255, 255, 255, .012));
}

.architecture-node__number {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid rgba(148, 163, 184, .18);
  border-radius: 50%;
  background: #0a1020;
  color: #738198;
  font-family: var(--font-mono);
  font-size: .58rem;
  transition: color .25s ease, border-color .25s ease, box-shadow .25s ease;
}

.architecture-node__copy {
  display: grid;
  gap: .3rem;
}

.architecture-node__name { color: #dce5f2; font-size: .87rem; font-weight: 650; }
.architecture-node__tech { color: #718096; font-family: var(--font-mono); font-size: .62rem; }
.architecture-node__point { width: .4rem; height: .4rem; border-radius: 50%; background: #334155; transition: background .25s ease, box-shadow .25s ease; }

.architecture-node--active .architecture-node__number { color: #a5f3fc; border-color: rgba(34, 211, 238, .42); box-shadow: 0 0 17px rgba(34, 211, 238, .14); }
.architecture-node--active .architecture-node__name { color: #fff; }
.architecture-node--active .architecture-node__point { background: #67e8f9; box-shadow: 0 0 12px rgba(34, 211, 238, .8); }

.architecture-graph__hint {
  grid-column: 2;
  margin: -.7rem 0 0;
  color: #64748b;
  font-family: var(--font-mono);
  font-size: .59rem;
}

.architecture-graph__hint span {
  display: inline-block;
  width: .4rem;
  height: .4rem;
  margin-right: .4rem;
  border-radius: 50%;
  background: #67e8f9;
}

@keyframes orbit-pulse {
  0%, 100% { transform: translate(0, -22px); opacity: .35; }
  50% { transform: translate(0, 22px); opacity: 1; }
}

@media (max-width: 820px) {
  .architecture-graph { grid-template-columns: 1fr; gap: 2rem; }
  .architecture-graph__canvas { width: 100%; min-width: 0; min-height: 0; aspect-ratio: 1.35; border-radius: 1.2rem; }
  .architecture-graph__layers::before { left: 2.25rem; }
  .architecture-graph__hint { grid-column: 1; }
}

@media (max-width: 480px) {
  .architecture-graph__canvas { aspect-ratio: 1.15; }
  .architecture-node { grid-template-columns: 2rem minmax(0, 1fr) .4rem; gap: .7rem; padding: .8rem .35rem; }
  .architecture-graph__layers::before { left: 1.35rem; }
  .architecture-node__number { width: 1.8rem; height: 1.8rem; }
  .architecture-node__tech { font-size: .56rem; }
}

@media (prefers-reduced-motion: reduce) {
  .architecture-graph__pulse { animation: none; }
  .architecture-node,
  .architecture-node__number,
  .architecture-node__point { transition: none; }
}
</style>
