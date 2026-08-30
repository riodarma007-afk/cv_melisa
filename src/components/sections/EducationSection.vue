<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { educations } from '../../data/cv-data'
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
  <section id="pendidikan" class="edu section-paper" ref="sectionRef">
    <div class="container-cv">
      <div :class="['edu__header', { 'edu__header--visible': isVisible || prefersReducedMotion }]">
        <span class="edu__label">Pendidikan</span>
        <h2 class="edu__title">Riwayat Pendidikan</h2>
      </div>

      <div class="edu__grid">
        <div
          v-for="(edu, index) in educations"
          :key="edu.id"
          :class="['edu__card', { 'edu__card--visible': isVisible || prefersReducedMotion }]"
          :style="{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 120 + 200}ms` }"
        >
          <div class="edu__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path v-if="edu.degree" d="M22 10l-10-6L2 10l10 6 10-6zM6 12.5v5L12 21l6-3.5v-5" />
              <path v-else d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
            </svg>
          </div>
          <div class="edu__card-content">
            <h3 class="edu__card-institution">{{ edu.institution }}</h3>
            <p v-if="edu.degree" class="edu__card-degree">
              {{ edu.degree }} {{ edu.field }}
            </p>
            <span v-if="edu.period" class="edu__card-period">{{ edu.period }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu {
  padding: var(--section-gap) 0;
}

.edu__header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.edu__header--visible {
  opacity: 1;
  transform: translateY(0);
}

.edu__label {
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

.edu__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.edu__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.edu__card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid var(--color-glass-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 20px;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow var(--duration-normal) var(--ease-smooth);
}

.edu__card--visible {
  opacity: 1;
  transform: translateY(0);
}

.edu__card:hover {
  box-shadow: var(--shadow-float);
  transform: translateY(-4px);
}

.edu__card-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--gradient-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 8px 16px rgba(120, 255, 214, 0.3);
}

.edu__card-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edu__card-institution {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-ink);
  line-height: 1.3;
}

.edu__card-degree {
  font-size: 0.875rem;
  color: var(--color-denim);
  font-weight: 500;
}

.edu__card-period {
  font-family: var(--font-mono);
  font-size: 0.775rem;
  color: var(--color-slate);
  margin-top: 2px;
}

@media (max-width: 768px) {
  .edu__grid {
    grid-template-columns: 1fr;
  }

  .edu__title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .edu {
    padding: 64px 0;
  }

  .edu__title {
    font-size: 1.5rem;
  }

  .edu__card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .edu__header,
  .edu__card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
