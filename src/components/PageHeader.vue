<template>
  <div class="page-header">
    <div class="container">
      <router-link to="/" class="back-button">
        <ArrowLeft class="back-icon" />
        <span>Back</span>
      </router-link>
      <div class="page-title-container">
        <component :is="icon" class="page-icon" />
        <h1 class="page-title">{{ title }}</h1>
      </div>
      <p v-if="description" class="page-description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'lucide-vue-next'

defineProps({
  title: String,
  icon: Object,
  description: String
})
</script>

<style scoped>
.page-header {
  padding: 2rem 0 5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(0, 255, 136, 0.02) 0%, transparent 100%);
  margin-bottom: 3rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.back-button {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-button:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: #00ff88;
}

.back-icon {
  width: 16px;
  height: 16px;
}

.page-title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.page-icon {
  width: 40px;
  height: 40px;
  color: #00ff88;
}

.page-title {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.page-description {
  font-size: 1.2rem;
  opacity: 0.8;
  max-width: 600px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .page-icon {
    width: 30px;
    height: 30px;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
