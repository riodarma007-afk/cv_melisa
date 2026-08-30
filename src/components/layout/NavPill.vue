<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { navItems } from '../../data/cv-data'
import { useScrollSpy } from '../../composables/useScrollSpy'

const sectionIds = navItems.map(n => n.id)
const { activeSection, scrollTo } = useScrollSpy(sectionIds)

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleNavClick(id: string) {
  scrollTo(id)
  isMobileMenuOpen.value = false
}

const navClass = computed(() => [
  'nav-pill',
  isScrolled.value ? 'nav-pill--scrolled' : '',
])
</script>

<template>
  <nav :class="navClass" role="navigation" aria-label="Main navigation">
    <div class="nav-pill__inner">
      <!-- Logo / Name (mobile) -->
      <button
        class="nav-pill__brand"
        @click="handleNavClick('beranda')"
        aria-label="Scroll to top"
      >
        M<span class="nav-pill__brand-dot">.</span>
      </button>

      <!-- Desktop nav items -->
      <div class="nav-pill__items">
        <button
          v-for="item in navItems"
          :key="item.id"
          :class="['nav-pill__item', { 'nav-pill__item--active': activeSection === item.id }]"
          @click="handleNavClick(item.id)"
          :aria-current="activeSection === item.id ? 'true' : undefined"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- Mobile hamburger -->
      <button
        :class="['nav-pill__hamburger', { 'nav-pill__hamburger--open': isMobileMenuOpen }]"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        aria-label="Toggle navigation menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <span class="nav-pill__hamburger-line" />
        <span class="nav-pill__hamburger-line" />
        <span class="nav-pill__hamburger-line" />
      </button>
    </div>

    <!-- Mobile dropdown -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="nav-pill__mobile">
        <button
          v-for="item in navItems"
          :key="item.id"
          :class="['nav-pill__mobile-item', { 'nav-pill__mobile-item--active': activeSection === item.id }]"
          @click="handleNavClick(item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.nav-pill {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border-radius: var(--radius-pill);
  background: var(--color-glass);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--color-glass-border);
  box-shadow: var(--shadow-md);
  transition:
    padding var(--duration-normal) var(--ease-smooth),
    box-shadow var(--duration-normal) var(--ease-smooth),
    border-radius var(--duration-normal) var(--ease-smooth);
  padding: 6px 8px;
  max-width: calc(100vw - 32px);
}

.nav-pill--scrolled {
  box-shadow: var(--shadow-lg);
  background: rgba(251, 252, 254, 0.88);
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
}

.nav-pill__inner {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-pill__brand {
  display: none;
  padding: 8px 14px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.125rem;
  color: var(--color-denim-deep);
  background: none;
  border: none;
  cursor: pointer;
  letter-spacing: -0.02em;
}

.nav-pill__brand-dot {
  color: var(--color-signal);
}

/* Desktop items */
.nav-pill__items {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-pill__item {
  padding: 10px 16px;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-slate);
  background: none;
  border: none;
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-smooth),
    background var(--duration-fast) var(--ease-smooth);
  white-space: nowrap;
}

.nav-pill__item:hover {
  color: var(--color-ink);
  background: rgba(255, 122, 89, 0.1);
}

.nav-pill__item--active {
  color: #fff;
  background: var(--gradient-primary);
  font-weight: 600;
}

.nav-pill__item--active:hover {
  color: #fff;
  background: var(--gradient-primary);
  filter: brightness(1.1);
}

/* Hamburger */
.nav-pill__hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.nav-pill__hamburger-line {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-ink);
  border-radius: 2px;
  transition:
    transform var(--duration-normal) var(--ease-spring),
    opacity var(--duration-fast) var(--ease-smooth);
}

.nav-pill__hamburger--open .nav-pill__hamburger-line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.nav-pill__hamburger--open .nav-pill__hamburger-line:nth-child(2) {
  opacity: 0;
}

.nav-pill__hamburger--open .nav-pill__hamburger-line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile menu */
.nav-pill__mobile {
  display: none;
  flex-direction: column;
  padding: 8px 4px;
  border-top: 1px solid var(--color-glass-border);
  margin-top: 6px;
}

.nav-pill__mobile-item {
  padding: 12px 20px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.938rem;
  color: var(--color-slate);
  background: none;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-align: left;
  transition:
    color var(--duration-fast) var(--ease-smooth),
    background var(--duration-fast) var(--ease-smooth);
}

.nav-pill__mobile-item:hover {
  background: rgba(255, 122, 89, 0.06);
  color: var(--color-ink);
}

.nav-pill__mobile-item--active {
  color: var(--color-signal);
  background: rgba(255, 122, 89, 0.1);
  font-weight: 600;
}

/* Mobile menu transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--duration-normal) var(--ease-smooth);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
@media (max-width: 860px) {
  .nav-pill {
    border-radius: var(--radius-xl);
    left: 16px;
    right: 16px;
    transform: none;
    max-width: none;
  }

  .nav-pill__brand {
    display: block;
  }

  .nav-pill__items {
    display: none;
  }

  .nav-pill__hamburger {
    display: flex;
    margin-left: auto;
  }

  .nav-pill__mobile {
    display: flex;
  }
}
</style>
