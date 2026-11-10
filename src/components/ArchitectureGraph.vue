<script setup>
import { computed, ref } from 'vue'

const selected = ref(2)

const systems = [
  { layer: '01', name: 'Client experience', technologies: 'Vue · React · Mobile apps', color: 'cyan', point: [20, 19] },
  { layer: '02', name: 'API surface', technologies: 'REST · GraphQL · Integrations', color: 'blue', point: [73, 31] },
  { layer: '03', name: 'Application services', technologies: 'PHP + Laravel · Django + Python · OOP', color: 'blue', point: [27, 44] },
  { layer: '04', name: 'Data & state', technologies: 'MySQL · MongoDB · Redis', color: 'violet', point: [74, 57] },
  { layer: '05', name: 'Live events', technologies: 'Reverb · WebSockets · Queues', color: 'cyan', point: [27, 70] },
  { layer: '06', name: 'Runtime & delivery', technologies: 'Linux · Docker · AWS · CI/CD', color: 'emerald', point: [73, 82] },
  { layer: '07', name: 'Applied intelligence', technologies: 'AI APIs · Retrieval · Automation', color: 'violet', point: [48, 94] },
]

const connections = [
  { from: 0, to: 1, path: 'M 20 19 C 41 16, 51 24, 73 31' },
  { from: 1, to: 2, path: 'M 73 31 C 78 39, 49 40, 27 44' },
  { from: 2, to: 3, path: 'M 27 44 C 46 48, 53 53, 74 57' },
  { from: 3, to: 4, path: 'M 74 57 C 78 65, 50 67, 27 70' },
  { from: 4, to: 5, path: 'M 27 70 C 45 76, 52 78, 73 82' },
  { from: 5, to: 6, path: 'M 73 82 C 71 91, 60 91, 48 94' },
  { from: 2, to: 6, path: 'M 27 44 C 8 61, 31 84, 48 94', secondary: true },
  { from: 3, to: 6, path: 'M 74 57 C 95 69, 68 88, 48 94', secondary: true },
]

const activeSystem = computed(() => systems[selected.value])

function selectLayer(index) {
  selected.value = index
}
</script>

<template>
  <div class="architecture-graph">
    <div class="architecture-graph__canvas">
      <div class="architecture-graph__coordinates" aria-hidden="true">
        <span>APPLICATION RUNTIME / 07 LAYERS</span>
        <span>SCHEMATIC 01.01</span>
      </div>

      <svg class="architecture-map" viewBox="0 0 100 100" role="group"
        aria-label="Interactive application architecture map">
        <path v-for="(connection, index) in connections" :key="index"
          :d="connection.path"
          :class="[
            'architecture-map__connection',
            { 'architecture-map__connection--active': !connection.secondary && selected >= connection.to,
              'architecture-map__connection--secondary': connection.secondary },
          ]" />
        <g v-for="(item, index) in systems" :key="item.layer"
          class="architecture-map__node"
          :class="[`architecture-map__node--${item.color}`, { 'architecture-map__node--active': selected === index }]"
          :transform="`translate(${item.point[0]} ${item.point[1]})`"
          role="button" tabindex="0" :aria-label="`${item.name}: ${item.technologies}`"
          :aria-pressed="selected === index"
          @mouseenter="selectLayer(index)" @focus="selectLayer(index)" @click="selectLayer(index)"
          @keydown.enter.prevent="selectLayer(index)" @keydown.space.prevent="selectLayer(index)">
          <circle class="architecture-map__node-halo" r="7" />
          <circle class="architecture-map__node-ring" r="3.3" />
          <circle class="architecture-map__node-core" r="1.25" />
          <text y="6.4" text-anchor="middle">{{ item.layer }}</text>
        </g>
      </svg>

      <div class="architecture-inspector" aria-live="polite">
        <span class="architecture-inspector__index">{{ activeSystem.layer }} / 07</span>
        <div>
          <strong>{{ activeSystem.name }}</strong>
          <p>{{ activeSystem.technologies }}</p>
        </div>
        <span class="architecture-inspector__signal"><i></i> ACTIVE LAYER</span>
      </div>
    </div>

    <div class="architecture-graph__layers" role="group" aria-label="Application architecture layers">
      <button v-for="(item, index) in systems" :key="item.layer" type="button"
        class="architecture-node"
        :class="[`architecture-node--${item.color}`, { 'architecture-node--active': selected === index }]"
        :aria-pressed="selected === index"
        @mouseenter="selectLayer(index)" @focus="selectLayer(index)" @click="selectLayer(index)">
        <span class="architecture-node__number">{{ item.layer }}</span>
        <span class="architecture-node__copy">
          <span class="architecture-node__name">{{ item.name }}</span>
          <span class="architecture-node__tech">{{ item.technologies }}</span>
        </span>
        <span class="architecture-node__point" aria-hidden="true"></span>
      </button>
      <p class="architecture-graph__hint"><span></span> Select a layer to trace its connections</p>
    </div>
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
  min-width: 0;
  min-height: 480px;
  grid-template-rows: minmax(0, 1fr) auto;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, .12);
  border-radius: 48% 48% 1.2rem 1.2rem;
  background:
    radial-gradient(ellipse at 50% 47%, rgba(37, 99, 235, .15), transparent 60%),
    linear-gradient(rgba(148, 163, 184, .04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, .04) 1px, transparent 1px),
    rgba(7, 13, 27, .7);
  background-size: auto, 32px 32px, 32px 32px, auto;
}

.architecture-graph__coordinates {
  position: absolute;
  inset: 1.2rem 1.2rem auto;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: .5rem;
  color: #526179;
  font-family: var(--font-mono);
  font-size: .48rem;
  letter-spacing: .1em;
}

.architecture-map {
  width: 100%;
  height: 100%;
  overflow: visible;
  padding: 2.5rem 1rem .35rem;
}

.architecture-map__connection {
  fill: none;
  stroke: rgba(100, 145, 178, .2);
  stroke-width: .42;
  stroke-dasharray: 1.2 1.7;
  transition: stroke .35s ease, stroke-width .35s ease, opacity .35s ease;
}

.architecture-map__connection--active {
  stroke: rgba(103, 232, 249, .7);
  stroke-width: .72;
  animation: trace-connection 5s linear infinite;
}

.architecture-map__connection--secondary {
  stroke: rgba(167, 139, 250, .19);
  stroke-dasharray: .7 2;
}

.architecture-map__node { cursor: pointer; outline: none; }
.architecture-map__node-halo { fill: transparent; transition: fill .3s ease; }
.architecture-map__node-ring { fill: #0a1020; stroke: #53647b; stroke-width: .48; transition: stroke .3s ease, stroke-width .3s ease; }
.architecture-map__node-core { fill: #8ca0ba; transition: fill .3s ease; }
.architecture-map__node text { fill: #758399; font-family: var(--font-mono); font-size: 2.15px; pointer-events: none; }
.architecture-map__node:hover .architecture-map__node-halo,
.architecture-map__node--active .architecture-map__node-halo { fill: rgba(34, 211, 238, .12); }
.architecture-map__node--active .architecture-map__node-ring { stroke: #67e8f9; stroke-width: .8; }
.architecture-map__node--active .architecture-map__node-core { fill: #cffafe; }
.architecture-map__node--active text { fill: #cffafe; }
.architecture-map__node--emerald.architecture-map__node--active .architecture-map__node-ring { stroke: #6ee7b7; }
.architecture-map__node--violet.architecture-map__node--active .architecture-map__node-ring { stroke: #c4b5fd; }

.architecture-inspector {
  display: grid;
  min-height: 4.5rem;
  grid-template-columns: 3.2rem minmax(0, 1fr) auto;
  align-items: center;
  gap: .7rem;
  border-top: 1px solid rgba(148, 163, 184, .13);
  background: linear-gradient(90deg, rgba(255,255,255,.025), rgba(255,255,255,.005));
  padding: .7rem 1rem;
}

.architecture-inspector__index { color: #67e8f9; font-family: var(--font-mono); font-size: .58rem; }
.architecture-inspector strong { display: block; color: #e2e8f0; font-size: .76rem; font-weight: 640; }
.architecture-inspector p { margin: .25rem 0 0; color: #8290a4; font-family: var(--font-mono); font-size: .55rem; line-height: 1.5; }
.architecture-inspector__signal { display: flex; align-items: center; gap: .35rem; color: #66758a; font-family: var(--font-mono); font-size: .46rem; white-space: nowrap; }
.architecture-inspector__signal i { width: .32rem; height: .32rem; border-radius: 50%; background: #6ee7b7; box-shadow: 0 0 8px rgba(110,231,183,.6); }

.architecture-graph__layers { position: relative; display: grid; gap: .3rem; }
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

.architecture-node__copy { display: grid; gap: .3rem; }
.architecture-node__name { color: #dce5f2; font-size: .87rem; font-weight: 650; }
.architecture-node__tech { color: #718096; font-family: var(--font-mono); font-size: .62rem; }
.architecture-node__point { width: .4rem; height: .4rem; border-radius: 50%; background: #334155; transition: background .25s ease, box-shadow .25s ease; }
.architecture-node--active .architecture-node__number { color: #a5f3fc; border-color: rgba(34, 211, 238, .42); box-shadow: 0 0 17px rgba(34, 211, 238, .14); }
.architecture-node--active .architecture-node__name { color: #fff; }
.architecture-node--active .architecture-node__point { background: #67e8f9; box-shadow: 0 0 12px rgba(34, 211, 238, .8); }

.architecture-graph__hint {
  margin: .4rem 0 0;
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

@keyframes trace-connection {
  to { stroke-dashoffset: -29; }
}

@media (max-width: 820px) {
  .architecture-graph { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
  .architecture-graph__canvas { width: 100%; min-height: 0; aspect-ratio: 1.35; border-radius: 1.2rem; }
  .architecture-map { min-height: 0; }
  .architecture-graph__layers::before { left: 2.25rem; }
}

@media (max-width: 480px) {
  .architecture-graph__canvas { aspect-ratio: 1.05; }
  .architecture-graph__coordinates { font-size: .4rem; }
  .architecture-inspector { grid-template-columns: 2.6rem minmax(0, 1fr); padding: .65rem .7rem; }
  .architecture-inspector__signal { display: none; }
  .architecture-node { grid-template-columns: 2rem minmax(0, 1fr) .4rem; gap: .7rem; padding: .8rem .35rem; }
  .architecture-graph__layers::before { left: 1.35rem; }
  .architecture-node__number { width: 1.8rem; height: 1.8rem; }
  .architecture-node__tech { font-size: .56rem; }
}

@media (prefers-reduced-motion: reduce) {
  .architecture-map__connection--active { animation: none; }
  .architecture-map__connection,
  .architecture-map__node-halo,
  .architecture-map__node-ring,
  .architecture-map__node-core,
  .architecture-node,
  .architecture-node__number,
  .architecture-node__point { transition: none; }
}
</style>
