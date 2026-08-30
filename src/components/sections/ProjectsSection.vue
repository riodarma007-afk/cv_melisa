<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { projects } from '../../data/cv-data'
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
    { threshold: 0.15 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section id="proyek" class="projects section-paper" ref="sectionRef">
    <div class="container-cv">
      <div :class="['projects__header', { 'projects__header--visible': isVisible || prefersReducedMotion }]">
        <span class="projects__label">Proyek</span>
        <h2 class="projects__title">Proyek UI/UX Pilihan</h2>
      </div>

      <div class="projects__grid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :class="['project__card', { 'project__card--visible': isVisible || prefersReducedMotion }]"
          :style="{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 150 + 200}ms` }"
        >
          <div class="project__card-top">
            <div class="project__card-icon">
              <!-- UI/UX Icon -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span class="project__card-year">{{ project.year }}</span>
          </div>
          
          <h3 class="project__card-title">{{ project.title }}</h3>
          <p class="project__card-company">{{ project.company }}</p>
          
          <ul class="project__card-desc">
            <li v-for="(desc, dIndex) in project.description" :key="dIndex">
              {{ desc }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: var(--section-gap) 0;
}

.projects__header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.projects__header--visible {
  opacity: 1;
  transform: translateY(0);
}

.projects__label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  padding: 4px 12px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
}

.projects__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2.2rem;
  color: var(--color-ink);
  letter-spacing: -0.02em;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 32px;
}

.project__card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  opacity: 0;
  transform: translateY(24px);
  display: flex;
  flex-direction: column;
}

.project__card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  padding: 2px;
  background: var(--gradient-secondary);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(74, 111, 165, 0.1), 0 1px 3px rgba(0, 0, 0, 0.02);
}

.project__card:hover::before {
  opacity: 1;
}

.project__card--visible {
  opacity: 1;
  transform: translateY(0);
}

.project__card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.project__card-icon {
  width: 48px;
  height: 48px;
  background: var(--gradient-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(74, 111, 165, 0.2);
}

.project__card-year {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-slate);
  background: var(--color-mist);
  padding: 4px 12px;
  border-radius: var(--radius-pill);
}

.project__card-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 8px;
  line-height: 1.3;
}

.project__card-company {
  font-size: 0.9rem;
  color: var(--color-denim);
  font-weight: 500;
  margin-bottom: 24px;
}

.project__card-desc {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.project__card-desc li {
  position: relative;
  padding-left: 20px;
  font-size: 0.95rem;
  color: var(--color-slate);
  line-height: 1.6;
}

.project__card-desc li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: 700;
}

@media (max-width: 768px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
