<script setup lang="ts">
</script>

<template>
  <footer class="footer section-mist">
    <div class="container-cv footer__inner">
      <p class="footer__text">
        © {{ new Date().getFullYear() }} Melisa Isolina Songli. All rights reserved.
      </p>
      <p class="footer__subtext">
        Dibuat dengan <span class="footer__heart">♥</span> menggunakan Vue.js
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 40px 0;
  border-top: 1px solid var(--color-glass-border);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.footer__text {
  font-family: var(--font-mono);
  font-size: 0.813rem;
  color: var(--color-slate);
  letter-spacing: 0.01em;
}

.footer__subtext {
  font-size: 0.75rem;
  color: var(--color-slate);
  opacity: 0.7;
}

.footer__heart {
  color: var(--color-signal);
}
</style>
