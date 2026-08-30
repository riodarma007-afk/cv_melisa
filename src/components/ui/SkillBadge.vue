<script setup lang="ts">
defineProps<{
  label: string
  type?: 'soft' | 'tool'
}>()
</script>

<template>
  <span :class="['skill-badge', type === 'tool' ? 'skill-badge--tool' : 'skill-badge--soft']">
    {{ label }}
  </span>
</template>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  transition: transform var(--duration-fast) var(--ease-spring),
              box-shadow var(--duration-fast) var(--ease-smooth);
  cursor: default;
}

.skill-badge:hover {
  transform: translateY(-1px);
}

.skill-badge--soft {
  background: var(--color-mist);
  color: var(--color-denim-deep);
  border: 1px solid rgba(74, 111, 165, 0.15);
}

.skill-badge--soft:hover {
  box-shadow: var(--shadow-sm);
  background: rgba(74, 111, 165, 0.12);
}

.skill-badge--tool {
  background: #fff;
  color: var(--color-ink);
  border: 1px solid var(--color-glass-border);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-mono);
  font-size: 0.813rem;
}

.skill-badge--tool:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--color-denim);
}
</style>
