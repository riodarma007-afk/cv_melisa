<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { experiences } from '../../data/cv-data'
import TimelineCard from '../ui/TimelineCard.vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const { prefersReducedMotion } = useReducedMotion()
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const visibleCards = ref<Set<number>>(new Set())

onMounted(() => {
  if (!sectionRef.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        // Stagger card reveals
        experiences.forEach((_, index) => {
          setTimeout(() => {
            visibleCards.value.add(index)
            visibleCards.value = new Set(visibleCards.value)
          }, prefersReducedMotion.value ? 0 : (index + 1) * 120)
        })
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section id="pengalaman" class="experience section-paper" ref="sectionRef">
    <div class="container-cv">
      <div :class="['experience__header', { 'experience__header--visible': isVisible || prefersReducedMotion }]">
        <span class="experience__label">Pengalaman Kerja</span>
        <h2 class="experience__title">Timeline Karir</h2>
        <p class="experience__subtitle">
          Pengalaman profesional di sektor energi, pertambangan, dan retail
        </p>
      </div>

      <div class="experience__timeline">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          :class="['experience__card-wrapper', {
            'experience__card-wrapper--visible': visibleCards.has(index) || prefersReducedMotion
          }]"
        >
          <TimelineCard
            :experience="exp"
            :index="index"
            :is-last="index === experiences.length - 1"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience {
  padding: var(--section-gap) 0;
}

.experience__header {
  text-align: center;
  margin-bottom: 56px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.experience__header--visible {
  opacity: 1;
  transform: translateY(0);
}

.experience__label {
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

.experience__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.experience__subtitle {
  font-size: 1rem;
  color: var(--color-slate);
}

.experience__timeline {
  max-width: 720px;
  margin: 0 auto;
}

.experience__card-wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.experience__card-wrapper--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 480px) {
  .experience {
    padding: 64px 0;
  }

  .experience__title {
    font-size: 1.5rem;
  }

  .experience__header {
    margin-bottom: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .experience__header,
  .experience__card-wrapper {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
