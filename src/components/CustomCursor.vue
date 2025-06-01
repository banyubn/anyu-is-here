<template>
  <div>
    <div ref="cursor" class="custom-cursor"></div>
    <div ref="cursorFollower" class="cursor-follower"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const cursor = ref(null)
const cursorFollower = ref(null)

onMounted(() => {
  // Hide default cursor
  document.body.style.cursor = 'none'
  
  const updateCursor = (e) => {
    gsap.set(cursor.value, {
      x: e.clientX,
      y: e.clientY
    })
    
    gsap.to(cursorFollower.value, {
      duration: 0.3,
      x: e.clientX,
      y: e.clientY
    })
  }
  
  document.addEventListener('mousemove', updateCursor)
  
  onUnmounted(() => {
    document.removeEventListener('mousemove', updateCursor)
    document.body.style.cursor = 'auto'
  })
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}

.cursor-follower {
  position: fixed;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
}
</style>
