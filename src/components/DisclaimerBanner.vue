<template>
  <div class="disclaimer-banner" ref="disclaimerBanner">
    <div class="disclaimer-content">
      <div class="disclaimer-icon">
        <AlertTriangle class="icon" />
      </div>
      <div class="disclaimer-text">
        <h3 class="disclaimer-title">Disclaimer</h3>
        <p class="disclaimer-message">
          All of the data displayed on this page are STILL dummies and for demonstration purposes only. 
          These are not real certifications.
        </p>
      </div>
      <button class="disclaimer-close" @click="closeBanner">
        <X class="close-icon" />
      </button>
    </div>
    <div class="disclaimer-bg"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { AlertTriangle, X } from 'lucide-vue-next'

const disclaimerBanner = ref(null)

const closeBanner = () => {
  gsap.to(disclaimerBanner.value, {
    duration: 0.5,
    y: -100,
    opacity: 0,
    ease: 'power2.inOut',
    onComplete: () => {
      disclaimerBanner.value.style.display = 'none'
    }
  })
}

onMounted(() => {
  // Entrance animation
  gsap.fromTo(disclaimerBanner.value,
    { y: -100, opacity: 0 },
    { 
      duration: 0.8, 
      y: 0, 
      opacity: 1, 
      ease: 'power2.out',
      delay: 0.5
    }
  )

  // Pulsing animation for icon
  gsap.to('.disclaimer-icon .icon', {
    scale: 1.1,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
  })

  // Floating background animation
  gsap.to('.disclaimer-bg', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
  })
})
</script>

<style scoped>
.disclaimer-banner {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(255, 193, 7, 0.1) 0%, 
    rgba(255, 152, 0, 0.1) 100%);
  border: 2px solid rgba(255, 193, 7, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(255, 193, 7, 0.1);
}

.disclaimer-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.disclaimer-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ffc107, #ff9800);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
}

.disclaimer-icon .icon {
  width: 24px;
  height: 24px;
  color: #1a1a1a;
}

.disclaimer-text {
  flex: 1;
}

.disclaimer-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffc107;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.disclaimer-message {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color) !important;
  opacity: 0.9;
  margin: 0;
}

.disclaimer-close {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.disclaimer-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.close-icon {
  width: 18px;
  height: 18px;
  color: var(--text-color);
}

.disclaimer-bg {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, 
    rgba(255, 193, 7, 0.05) 0%, 
    transparent 70%);
  z-index: 1;
  pointer-events: none;
}

/* Light theme adjustments */
:root:not(.dark-mode) .disclaimer-banner {
  background: linear-gradient(135deg, 
    rgba(255, 193, 7, 0.15) 0%, 
    rgba(255, 152, 0, 0.15) 100%);
  border-color: rgba(255, 193, 7, 0.4);
}

:root:not(.dark-mode) .disclaimer-title {
  color: #e65100;
}

:root:not(.dark-mode) .disclaimer-message {
  color: #333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .disclaimer-banner {
    padding: 1rem;
  }
  
  .disclaimer-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .disclaimer-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  
  .disclaimer-title {
    font-size: 1.1rem;
  }
  
  .disclaimer-message {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .disclaimer-banner {
    padding: 0.8rem;
    margin-bottom: 1.5rem;
  }
  
  .disclaimer-icon {
    width: 40px;
    height: 40px;
  }
  
  .disclaimer-icon .icon {
    width: 20px;
    height: 20px;
  }
  
  .disclaimer-title {
    font-size: 1rem;
  }
  
  .disclaimer-message {
    font-size: 0.85rem;
  }
}

/* Animation keyframes */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
  }
  50% {
    box-shadow: 0 4px 25px rgba(255, 193, 7, 0.5);
  }
}

.disclaimer-icon {
  animation: pulse 2s infinite;
}

/* Hover effects */
.disclaimer-banner:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(255, 193, 7, 0.15);
  transition: all 0.3s ease;
}

.disclaimer-banner:hover .disclaimer-bg {
  opacity: 1.5;
}
</style>
