<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { personalInfo } from '../../data/cv-data'
import MagneticButton from '../ui/MagneticButton.vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const { prefersReducedMotion } = useReducedMotion()
const pdfUrl = import.meta.env.BASE_URL + 'CV_Melisa_Isolina_S.pdf'
const mouseX = ref(0)
const mouseY = ref(0)
const isVisible = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (prefersReducedMotion.value) return
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20
  mouseX.value = x
  mouseY.value = y
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section id="beranda" class="hero section-paper" @mousemove="handleMouseMove">
    <!-- Abstract background shapes -->
    <div class="hero__shapes" aria-hidden="true">
      <div class="shape shape--circle-1 animate-float"></div>
      <div class="shape shape--circle-2 animate-float-slow"></div>
      <div class="shape shape--plus-1 animate-float-slow"></div>
      <div class="shape shape--dots"></div>
    </div>

    <div class="container-cv hero__inner">
      <!-- Content side -->
      <div :class="['hero__content', { 'hero__content--visible': isVisible }]">
        <div class="hero__badge animate-pulse-soft">
          <span class="hero__badge-dot" />
          {{ personalInfo.badge.text }}
        </div>

        <h1 class="hero__name text-gradient">{{ personalInfo.name }}</h1>
        <p class="hero__role">{{ personalInfo.role }}</p>
        <p class="hero__tagline">{{ personalInfo.tagline }}</p>

        <!-- CTA buttons -->
        <div class="hero__cta">
          <MagneticButton
            tag="a"
            :href="pdfUrl"
            variant="primary"
            download="CV_Melisa_Isolina_S.pdf"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2.25V12.75M9 12.75L4.5 8.25M9 12.75L13.5 8.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.25 15.75H15.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Unduh CV
          </MagneticButton>

          <MagneticButton
            tag="a"
            href="#kontak"
            variant="secondary"
            @click.prevent="$el?.closest('section')?.parentElement?.querySelector('#kontak')?.scrollIntoView({ behavior: 'smooth', block: 'start' })"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15.75 4.5L9 9.75L2.25 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="2.25" y="3" width="13.5" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            Hubungi Saya
          </MagneticButton>
        </div>

        <!-- Contact info compact -->
        <div class="hero__contact-bar">
          <a :href="`tel:${personalInfo.phone}`" class="hero__contact-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.07 2.33L3.34 1.5c-.35-.17-.77-.02-.95.33L1.36 3.9c-.15.3-.07.67.2.87 1.07.82 2.3 1.9 3.73 3.33 1.43 1.43 2.5 2.66 3.33 3.73.2.27.57.35.87.2l2.07-1.03c.35-.18.5-.6.33-.95l-.83-1.73c-.15-.3-.48-.47-.8-.4l-1.65.38c-.22.05-.45-.02-.6-.17L5.94 5.8c-.15-.15-.22-.38-.17-.6l.38-1.65c.07-.32-.1-.65-.4-.8l-.68-.42z" stroke="currentColor" stroke-width="1.2"/></svg>
            {{ personalInfo.phone }}
          </a>
          <a :href="`mailto:${personalInfo.email}`" class="hero__contact-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.75" y="2.5" width="10.5" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M1.75 4l5.25 3.5L12.25 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            {{ personalInfo.email }}
          </a>
          <span class="hero__contact-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.17C4.42 1.17 2.33 3.26 2.33 5.83c0 3.5 4.67 7 4.67 7s4.67-3.5 4.67-7c0-2.57-2.09-4.66-4.67-4.66z" stroke="currentColor" stroke-width="1.2"/><circle cx="7" cy="5.83" r="1.75" stroke="currentColor" stroke-width="1.2"/></svg>
            {{ personalInfo.address }}
          </span>
        </div>
      </div>

      <!-- Photo side -->
      <div :class="['hero__photo-wrapper', { 'hero__photo-wrapper--visible': isVisible }]">
        <div class="hero__photo-blob">
          <div
            class="hero__photo-parallax"
            :style="{
              transform: prefersReducedMotion
                ? 'none'
                : `translate(${mouseX * 0.3}px, ${mouseY * 0.3}px)`,
            }"
          >
            <div class="hero__photo-frame animate-float">
              <img
                src="../../assets/images/melisafoto.png"
                alt="Foto Melisa Isolina Songli"
                class="hero__photo"
                width="320"
                height="320"
                loading="eager"
              />
            </div>
            
            <!-- Floating UI Cards -->
            <div class="hero__floating-card hero__floating-card--1 animate-float-slow">
              <div class="card-icon">📈</div>
              <div class="card-text">
                <strong>90%</strong>
                <span>Optimization</span>
              </div>
            </div>
            
            <div class="hero__floating-card hero__floating-card--2 animate-float">
              <div class="card-icon">⭐</div>
              <div class="card-text">
                <strong>4+ Tahun</strong>
                <span>Pengalaman</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll-indicator">
      <div class="animate-bounce-chevron">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 60px;
  position: relative;
  overflow: hidden;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;
  align-items: center;
}

/* Photo */
.hero__photo-wrapper {
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hero__photo-wrapper--visible {
  opacity: 1;
  transform: translateX(0);
}

.hero__photo-blob {
  position: relative;
  width: 320px;
  height: 320px;
}

.hero__photo-blob::before {
  content: '';
  position: absolute;
  inset: -20px;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  background: var(--gradient-secondary);
  opacity: 0.15;
  animation: blob-morph 8s ease-in-out infinite;
}

@keyframes blob-morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75% { border-radius: 60% 30% 60% 40% / 70% 40% 50% 60%; }
}

.hero__photo-parallax {
  transition: transform 0.3s ease-out;
}

.hero__photo-frame {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(74, 111, 165, 0.2);
  box-shadow: var(--shadow-xl), 0 0 60px rgba(74, 111, 165, 0.15);
  position: relative;
  z-index: 1;
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Content */
.hero__content {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}

.hero__content--visible {
  opacity: 1;
  transform: translateY(0);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(217, 138, 75, 0.1);
  border: 1px solid rgba(217, 138, 75, 0.25);
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-signal);
  margin-bottom: 20px;
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-signal);
  animation: pulse-soft 2s ease-in-out infinite;
}

.hero__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 3.25rem;
  color: var(--color-ink);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.hero__role {
  font-size: 1.125rem;
  color: var(--color-denim);
  font-weight: 500;
  margin-bottom: 16px;
  letter-spacing: -0.01em;
}

.hero__tagline {
  font-size: 1rem;
  color: var(--color-slate);
  line-height: 1.7;
  max-width: 520px;
  margin-bottom: 28px;
}

.hero__cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

/* Contact bar */
.hero__contact-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.hero__contact-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.775rem;
  color: var(--color-slate);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-smooth);
}

.hero__contact-item:hover {
  color: var(--color-denim);
}

.hero__contact-item svg {
  flex-shrink: 0;
}

/* Scroll indicator */
.hero__scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--color-denim-light);
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 960px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero__photo-blob {
    width: 260px;
    height: 260px;
  }

  .hero__photo-frame {
    width: 260px;
    height: 260px;
  }

  .hero__name {
    font-size: 2.5rem;
  }

  .hero__tagline {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero__cta {
    justify-content: center;
  }

  .hero__contact-bar {
    justify-content: center;
  }

  .hero__content {
    order: 2;
  }

  .hero__photo-wrapper {
    order: 1;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 100px 0 60px;
  }

  .hero__name {
    font-size: 2rem;
  }

  .hero__photo-blob {
    width: 220px;
    height: 220px;
  }

  .hero__photo-frame {
    width: 220px;
    height: 220px;
  }

  .hero__contact-bar {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__photo-blob::before {
    animation: none;
  }

  .hero__photo-wrapper,
  .hero__content {
    transition: none;
    opacity: 1;
    transform: none;
  }
}

/* Abstract Shapes */
.hero__shapes {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.15;
}

.shape--circle-1 {
  width: 150px;
  height: 150px;
  top: -20px;
  right: 10%;
  background: var(--gradient-secondary);
}

.shape--circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  left: -100px;
  background: var(--gradient-tertiary);
  opacity: 0.1;
}

.shape--plus-1 {
  width: 40px;
  height: 40px;
  top: 30%;
  left: 20%;
}
.shape--plus-1::before, .shape--plus-1::after {
  content: '';
  position: absolute;
  background: var(--color-signal);
  border-radius: 2px;
}
.shape--plus-1::before {
  top: 50%; left: 0; right: 0; height: 4px; transform: translateY(-50%);
}
.shape--plus-1::after {
  left: 50%; top: 0; bottom: 0; width: 4px; transform: translateX(-50%);
}

.shape--dots {
  width: 100px;
  height: 100px;
  bottom: 20%;
  right: 5%;
  background-image: radial-gradient(var(--color-signal) 2px, transparent 2px);
  background-size: 20px 20px;
  opacity: 0.2;
}

/* Floating UI Cards */
.hero__floating-card {
  position: absolute;
  background: var(--color-paper);
  border-radius: 16px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-float);
  z-index: 5;
  border: 1px solid var(--color-glass-border);
}

.hero__floating-card--1 {
  top: 40px;
  right: -50px;
}

.hero__floating-card--2 {
  bottom: 30px;
  left: -40px;
}

.card-icon {
  font-size: 24px;
  background: var(--color-mist);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-text {
  display: flex;
  flex-direction: column;
}

.card-text strong {
  font-size: 1rem;
  color: var(--color-ink);
  font-weight: 700;
  line-height: 1.2;
}

.card-text span {
  font-size: 0.75rem;
  color: var(--color-slate);
}

@media (max-width: 900px) {
  .hero__floating-card--1 { right: -10px; top: -10px; }
  .hero__floating-card--2 { left: -10px; bottom: 0px; }
}

</style>
