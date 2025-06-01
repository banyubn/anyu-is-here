<template>
  <nav ref="navbar" class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <span class="logo-text">BANYU.DEV</span>
        <div class="logo-dot"></div>
      </router-link>

      <button @click="$emit('toggle-dark-mode')" class="theme-toggle">
        <div class="toggle-icon">
          <Sun v-if="isDarkMode" class="icon" />
          <Moon v-else class="icon" />
        </div>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

defineProps({
  isDarkMode: Boolean
})

defineEmits(['toggle-dark-mode'])

const navbar = ref(null)
const isScrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  
  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.navbar.scrolled {
  background: rgba(10, 10, 10, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.logo-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.theme-toggle {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  border-color: #00ff88;
  transform: scale(1.1);
}

.toggle-icon .icon {
  width: 18px;
  height: 18px;
  color: #ffffff;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
  }
}
</style>
