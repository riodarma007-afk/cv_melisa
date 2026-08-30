<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import NavPill from './components/layout/NavPill.vue'
import FooterSection from './components/layout/FooterSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ExperienceTimeline from './components/sections/ExperienceTimeline.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import OrganizationSection from './components/sections/OrganizationSection.vue'
import EducationSection from './components/sections/EducationSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

let lenis: Lenis | null = null

onMounted(() => {
  // Check for reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!prefersReduced) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }
})

onUnmounted(() => {
  lenis?.destroy()
})
</script>

<template>
  <div class="app">
    <NavPill />

    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceTimeline />
      <ProjectsSection />
      <OrganizationSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
