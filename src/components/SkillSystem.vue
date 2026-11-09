<script setup>
import { ref } from 'vue'

const activeLayer = ref(0)

const layers = [
  {
    name: 'Application',
    role: 'Interfaces for people and products',
    technologies: ['Vue', 'Nuxt', 'React', 'Next.js', 'Tailwind CSS'],
    signal: '01 / EXPERIENCE',
    color: 'cyan',
  },
  {
    name: 'Backend',
    role: 'Services, APIs, and business logic',
    technologies: ['Laravel', 'PHP', 'Python', 'Django', 'REST', 'GraphQL'],
    signal: '02 / SERVICES',
    color: 'blue',
  },
  {
    name: 'Data',
    role: 'Persistent and fast-access storage',
    technologies: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Vector databases'],
    signal: '03 / PERSISTENCE',
    color: 'violet',
  },
  {
    name: 'Real-time',
    role: 'Live updates across connected clients',
    technologies: ['Laravel Reverb', 'WebSockets', 'Queues', 'Broadcasting'],
    signal: '04 / STREAMING',
    color: 'cyan',
  },
  {
    name: 'Infrastructure',
    role: 'Deploy, operate, and troubleshoot',
    technologies: ['Linux', 'Docker', 'Kubernetes', 'Nginx', 'Supervisor', 'AWS EC2', 'VPS', 'SSL', 'CI/CD', 'Monitoring'],
    signal: '05 / DELIVERY',
    color: 'emerald',
  },
  {
    name: 'Applied AI',
    role: 'Integrate intelligence into applications',
    technologies: ['AI APIs', 'OCR', 'Speech-to-text', 'Structured outputs', 'Embeddings', 'Vector databases', 'Semantic search', 'RAG', 'Function calling', 'Automation'],
    signal: '06 / INTELLIGENCE',
    color: 'violet',
  },
]
</script>

<template>
  <div class="skill-system">
    <div class="skill-system__rail" aria-hidden="true">
      <span class="skill-system__rail-fill" :style="{ '--active': activeLayer }"></span>
    </div>

    <div class="skill-system__layers">
      <button v-for="(layer, index) in layers" :key="layer.name" type="button"
        class="skill-layer" :class="[`skill-layer--${layer.color}`, { 'skill-layer--active': activeLayer === index }]"
        :aria-pressed="activeLayer === index" @mouseenter="activeLayer = index"
        @focus="activeLayer = index" @click="activeLayer = index">
        <span class="skill-layer__index">{{ layer.signal }}</span>
        <span class="skill-layer__body">
          <span class="skill-layer__heading">
            <span class="skill-layer__name">{{ layer.name }}</span>
            <span class="skill-layer__role">{{ layer.role }}</span>
          </span>
          <span class="skill-layer__stack">
            <span v-for="technology in layer.technologies" :key="technology">{{ technology }}</span>
          </span>
        </span>
        <span class="skill-layer__indicator" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.skill-system {
  position: relative;
  display: grid;
  grid-template-columns: 1.5rem minmax(0, 1fr);
  gap: 1.2rem;
}

.skill-system__rail {
  position: relative;
  width: 1px;
  margin: 1.4rem auto;
  background: linear-gradient(to bottom, rgba(34, 211, 238, .28), rgba(148, 163, 184, .1) 60%, rgba(167, 139, 250, .28));
}

.skill-system__rail-fill {
  position: absolute;
  top: calc(var(--active) * 16.666%);
  left: -2px;
  width: 5px;
  height: 2rem;
  border-radius: 999px;
  background: #67e8f9;
  box-shadow: 0 0 16px rgba(34, 211, 238, .75);
  transition: top .4s cubic-bezier(.2, .75, .25, 1);
}

.skill-system__layers {
  display: grid;
  gap: .55rem;
}

.skill-layer {
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 7.3rem minmax(0, 1fr) .55rem;
  align-items: center;
  gap: 1rem;
  border: 1px solid transparent;
  border-radius: .9rem;
  background: rgba(255, 255, 255, .018);
  padding: 1rem 1.1rem;
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition: background .3s ease, border-color .3s ease, transform .3s ease;
}

.skill-layer:hover,
.skill-layer--active {
  transform: translateX(4px);
  border-color: rgba(148, 163, 184, .15);
  background: linear-gradient(105deg, rgba(255, 255, 255, .065), rgba(255, 255, 255, .018));
}

.skill-layer__index {
  color: #64748b;
  font-family: var(--font-mono);
  font-size: .58rem;
  letter-spacing: .12em;
}

.skill-layer__body {
  display: grid;
  gap: .7rem;
  min-width: 0;
}

.skill-layer__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: .3rem .8rem;
}

.skill-layer__name {
  color: #e2e8f0;
  font-size: 1rem;
  font-weight: 650;
  letter-spacing: -.025em;
}

.skill-layer__role {
  color: #64748b;
  font-size: .72rem;
}

.skill-layer__stack {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
}

.skill-layer__stack span {
  border: 1px solid rgba(148, 163, 184, .12);
  border-radius: 999px;
  padding: .25rem .55rem;
  color: #a7b3c5;
  font-family: var(--font-mono);
  font-size: .62rem;
  transition: color .25s ease, border-color .25s ease;
}

.skill-layer--active .skill-layer__name,
.skill-layer--cyan.skill-layer--active .skill-layer__stack span {
  color: #a5f3fc;
}

.skill-layer--cyan.skill-layer--active .skill-layer__stack span { border-color: rgba(34, 211, 238, .24); }
.skill-layer--blue.skill-layer--active .skill-layer__name { color: #bfdbfe; }
.skill-layer--blue.skill-layer--active .skill-layer__stack span { border-color: rgba(96, 165, 250, .25); }
.skill-layer--violet.skill-layer--active .skill-layer__name { color: #ddd6fe; }
.skill-layer--violet.skill-layer--active .skill-layer__stack span { border-color: rgba(167, 139, 250, .25); }
.skill-layer--emerald.skill-layer--active .skill-layer__name { color: #a7f3d0; }
.skill-layer--emerald.skill-layer--active .skill-layer__stack span { border-color: rgba(52, 211, 153, .24); }

.skill-layer__indicator {
  width: .45rem;
  height: .45rem;
  border-radius: 50%;
  background: #334155;
  transition: background .25s ease, box-shadow .25s ease;
}

.skill-layer--active .skill-layer__indicator {
  background: #67e8f9;
  box-shadow: 0 0 12px rgba(34, 211, 238, .8);
}

@media (max-width: 640px) {
  .skill-system {
    grid-template-columns: .75rem minmax(0, 1fr);
    gap: .9rem;
  }

  .skill-layer {
    grid-template-columns: minmax(0, 1fr) .45rem;
    gap: .6rem;
    padding: .95rem .8rem;
  }

  .skill-layer__index {
    grid-column: 1;
    font-size: .53rem;
  }

  .skill-layer__body {
    grid-column: 1;
    grid-row: 2;
  }

  .skill-layer__indicator {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-layer,
  .skill-system__rail-fill,
  .skill-layer__stack span,
  .skill-layer__indicator { transition: none; }
}
</style>
