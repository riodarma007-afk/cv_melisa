<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { personalInfo, stats } from '../../data/cv-data'
import StatChip from '../ui/StatChip.vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const { prefersReducedMotion } = useReducedMotion()
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

onMounted(() => {
  if (!sectionRef.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section id="tentang" class="about section-mist" ref="sectionRef">
    <div class="container-cv about__inner">
      <div :class="['about__content', { 'about__content--visible': isVisible || prefersReducedMotion }]">
        <span class="about__label">Tentang Saya</span>
        <h2 class="about__title">Profesional Administrasi yang Teliti & Terstruktur</h2>
        <p class="about__text">{{ personalInfo.about }}</p>
      </div>

      <div :class="['about__stats', { 'about__stats--visible': isVisible || prefersReducedMotion }]">
        <StatChip
          v-for="(stat, index) in stats"
          :key="index"
          :value="stat.value"
          :label="stat.label"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: var(--section-gap) 0;
}

.about__inner {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
  align-items: center;
}

.about__content {
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.about__content--visible {
  opacity: 1;
  transform: translateY(0);
}

.about__label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-denim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  padding: 4px 12px;
  background: rgba(74, 111, 165, 0.08);
  border-radius: var(--radius-pill);
}

.about__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}

.about__text {
  font-size: 1rem;
  color: var(--color-slate);
  line-height: 1.8;
}

.about__stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}

.about__stats--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .about__inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about__stats {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .about__title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .about {
    padding: 64px 0;
  }

  .about__title {
    font-size: 1.5rem;
  }

  .about__stats {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about__content,
  .about__stats {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
