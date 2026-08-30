<script setup lang="ts">
import { ref } from 'vue'
import type { Experience } from '../../data/cv-data'

defineProps<{
  experience: Experience
  index: number
  isLast: boolean
}>()

const isExpanded = ref(false)

function toggle() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="timeline-item">
    <!-- Timeline line & dot -->
    <div class="timeline-track">
      <div :class="['timeline-dot', { 'timeline-dot--active': experience.isActive }]">
        <span v-if="experience.isActive" class="timeline-dot__ping" />
      </div>
      <div v-if="!isLast" class="timeline-line" />
    </div>

    <!-- Card -->
    <div
      :class="['timeline-card', { 'timeline-card--expanded': isExpanded, 'timeline-card--active': experience.isActive }]"
      @click="toggle"
      role="button"
      :aria-expanded="isExpanded"
      tabindex="0"
      @keydown.enter="toggle"
      @keydown.space.prevent="toggle"
    >
      <!-- Header -->
      <div class="timeline-card__header">
        <div class="timeline-card__meta">
          <span class="timeline-card__period">{{ experience.period }}</span>
          <span v-if="experience.isActive" class="timeline-card__badge animate-pulse-soft">
            Aktif
          </span>
        </div>
        <h3 class="timeline-card__company">{{ experience.company }}</h3>
        <p class="timeline-card__role">{{ experience.role }}</p>
      </div>

      <!-- Expand indicator -->
      <div class="timeline-card__expand">
        <svg
          :class="['timeline-card__chevron', { 'timeline-card__chevron--open': isExpanded }]"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Expandable content -->
      <div :class="['timeline-card__body', { 'timeline-card__body--open': isExpanded }]">
        <div class="timeline-card__body-inner">
          <ul class="timeline-card__list">
            <li
              v-for="(item, i) in experience.responsibilities"
              :key="i"
              class="timeline-card__list-item"
            >
              <svg class="timeline-card__check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8.5L6.5 12L13 4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-item {
  display: flex;
  gap: 24px;
  position: relative;
}

/* Timeline track (vertical line + dot) */
.timeline-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
  padding-top: 8px;
}

.timeline-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-mist);
  border: 2.5px solid var(--color-denim);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.timeline-dot--active {
  background: var(--gradient-primary);
  border-color: #fff;
}

.timeline-dot__ping {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(255, 122, 89, 0.3);
  animation: pulse-soft 2.5s ease-in-out infinite;
}

.timeline-line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(
    to bottom,
    var(--color-denim-light),
    rgba(74, 111, 165, 0.15)
  );
  margin-top: 8px;
}

/* Card */
.timeline-card {
  flex: 1;
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  border: 1px solid var(--color-glass-border);
  border-left: 3px solid transparent;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition:
    box-shadow var(--duration-normal) var(--ease-smooth),
    border-color var(--duration-normal) var(--ease-smooth),
    transform var(--duration-normal) var(--ease-spring);
  margin-bottom: 24px;
  position: relative;
}

.timeline-card:hover {
  box-shadow: var(--shadow-float);
  border-left-color: var(--color-signal);
  transform: translateX(4px);
}

.timeline-card--expanded {
  border-left-color: var(--color-denim);
  box-shadow: var(--shadow-md);
}

.timeline-card--active {
  border-left-color: var(--color-denim-deep);
}

.timeline-card--active:hover {
  border-left-color: var(--color-denim-deep);
}

/* Header */
.timeline-card__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline-card__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.timeline-card__period {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-slate);
  letter-spacing: 0.02em;
}

.timeline-card__badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: var(--radius-pill);
  background: rgba(217, 138, 75, 0.12);
  color: var(--color-signal);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.timeline-card__company {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-ink);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.timeline-card__role {
  font-size: 0.938rem;
  color: var(--color-denim);
  font-weight: 500;
}

/* Expand indicator */
.timeline-card__expand {
  position: absolute;
  top: 24px;
  right: 24px;
  color: var(--color-slate);
  transition: color var(--duration-fast) var(--ease-smooth);
}

.timeline-card:hover .timeline-card__expand {
  color: var(--color-denim);
}

.timeline-card__chevron {
  transition: transform var(--duration-normal) var(--ease-spring);
}

.timeline-card__chevron--open {
  transform: rotate(180deg);
}

/* Expandable body */
.timeline-card__body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--duration-slow) var(--ease-smooth);
}

.timeline-card__body--open {
  grid-template-rows: 1fr;
}

.timeline-card__body-inner {
  overflow: hidden;
}

.timeline-card__list {
  list-style: none;
  padding: 16px 0 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.timeline-card__list-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--color-slate);
  line-height: 1.5;
}

.timeline-card__check {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-denim);
}

@media (max-width: 768px) {
  .timeline-item {
    gap: 16px;
  }

  .timeline-card {
    padding: 20px;
  }

  .timeline-card__company {
    font-size: 1rem;
    padding-right: 28px;
  }

  .timeline-card__expand {
    top: 20px;
    right: 16px;
  }
}

@media (max-width: 480px) {
  .timeline-track {
    width: 16px;
  }

  .timeline-dot {
    width: 12px;
    height: 12px;
  }

  .timeline-item {
    gap: 12px;
  }
}
</style>
