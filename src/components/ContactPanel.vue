<script setup>
import { ArrowUpRight, ExternalLink, GitFork, Mail } from '@lucide/vue'
</script>

<template>
  <div class="contact-panel">
    <div class="contact-panel__coordinates" aria-hidden="true">
      <span>06 / CONTACT</span><span>AVAILABLE FOR SELECT OPPORTUNITIES</span>
    </div>
    <div class="contact-panel__content">
      <p class="eyebrow"><span>LET'S BUILD SOMETHING MEANINGFUL</span></p>
      <h2>Complex ideas.<br><span class="text-gradient">Thoughtfully engineered.</span></h2>
      <p class="contact-panel__intro">Open to Backend, Laravel, Python, and Full Stack Engineering opportunities.</p>
      <div class="contact-panel__actions">
        <a href="mailto:reemramzym@gmail.com" class="button-primary"><Mail :size="16" /> Email me <ArrowUpRight :size="16" /></a>
        <a href="tel:+201551157579">Call me <ArrowUpRight :size="14" /></a>
        <a href="https://wa.me/201551157579" target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight :size="14" /></a>
        <a href="https://www.linkedin.com/in/reem-ramzy-moh/" target="_blank" rel="noreferrer"><ExternalLink :size="15" /> LinkedIn</a>
        <a href="https://github.com/ReemRamzy" target="_blank" rel="noreferrer"><GitFork :size="15" /> GitHub</a>
      </div>
    </div>
    <div class="contact-panel__graphic" aria-hidden="true">
      <span class="contact-panel__ring contact-panel__ring--outer"></span>
      <span class="contact-panel__ring contact-panel__ring--middle"></span>
      <span class="contact-panel__ring contact-panel__ring--inner"></span>
      <span class="contact-panel__graphic-core">RR</span>
      <span class="contact-panel__graphic-caption">OPEN CHANNEL<br>PORTFOLIO / 2026</span>
    </div>
  </div>
</template>
