<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div class="stat-chip">
    <span class="stat-chip__value">{{ value }}</span>
    <span class="stat-chip__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: var(--color-paper);
  border: 1px solid var(--color-glass-border);
  border-radius: 100px;
  box-shadow: var(--shadow-float);
  transition: transform var(--duration-normal) var(--ease-bounce);
}

.stat-chip:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-chip__value {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-ink);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-chip__label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-slate);
  text-align: center;
  line-height: 1.3;
  letter-spacing: 0.01em;
}

@media (max-width: 640px) {
  .stat-chip {
    padding: 16px 20px;
    min-width: 100px;
  }

  .stat-chip__value {
    font-size: 1.75rem;
  }
}
</style>
