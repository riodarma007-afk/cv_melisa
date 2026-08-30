<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

defineProps<{
  href?: string
  tag?: 'a' | 'button'
  variant?: 'primary' | 'secondary'
  download?: string | boolean
}>()

const { prefersReducedMotion } = useReducedMotion()
const buttonRef = ref<HTMLElement | null>(null)
const magnetX = ref(0)
const magnetY = ref(0)
const isPressed = ref(false)

const magnetStyle = computed(() => {
  if (prefersReducedMotion.value) return {}
  return {
    transform: `translate(${magnetX.value}px, ${magnetY.value}px) scale(${isPressed.value ? 0.96 : 1})`,
    transition: isPressed.value
      ? 'transform 100ms cubic-bezier(0.25, 0.1, 0.25, 1)'
      : 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  }
})

function handleMouseMove(e: MouseEvent) {
  if (prefersReducedMotion.value || !buttonRef.value) return
  const rect = buttonRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const distX = e.clientX - centerX
  const distY = e.clientY - centerY
  magnetX.value = distX * 0.15
  magnetY.value = distY * 0.15
}

function handleMouseLeave() {
  magnetX.value = 0
  magnetY.value = 0
  isPressed.value = false
}
</script>

<template>
  <component
    :is="tag || (href ? 'a' : 'button')"
    ref="buttonRef"
    :href="href"
    :download="download || undefined"
    :class="[
      'magnetic-btn',
      variant === 'secondary' ? 'magnetic-btn--secondary' : 'magnetic-btn--primary',
    ]"
    :style="magnetStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
  >
    <slot />
  </component>
</template>

<style scoped>
.magnetic-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.938rem;
  letter-spacing: -0.01em;
  cursor: pointer;
  border: none;
  text-decoration: none;
  will-change: transform;
  user-select: none;
  -webkit-user-select: none;
}

.magnetic-btn--primary {
  background: var(--gradient-primary);
  color: #fff;
  box-shadow: var(--shadow-float-orange);
  border: none;
}

.magnetic-btn--primary:hover {
  background: var(--gradient-primary);
  filter: brightness(1.1);
  box-shadow: 0 20px 40px rgba(255, 122, 89, 0.4);
}

.magnetic-btn--secondary {
  background: var(--color-paper);
  color: var(--color-ink);
  border: 1px solid var(--color-glass-border);
  box-shadow: var(--shadow-sm);
}

.magnetic-btn--secondary:hover {
  background: var(--color-mist);
  border-color: var(--color-slate);
  box-shadow: var(--shadow-md);
}

@media (max-width: 640px) {
  .magnetic-btn {
    padding: 12px 24px;
    font-size: 0.875rem;
  }
}
</style>
