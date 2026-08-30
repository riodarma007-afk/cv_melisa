<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { personalInfo } from '../../data/cv-data'
import MagneticButton from '../ui/MagneticButton.vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const { prefersReducedMotion } = useReducedMotion()
const pdfUrl = import.meta.env.BASE_URL + 'CV_Melisa_Isolina_S.pdf'
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const formData = ref({
  name: '',
  email: '',
  message: '',
})

function handleSubmit() {
  const subject = encodeURIComponent(`Pesan dari ${formData.value.name} via Portfolio`)
  const body = encodeURIComponent(
    `Nama: ${formData.value.name}\nEmail: ${formData.value.email}\n\n${formData.value.message}`
  )
  window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_self')
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
    { threshold: 0.15 }
  )

  observer.observe(sectionRef.value)
})
</script>

<template>
  <section id="kontak" class="contact section-paper" ref="sectionRef">
    <div class="container-cv">
      <div :class="['contact__header', { 'contact__header--visible': isVisible || prefersReducedMotion }]">
        <span class="contact__label">Kontak</span>
        <h2 class="contact__title">Hubungi Saya</h2>
        <p class="contact__subtitle">
          Tertarik untuk berdiskusi atau bekerja sama? Jangan ragu untuk menghubungi.
        </p>
      </div>

      <div class="contact__grid">
        <!-- Form -->
        <div :class="['contact__form-wrapper', { 'contact__form-wrapper--visible': isVisible || prefersReducedMotion }]">
          <form class="contact__form" @submit.prevent="handleSubmit">
            <div class="contact__field">
              <label for="contact-name" class="contact__field-label">Nama</label>
              <input
                id="contact-name"
                v-model="formData.name"
                type="text"
                class="contact__input"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>

            <div class="contact__field">
              <label for="contact-email" class="contact__field-label">Email</label>
              <input
                id="contact-email"
                v-model="formData.email"
                type="email"
                class="contact__input"
                placeholder="email@contoh.com"
                required
              />
            </div>

            <div class="contact__field">
              <label for="contact-message" class="contact__field-label">Pesan</label>
              <textarea
                id="contact-message"
                v-model="formData.message"
                class="contact__input contact__textarea"
                placeholder="Tulis pesan Anda..."
                rows="5"
                required
              />
            </div>

            <MagneticButton tag="button" variant="primary">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.75 2.25L8.25 9.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.75 2.25L10.5 15.75L8.25 9.75L2.25 7.5L15.75 2.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Kirim Pesan
            </MagneticButton>
          </form>
        </div>

        <!-- Contact info sidebar -->
        <div :class="['contact__info', { 'contact__info--visible': isVisible || prefersReducedMotion }]">
          <div class="contact__info-card">
            <h3 class="contact__info-title">Informasi Kontak</h3>

            <div class="contact__info-items">
              <a :href="`tel:${personalInfo.phone}`" class="contact__info-item">
                <div class="contact__info-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.24 3.33L4.77 2.14c-.5-.24-1.1-.03-1.36.47L1.94 5.57c-.22.43-.1.96.29 1.24 1.53 1.17 3.29 2.71 5.33 4.76 2.04 2.04 3.58 3.8 4.76 5.33.28.39.81.51 1.24.29l2.96-1.47c.5-.26.71-.86.47-1.36l-1.19-2.47c-.21-.43-.69-.67-1.14-.57l-2.36.54c-.31.07-.64-.03-.86-.24L8.1 8.28c-.21-.21-.31-.55-.24-.86l.54-2.36c.1-.46-.14-.93-.57-1.14l-.59-.59z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div>
                  <span class="contact__info-label">Telepon</span>
                  <span class="contact__info-value">{{ personalInfo.phone }}</span>
                </div>
              </a>

              <a :href="`mailto:${personalInfo.email}`" class="contact__info-item">
                <div class="contact__info-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M2.5 6l7.5 5 7.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div>
                  <span class="contact__info-label">Email</span>
                  <span class="contact__info-value">{{ personalInfo.email }}</span>
                </div>
              </a>

              <div class="contact__info-item">
                <div class="contact__info-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 1.67c-3.68 0-6.67 2.99-6.67 6.66 0 5 6.67 10 6.67 10s6.67-5 6.67-10c0-3.67-2.99-6.66-6.67-6.66z" stroke="currentColor" stroke-width="1.5"/>
                    <circle cx="10" cy="8.33" r="2.5" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div>
                  <span class="contact__info-label">Alamat</span>
                  <span class="contact__info-value">{{ personalInfo.address }}</span>
                </div>
              </div>
            </div>

            <div class="contact__download">
              <MagneticButton
                tag="a"
                :href="pdfUrl"
                variant="secondary"
                download="CV_Melisa_Isolina_S.pdf"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v9.5M8 11.5L4 7.5M8 11.5L12 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                Unduh CV PDF
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: var(--section-gap) 0;
}

.contact__header {
  text-align: center;
  margin-bottom: 48px;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.contact__header--visible {
  opacity: 1;
  transform: translateY(0);
}

.contact__label {
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

.contact__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-ink);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.contact__subtitle {
  font-size: 1rem;
  color: var(--color-slate);
}

.contact__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 40px;
  max-width: 900px;
  margin: 0 auto;
}

/* Form */
.contact__form-wrapper {
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
}

.contact__form-wrapper--visible {
  opacity: 1;
  transform: translateY(0);
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contact__field-label {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-ink);
}

.contact__input {
  padding: 14px 18px;
  border: 1.5px solid rgba(74, 111, 165, 0.15);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.938rem;
  color: var(--color-ink);
  background: #fff;
  transition:
    border-color var(--duration-fast) var(--ease-smooth),
    box-shadow var(--duration-fast) var(--ease-smooth);
  outline: none;
}

.contact__input::placeholder {
  color: var(--color-slate);
  opacity: 0.6;
}

.contact__input:focus {
  border-color: var(--color-denim);
  box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.12);
}

.contact__textarea {
  resize: vertical;
  min-height: 120px;
}

/* Info sidebar */
.contact__info {
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s;
}

.contact__info--visible {
  opacity: 1;
  transform: translateY(0);
}

.contact__info-card {
  background: var(--color-mist);
  border-radius: var(--radius-lg);
  padding: 32px;
  border: 1px solid var(--color-glass-border);
}

.contact__info-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--color-ink);
  margin-bottom: 24px;
}

.contact__info-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.contact__info-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  text-decoration: none;
  color: inherit;
  transition: opacity var(--duration-fast) var(--ease-smooth);
}

.contact__info-item:hover {
  opacity: 0.8;
}

.contact__info-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: rgba(74, 111, 165, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-denim);
  flex-shrink: 0;
}

.contact__info-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-slate);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.contact__info-value {
  display: block;
  font-size: 0.938rem;
  color: var(--color-ink);
  font-weight: 500;
}

.contact__download {
  padding-top: 4px;
}

@media (max-width: 768px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .contact__title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .contact {
    padding: 64px 0;
  }

  .contact__title {
    font-size: 1.5rem;
  }

  .contact__info-card {
    padding: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact__header,
  .contact__form-wrapper,
  .contact__info {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
