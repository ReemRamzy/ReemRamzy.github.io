<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const container = ref(null)
const canvas = ref(null)
const webglReady = ref(false)

const nodes = [
  { label: 'Frontend', detail: 'Vue · React', x: 13, y: 22 },
  { label: 'APIs', detail: 'REST · GraphQL', x: 49, y: 13 },
  { label: 'Backend', detail: 'Laravel · Python', x: 49, y: 48 },
  { label: 'Real-time', detail: 'WebSockets', x: 14, y: 77 },
  { label: 'Database', detail: 'SQL · Redis', x: 43, y: 83 },
  { label: 'Cloud', detail: 'AWS · VPS', x: 84, y: 20 },
  { label: 'DevOps', detail: 'Linux · Docker · CI/CD', x: 85, y: 77 },
  { label: 'Applied AI', detail: 'AI APIs · RAG', x: 86, y: 48 },
]

const connections = [
  [0, 1], [1, 2], [2, 0], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [3, 4], [4, 6], [5, 6], [5, 7],
]

let renderer
let resizeObserver
let intersectionObserver
let animationFrame
let sceneResources = []
let removePointerListener
let visibilityObserver
let resumeAnimation
let pauseAnimation
let onVisibilityChange

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lightweightDevice = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
  if (reducedMotion || lightweightDevice || !window.WebGLRenderingContext) return

  intersectionObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      intersectionObserver.disconnect()
      initializeScene()
    }
  }, { threshold: 0.1 })
  intersectionObserver.observe(container.value)
})

async function initializeScene() {
  try {
    const THREE = await import('three')
    if (!canvas.value || !container.value) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
    camera.position.set(0, 0, 18)

    renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    renderer.setClearColor(0x000000, 0)

    const system = new THREE.Group()
    scene.add(system)
    scene.add(new THREE.AmbientLight(0x9bb7df, 1.25))
    const keyLight = new THREE.PointLight(0x5ee7f7, 25, 16)
    keyLight.position.set(1, 2, 5)
    scene.add(keyLight)
    const violetLight = new THREE.PointLight(0x8172ff, 12, 12)
    violetLight.position.set(-4, -2, 2)
    scene.add(violetLight)

    const nodePositions = nodes.map(({ x, y }) => new THREE.Vector3(
      (x / 100 - 0.5) * 6.4,
      (0.5 - y / 100) * 5.9,
      (x % 3 - 1) * 0.22,
    ))
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x53d9ed, emissive: 0x087d99, emissiveIntensity: 1.3, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x829aff, emissive: 0x3e54bd, emissiveIntensity: 1.2, roughness: 0.3 }),
    ]
    const nodeGeometry = new THREE.IcosahedronGeometry(0.13, 2)
    const haloCanvas = document.createElement('canvas')
    haloCanvas.width = 64
    haloCanvas.height = 64
    const haloContext = haloCanvas.getContext('2d')
    const haloGradient = haloContext.createRadialGradient(32, 32, 1, 32, 32, 32)
    haloGradient.addColorStop(0, 'rgba(95, 235, 255, 0.7)')
    haloGradient.addColorStop(0.17, 'rgba(45, 170, 230, 0.22)')
    haloGradient.addColorStop(1, 'rgba(45, 170, 230, 0)')
    haloContext.fillStyle = haloGradient
    haloContext.fillRect(0, 0, 64, 64)
    const haloTexture = new THREE.CanvasTexture(haloCanvas)
    sceneResources.push(haloTexture)
    const haloMaterial = new THREE.SpriteMaterial({
      map: haloTexture,
      color: 0x7deaff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    nodePositions.forEach((position, index) => {
      const sphere = new THREE.Mesh(nodeGeometry, materials[index === 2 ? 1 : 0])
      sphere.position.copy(position)
      system.add(sphere)
      sceneResources.push(sphere)
      const halo = new THREE.Sprite(haloMaterial)
      halo.position.copy(position)
      halo.scale.setScalar(index === 2 ? 0.9 : 0.65)
      system.add(halo)
      sceneResources.push(halo)
    })

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x56cadd, transparent: true, opacity: 0.34 })
    const flowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4abde0,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    })
    const routes = connections.map(([start, end], index) => {
      const from = nodePositions[start]
      const to = nodePositions[end]
      const middle = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
      middle.z += index % 2 === 0 ? 0.32 : -0.32
      const curve = new THREE.CatmullRomCurve3([from, middle, to])
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(24)),
        lineMaterial,
      )
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 32, 0.007, 5, false), flowMaterial)
      system.add(line, tube)
      sceneResources.push(line, tube)
      return curve
    })

    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x9af5ff })
    const particleGeometry = new THREE.SphereGeometry(0.035, 8, 8)
    const particles = routes.slice(0, 8).map((route, index) => {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      system.add(particle)
      sceneResources.push(particle)
      return { particle, route, offset: index / 8 }
    })

    const dustPositions = new Float32Array(180)
    for (let index = 0; index < dustPositions.length; index += 3) {
      dustPositions[index] = (Math.random() - 0.5) * 7
      dustPositions[index + 1] = (Math.random() - 0.5) * 6
      dustPositions[index + 2] = -1.5 - Math.random() * 2
    }
    const dustGeometry = new THREE.BufferGeometry()
    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3))
    const dust = new THREE.Points(dustGeometry, new THREE.PointsMaterial({
      color: 0x92b9db,
      size: 0.018,
      transparent: true,
      opacity: 0.42,
      sizeAttenuation: true,
      depthWrite: false,
    }))
    scene.add(dust)
    sceneResources.push(dust)

    const resize = () => {
      const { width, height } = container.value.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.left = -2.6 * camera.aspect
      camera.right = 2.6 * camera.aspect
      camera.top = 2.6
      camera.bottom = -2.6
      camera.updateProjectionMatrix()
    }
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container.value)
    resize()

    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (event) => {
      const bounds = container.value.getBoundingClientRect()
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.12
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.12
    }
    container.value.addEventListener('pointermove', onPointerMove)
    removePointerListener = () => container.value?.removeEventListener('pointermove', onPointerMove)

    webglReady.value = true
    const startedAt = performance.now()
    const render = () => {
      const elapsed = (performance.now() - startedAt) / 1000
      system.rotation.y += (pointerX - system.rotation.y) * 0.018
      system.rotation.x += (-pointerY - system.rotation.x) * 0.018
      system.position.y = Math.sin(elapsed * 0.22) * 0.025
      particles.forEach(({ particle, route, offset }) => {
        const progress = (elapsed * 0.12 + offset) % 1
        particle.position.copy(route.getPoint(progress))
      })
      dust.rotation.z = Math.sin(elapsed * 0.035) * 0.035
      renderer.render(scene, camera)
      animationFrame = 0
      resumeAnimation()
    }
    resumeAnimation = () => {
      if (!animationFrame && !document.hidden) animationFrame = requestAnimationFrame(render)
    }
    pauseAnimation = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }
    visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) resumeAnimation()
      else pauseAnimation()
    }, { threshold: 0.05 })
    visibilityObserver.observe(container.value)
    onVisibilityChange = () => {
      if (document.hidden) pauseAnimation()
      else resumeAnimation()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    resumeAnimation()
  } catch (error) {
    console.error('Unable to initialize the hero system visualization.', error)
  }
}

onBeforeUnmount(() => {
  intersectionObserver?.disconnect()
  visibilityObserver?.disconnect()
  resizeObserver?.disconnect()
  removePointerListener?.()
  if (onVisibilityChange) document.removeEventListener('visibilitychange', onVisibilityChange)
  cancelAnimationFrame(animationFrame)
  const geometries = new Set(sceneResources.map((resource) => resource.geometry).filter(Boolean))
  const materials = new Set(sceneResources.flatMap((resource) => {
    const resourceMaterial = resource.material
    return Array.isArray(resourceMaterial) ? resourceMaterial : [resourceMaterial]
  }).filter(Boolean))
  geometries.forEach((geometry) => geometry.dispose())
  materials.forEach((material) => material.dispose())
  sceneResources.filter((resource) => resource.isTexture).forEach((texture) => texture.dispose())
  renderer?.dispose()
})
</script>

<template>
  <div ref="container" class="system-map" role="img"
    aria-label="System architecture connecting frontend, APIs, backend, real-time services, data, cloud and DevOps, and applied AI">
    <canvas ref="canvas" class="system-map__canvas" :class="{ 'system-map__canvas--ready': webglReady }"
      aria-hidden="true"></canvas>

    <svg class="system-map__fallback" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <line v-for="([start, end], index) in connections" :key="index"
        :x1="nodes[start].x" :y1="nodes[start].y" :x2="nodes[end].x" :y2="nodes[end].y" />
    </svg>

    <div v-for="node in nodes" :key="node.label" class="system-map__node"
      :style="{ left: `${node.x}%`, top: `${node.y}%` }">
      <span class="system-map__node-title">{{ node.label }}</span>
      <span class="system-map__node-detail">{{ node.detail }}</span>
    </div>
  </div>
</template>

<style scoped>
.system-map {
  position: relative;
  aspect-ratio: 1.16;
  max-height: 500px;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(ellipse at 50% 48%, rgba(37, 99, 235, .15), transparent 62%),
    linear-gradient(rgba(148, 163, 184, .04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, .04) 1px, transparent 1px);
  background-size: auto, 28px 28px, 28px 28px;
}

.system-map__canvas,
.system-map__fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.system-map__canvas {
  z-index: 0;
  opacity: 0;
  transition: opacity .6s ease;
}

.system-map__canvas--ready {
  opacity: .9;
}

.system-map__fallback {
  z-index: 0;
  overflow: visible;
}

.system-map__fallback line {
  stroke: rgba(104, 210, 231, .3);
  stroke-width: .22;
  stroke-dasharray: .7 1.5;
  animation: route-drift 16s linear infinite;
}

.system-map__node {
  position: absolute;
  z-index: 1;
  display: flex;
  min-width: 108px;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(148, 163, 184, .17);
  border-radius: 9px;
  background: linear-gradient(145deg, rgba(12, 21, 38, .94), rgba(7, 13, 25, .92));
  padding: 8px 9px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, .32), inset 0 1px rgba(255,255,255,.04);
  backdrop-filter: blur(10px);
  text-align: center;
}

.system-map__node::before {
  position: absolute;
  top: -1px;
  left: 18%;
  width: 64%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(103, 232, 249, .7), transparent);
  content: "";
}

.system-map__node:nth-of-type(4n + 1)::before { background: linear-gradient(90deg, transparent, rgba(167,139,250,.72), transparent); }
.system-map__node:nth-of-type(4n + 3)::before { background: linear-gradient(90deg, transparent, rgba(110,231,183,.65), transparent); }

.system-map__node-title {
  color: #e2e8f0;
  font-size: .75rem;
  font-weight: 700;
}

.system-map__node-detail {
  color: #94a3b8;
  font-family: var(--font-mono);
  font-size: .57rem;
  white-space: nowrap;
}

@keyframes route-drift {
  to { stroke-dashoffset: -28; }
}

@media (max-width: 520px) {
  .system-map__node {
    min-width: 94px;
    padding: 7px 6px;
  }

  .system-map__node-title {
    font-size: .67rem;
  }

  .system-map__node-detail {
    font-size: .5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .system-map__fallback line { animation: none; }
  .system-map__canvas {
    transition: none;
  }
}
</style>
