<template>
  <div class="tech-carousel">
    <div class="carousel-track" ref="carouselTrack">
      <div v-for="(tech, index) in duplicatedTechs" :key="`${tech.name}-${index}`" 
           class="tech-item"
           :style="{ backgroundColor: tech.color }">
        <component :is="tech.icon" class="tech-icon" />
        <span class="tech-name">{{ tech.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { 
  Code, Database, Palette, Globe, Server, 
  Layers, Zap, Terminal, FileCode, Cpu
} from 'lucide-vue-next'

const carouselTrack = ref(null)

const techs = [
  { name: 'Vue.js', color: '#4fc08d', icon: Code },
  { name: 'React', color: '#61dafb', icon: Globe },
  { name: 'TypeScript', color: '#3178c6', icon: FileCode },
  { name: 'LUMEN', color: '#e74c3c', icon: Server },
  { name: 'Node.js', color: '#339933', icon: Terminal },
  { name: 'PostgreSQL', color: '#336791', icon: Database },
  { name: 'GSAP', color: '#88ce02', icon: Zap },
  { name: 'Tailwind', color: '#06b6d4', icon: Palette },
  { name: 'Express', color: '#000000', icon: Layers },
  { name: 'Docker', color: '#2496ed', icon: Cpu },
  { name: 'After Effects', color: '#9999ff', icon: Palette },
  { name: 'Premiere Pro', color: '#9999ff', icon: Palette }
]

// Duplicate techs for seamless loop
const duplicatedTechs = [...techs, ...techs, ...techs]

onMounted(() => {
  const track = carouselTrack.value
  const items = track.children
  const itemWidth = items[0].offsetWidth + 20 // including gap
  const totalWidth = itemWidth * techs.length
  
  gsap.set(track, { x: 0 })
  
  gsap.to(track, {
    x: -totalWidth,
    duration: 20,
    ease: 'none',
    repeat: -1
  })
})
</script>

<style scoped>
.tech-carousel {
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem 0;
  position: relative;
}

.tech-carousel::before,
.tech-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.tech-carousel::before {
  left: 0;
  background: linear-gradient(to right, rgba(26, 26, 26, 1), transparent);
}

.tech-carousel::after {
  right: 0;
  background: linear-gradient(to left, rgba(26, 26, 26, 1), transparent);
}

.carousel-track {
  display: flex;
  gap: 20px;
  will-change: transform;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  white-space: nowrap;
  min-width: fit-content;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.tech-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}

.tech-icon {
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.tech-name {
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
