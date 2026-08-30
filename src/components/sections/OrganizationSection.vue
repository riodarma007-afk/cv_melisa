<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { organizations } from '../../data/cv-data'
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

function getIconPath(type: string): string {
  switch (type) {
    case 'leadership':
      return 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
    case 'finance':
      return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5h3c0 .83-.67 1.5-1.5 1.5zm0-11c.83 0 1.5.67 1.5 1.5v1h-3v-1c0-.83.67-1.5 1.5-1.5zM9 12h6v1H9v-1zm0-2h6v1H9v-1z'
    case 'social':
      return 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
    default:
      return ''
  }
}

function getIconLabel(type: string): string {
  switch (type) {
    case 'leadership': return 'Kepemimpinan'
    case 'finance': return 'Keuangan'
    case 'social': return 'Sosial'
    default: return ''
  }
}
</script>

<template>
  <section id="organisasi" class="org section-mist" ref="sectionRef">
    <div class="container-cv">
      <div :class="['org__header', { 'org__header--visible': isVisible || prefersReducedMotion }]">
        <span class="org__label">Organisasi</span>
        <h2 class="org__title">Pengalaman Berorganisasi</h2>
        <p class="org__subtitle">
          Aktif dalam kepemimpinan, keuangan, dan kegiatan sosial kemahasiswaan
        </p>
      </div>

      <div class="org__grid">
        <div
          v-for="(org, index) in organizations"
          :key="org.id"
          :class="['org__card', { 'org__card--visible': isVisible || prefersReducedMotion }]"
          :style="{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 100 + 200}ms` }"
        >
          <div class="org__card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path :d="getIconPath(org.icon)" />
            </svg>
          </div>
          <div class="org__card-tag">{{ getIconLabel(org.icon) }}</div>
          <h3 class="org__card-name">{{ org.name }}</h3>
          <p class="org__card-role">{{ org.role }}</p>
          <span class="org__card-period">{{ org.period }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.org {
  padding: var(--section-gap) 0;
}

.org__header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.org__header--visible {
  opacity: 1;
  transform: translateY(0);
}

.org__label {
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

.org__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.org__subtitle {
  font-size: 1rem;
  color: var(--color-slate);
}

.org__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.org__card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid var(--color-glass-border);
  box-shadow: var(--shadow-sm);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow var(--duration-normal) var(--ease-smooth),
    border-color var(--duration-normal) var(--ease-smooth);
}

.org__card--visible {
  opacity: 1;
  transform: translateY(0);
}

.org__card:hover {
  box-shadow: var(--shadow-float);
  border-color: rgba(255, 122, 89, 0.2);
  transform: translateY(-4px);
}

.org__card-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--gradient-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 8px;
  box-shadow: 0 8px 16px rgba(0, 180, 219, 0.3);
}

.org__card-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-denim);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 10px;
  background: rgba(74, 111, 165, 0.06);
  border-radius: var(--radius-pill);
}

.org__card-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-ink);
  line-height: 1.3;
}

.org__card-role {
  font-size: 0.875rem;
  color: var(--color-denim);
  font-weight: 500;
}

.org__card-period {
  font-family: var(--font-mono);
  font-size: 0.775rem;
  color: var(--color-slate);
  margin-top: auto;
  padding-top: 4px;
}

@media (max-width: 768px) {
  .org__grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .org__title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .org {
    padding: 64px 0;
  }

  .org__title {
    font-size: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .org__header,
  .org__card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
