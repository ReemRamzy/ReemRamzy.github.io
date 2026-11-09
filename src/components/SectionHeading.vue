<script setup>
defineProps({
  sequence: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="section-heading">
    <div>
      <p class="eyebrow"><span>{{ sequence }}</span> {{ label }}</p>
      <h2><slot /></h2>
    </div>
    <p v-if="description">{{ description }}</p>
  </div>
</template>
