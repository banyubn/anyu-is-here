<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">
        <X class="close-icon" />
      </button>
      
      <div class="modal-header">
        <div class="project-image-modal">
          <div class="project-gradient-modal" :style="{ background: project.gradient }">
            <div class="project-pattern-modal"></div>
            <div class="project-title-overlay-modal">{{ project.name }}</div>
          </div>
        </div>
        
        <div class="project-info-modal">
          <h2 class="project-name-modal">{{ project.name }}</h2>
          <p class="project-description-modal">{{ project.description }}</p>
          
          <div class="project-details">
            <div class="detail-item">
              <Calendar class="detail-icon" />
              <span>{{ project.year || '2025' }}</span>
            </div>
            <div class="detail-item">
              <Clock class="detail-icon" />
              <span>{{ project.duration || '3 months' }}</span>
            </div>
            <div class="detail-item">
              <Users class="detail-icon" />
              <span>{{ project.team || 'Solo Project' }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-body">
        <div class="tech-stack-section">
          <h3 class="section-title-modal">Tech Stack</h3>
          <div class="tech-grid">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag-modal">
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="features-section">
          <h3 class="section-title-modal">Key Features</h3>
          <ul class="features-list">
            <li v-for="feature in project.features" :key="feature" class="feature-item">
              <Check class="feature-icon" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        
        <div class="links-section">
          <a v-if="project.github" :href="project.github" class="project-link github">
            <Github class="link-icon" />
            <span>View Code</span>
          </a>
          <a v-if="project.demo" :href="project.demo" class="project-link demo">
            <ExternalLink class="link-icon" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Calendar, Clock, Users, Check, Github, ExternalLink } from 'lucide-vue-next'

defineProps({
  isOpen: Boolean,
  project: Object
})

defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.close-icon {
  width: 20px;
  height: 20px;
  color: #ffffff;
}

.modal-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.project-image-modal {
  aspect-ratio: 16/10;
  border-radius: 15px;
  overflow: hidden;
}

.project-gradient-modal {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-pattern-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
  background-size: 20px 20px;
  animation: pattern-slide 20s linear infinite;
}

.project-title-overlay-modal {
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  text-align: center;
}

.project-info-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-name-modal {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #00ff88;
}

.project-description-modal {
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.project-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  opacity: 0.8;
}

.detail-icon {
  width: 16px;
  height: 16px;
  color: #00ff88;
}

.modal-body {
  padding: 2rem;
}

.section-title-modal {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #00ff88;
}

.tech-stack-section {
  margin-bottom: 2rem;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech-tag-modal {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #00ff88;
}

.features-section {
  margin-bottom: 2rem;
}

.features-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.feature-icon {
  width: 16px;
  height: 16px;
  color: #00ff88;
}

.links-section {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-link.github {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.project-link.demo {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: #000;
}

.project-link:hover {
  transform: translateY(-2px);
}

.project-link.github:hover {
  background: rgba(255, 255, 255, 0.15);
}

.project-link.demo:hover {
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.link-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .modal-header {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: 95vh;
  }
  
  .links-section {
    flex-direction: column;
  }
  
  .project-link {
    justify-content: center;
  }
}
</style>
