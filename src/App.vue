<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <!-- Custom Cursor -->
    <CustomCursor />
    
    <!-- Navigation -->
    <Navbar @toggle-dark-mode="toggleDarkMode" :is-dark-mode="isDarkMode" />
    
    <!-- Router View -->
    <router-view />
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { gsap } from 'gsap'
import CustomCursor from './components/CustomCursor.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const isDarkMode = ref(true)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  
  gsap.to('body', {
    duration: 0.5,
    backgroundColor: isDarkMode.value ? '#0a0a0a' : '#ffffff',
    ease: 'power2.inOut'
  })
  
  // Update CSS variables for theme
  updateThemeColors()
}

const updateThemeColors = () => {
  const root = document.documentElement
  
  if (isDarkMode.value) {
    // Dark theme colors
    root.style.setProperty('--bg-color', '#0a0a0a')
    root.style.setProperty('--text-color', '#ffffff')
    root.style.setProperty('--accent-color', '#00ff88')
    root.style.setProperty('--accent-color-2', '#00d4ff')
    root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.02)')
    root.style.setProperty('--card-bg-light', 'rgba(255, 255, 255, 0.05)')
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)')
    root.style.setProperty('--accent-glow-1', 'rgba(0, 255, 136, 0.1)')
    root.style.setProperty('--accent-glow-2', 'rgba(0, 212, 255, 0.1)')
    root.style.setProperty('--accent-gradient', 'linear-gradient(45deg, #00ff88, #00d4ff)')
    root.style.setProperty('--footer-bg', 'linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%)')
  } else {
    // Light theme colors
    root.style.setProperty('--bg-color', '#ffffff')
    root.style.setProperty('--text-color', '#0a0a0a')
    root.style.setProperty('--accent-color', '#00cc66')
    root.style.setProperty('--accent-color-2', '#0099cc')
    root.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.02)')
    root.style.setProperty('--card-bg-light', 'rgba(0, 0, 0, 0.05)')
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)')
    root.style.setProperty('--accent-glow-1', 'rgba(0, 204, 102, 0.1)')
    root.style.setProperty('--accent-glow-2', 'rgba(0, 153, 204, 0.1)')
    root.style.setProperty('--accent-gradient', 'linear-gradient(45deg, #00cc66, #0099cc)')
    root.style.setProperty('--footer-bg', 'linear-gradient(135deg, rgba(0, 204, 102, 0.05) 0%, rgba(0, 153, 204, 0.05) 100%)')
  }
}

onMounted(() => {
  updateThemeColors()
})

// Provide dark mode state to all components
provide('isDarkMode', isDarkMode)
</script>

<style>
/* Global Styles */
:root {
  --bg-color: #0a0a0a;
  --text-color: #ffffff;
  --accent-color: #00ff88;
  --accent-color-2: #00d4ff;
  --card-bg: rgba(255, 255, 255, 0.02);
  --card-bg-light: rgba(255, 255, 255, 0.05);
  --border-color: rgba(255, 255, 255, 0.1);
  --accent-glow-1: rgba(0, 255, 136, 0.1);
  --accent-glow-2: rgba(0, 212, 255, 0.1);
  --accent-gradient: linear-gradient(45deg, #00ff88, #00d4ff);
  --footer-bg: linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html, * {
  cursor: none !important;
}

#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  overflow-x: hidden;
  transition: all 0.5s ease;
}

#app.dark-mode {
  background: var(--bg-color);
  color: var(--text-color);
}

#app:not(.dark-mode) {
  background: var(--bg-color);
  color: var(--text-color);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--card-bg);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: var(--accent-gradient);
  border-radius: 5px;
  border: 1px solid var(--border-color);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-gradient);
  box-shadow: 0 0 10px var(--accent-glow-1);
}

/* Firefox */
html {
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) var(--card-bg);
}
</style>
