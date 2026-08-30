<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { skills } from '../../data/cv-data'
import SkillBadge from '../ui/SkillBadge.vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const { prefersReducedMotion } = useReducedMotion()
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const softSkills = skills.find(s => s.category === 'soft')
const toolSkills = skills.find(s => s.category === 'tools')

const toolIcons: Record<string, string> = {
  'Microsoft Word': 'M19.5 3H4.5A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM7.5 16.5L5.25 7.5h2.1l1.2 5.25 1.5-5.25h1.8l1.5 5.25 1.2-5.25h2.1l-2.25 9h-1.95l-1.5-5.4-1.5 5.4H7.5z',
  'Microsoft Excel': 'M19.5 3H4.5A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM8.25 16.5l-1.5-2.7-1.5 2.7H3.6l2.4-4.5L3.6 7.5h1.65l1.5 2.7 1.5-2.7h1.65l-2.4 4.5 2.4 4.5H8.25z',
  'Microsoft PowerPoint': 'M19.5 3H4.5A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM10.5 13.5H9v3H7.5v-9h3a2.25 2.25 0 010 4.5z',
  'Canva': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
  'Power BI': 'M19.5 3H4.5A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM8 17H6v-6h2v6zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
}

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
  <section id="keahlian" class="skills section-mist" ref="sectionRef">
    <div class="container-cv">
      <div :class="['skills__header', { 'skills__header--visible': isVisible || prefersReducedMotion }]">
        <span class="skills__label">Keahlian</span>
        <h2 class="skills__title">Kompetensi & Tools</h2>
      </div>

      <div class="skills__grid">
        <!-- Soft Skills -->
        <div
          v-if="softSkills"
          :class="['skills__group', { 'skills__group--visible': isVisible || prefersReducedMotion }]"
        >
          <h3 class="skills__group-title">{{ softSkills.label }}</h3>
          <div class="skills__badges">
            <div
              v-for="(skill, index) in softSkills.items"
              :key="skill"
              :style="{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 80 + 300}ms` }"
              :class="['skills__badge-wrapper', { 'skills__badge-wrapper--visible': isVisible || prefersReducedMotion }]"
            >
              <SkillBadge :label="skill" type="soft" />
            </div>
          </div>
        </div>

        <!-- Tools -->
        <div
          v-if="toolSkills"
          :class="['skills__group', { 'skills__group--visible': isVisible || prefersReducedMotion }]"
          style="transition-delay: 150ms"
        >
          <h3 class="skills__group-title">{{ toolSkills.label }}</h3>
          <div class="skills__tools-grid">
            <div
              v-for="(tool, index) in toolSkills.items"
              :key="tool"
              :class="['skills__tool-card', { 'skills__tool-card--visible': isVisible || prefersReducedMotion }]"
              :style="{ transitionDelay: prefersReducedMotion ? '0ms' : `${index * 80 + 400}ms` }"
            >
              <div class="skills__tool-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path :d="toolIcons[tool] || 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'" />
                </svg>
              </div>
              <span class="skills__tool-name">{{ tool }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: var(--section-gap) 0;
}

.skills__header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skills__header--visible {
  opacity: 1;
  transform: translateY(0);
}

.skills__label {
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

.skills__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.skills__grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.skills__group {
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skills__group--visible {
  opacity: 1;
  transform: translateY(0);
}

.skills__group-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-ink);
  margin-bottom: 16px;
}

.skills__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skills__badge-wrapper {
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skills__badge-wrapper--visible {
  opacity: 1;
  transform: translateY(0);
}

.skills__tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.skills__tool-card {
  background: #fff;
  border-radius: var(--radius-md);
  padding: 16px;
  border: 1px solid var(--color-glass-border);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow var(--duration-normal) var(--ease-smooth);
}

.skills__tool-card--visible {
  opacity: 1;
  transform: translateY(0);
}

.skills__tool-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.skills__tool-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--color-mist);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-denim);
}

.skills__tool-name {
  font-family: var(--font-mono);
  font-size: 0.775rem;
  color: var(--color-ink);
  text-align: center;
  font-weight: 500;
}

@media (max-width: 768px) {
  .skills__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .skills__title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .skills {
    padding: 64px 0;
  }

  .skills__title {
    font-size: 1.5rem;
  }

  .skills__tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skills__header,
  .skills__group,
  .skills__badge-wrapper,
  .skills__tool-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
