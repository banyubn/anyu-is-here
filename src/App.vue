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
import { provide } from 'vue'
import CustomCursor from './components/CustomCursor.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useTheme } from '@/composables/useTheme'

const { isDarkMode, toggleDarkMode } = useTheme()

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
