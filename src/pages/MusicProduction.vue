<template>
  <div class="music-page">
    <PageHeader 
      title="MUSIC PRODUCTION"
      :icon="Music"
      description="Creating immersive audio experiences"
    />

    <div class="container">
      <div class="coming-soon-content">
        <div class="coming-soon-animation">
          <div class="music-visualizer">
            <div v-for="i in 12" :key="i" class="visualizer-bar" :style="getVisualizerStyle(i)"></div>
          </div>
          
          <Music class="coming-soon-icon" />
          
          <h2 class="coming-soon-title">COMING SOON</h2>
          
          <p class="coming-soon-description">
            Music production portfolio is currently in development. 
            Stay tuned for amazing compositions, beats, and audio experiences that will blow your mind!
          </p>
          
          <div class="coming-soon-features">
            <div class="feature-item">
              <span class="feature-icon">🎵</span>
              <div class="feature-content">
                <span class="feature-title">Original Compositions</span>
                <span class="feature-desc">Unique musical pieces across genres</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎧</span>
              <div class="feature-content">
                <span class="feature-title">Electronic Music</span>
                <span class="feature-desc">EDM, synthwave, and ambient tracks</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎹</span>
              <div class="feature-content">
                <span class="feature-title">Cinematic Scores</span>
                <span class="feature-desc">Film and game soundtrack compositions</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎤</span>
              <div class="feature-content">
                <span class="feature-title">Audio Production</span>
                <span class="feature-desc">Mixing, mastering, and sound design</span>
              </div>
            </div>
          </div>
          
          <div class="daw-preview">
            <h3 class="daw-title">Digital Audio Workstation</h3>
            <div class="daw-interface">
              <div class="mixer-section">
                <div v-for="i in 8" :key="i" class="channel-strip">
                  <div class="channel-header">
                    <span class="channel-name">CH {{ i }}</span>
                  </div>
                  <div class="eq-section">
                    <div v-for="j in 3" :key="j" class="eq-knob" :style="getKnobRotation()"></div>
                  </div>
                  <div class="fader-section">
                    <div class="fader-track">
                      <div class="fader-handle" :style="getFaderPosition(i)"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="transport-controls">
                <button class="transport-btn record">
                  <div class="record-dot"></div>
                </button>
                <button class="transport-btn play">
                  <Play class="transport-icon" />
                </button>
                <button class="transport-btn stop">
                  <Square class="transport-icon" />
                </button>
                <div class="bpm-display">
                  <span class="bpm-label">BPM</span>
                  <span class="bpm-value">128</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { Music, Play, Bell } from 'lucide-vue-next'
import { Square } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'

const getVisualizerStyle = (index) => {
  const heights = [20, 40, 60, 80, 100, 70, 90, 50, 30, 65, 85, 45]
  return {
    height: heights[index - 1] + '%',
    animationDelay: (index * 0.1) + 's'
  }
}

const getKnobRotation = () => {
  const rotation = Math.random() * 270 - 135 // -135 to 135 degrees
  return {
    transform: `rotate(${rotation}deg)`
  }
}

const getFaderPosition = (channel) => {
  const positions = [60, 45, 70, 55, 80, 40, 65, 50]
  return {
    bottom: positions[channel - 1] + '%'
  }
}

onMounted(() => {
  // Animate coming soon icon
  gsap.fromTo('.coming-soon-icon',
    { scale: 0.5, rotation: -10 },
    { duration: 1.2, scale: 1, rotation: 0, ease: 'elastic.out(1, 0.3)', delay: 0.5 }
  )
  
  // Animate title
  gsap.fromTo('.coming-soon-title',
    { opacity: 0, y: 20 },
    { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out', delay: 0.7 }
  )
  
  // Animate description
  gsap.fromTo('.coming-soon-description',
    { opacity: 0 },
    { duration: 0.8, opacity: 1, ease: 'power2.out', delay: 0.9 }
  )
  
  // Animate feature items
  gsap.fromTo('.feature-item',
    { opacity: 0, x: -20 },
    { duration: 0.6, opacity: 1, x: 0, stagger: 0.2, ease: 'power2.out', delay: 1.1 }
  )
  
  // Animate DAW interface
  gsap.fromTo('.daw-interface',
    { opacity: 0, y: 30 },
    { duration: 0.8, opacity: 1, y: 0, ease: 'power2.out', delay: 1.5 }
  )
  
  // Animate visualizer bars
  gsap.to('.visualizer-bar', {
    duration: 'random(0.5, 1.5)',
    scaleY: 'random(0.3, 1)',
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut',
    stagger: {
      amount: 1,
      from: 'random'
    }
  })
  
  // Animate fader handles
  gsap.to('.fader-handle', {
    duration: 'random(2, 4)',
    y: 'random(-20, 20)',
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.3
  })
})
</script>

<style scoped>
.music-page {
  padding-top: 80px;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.coming-soon-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

.coming-soon-animation {
  max-width: 800px;
  width: 100%;
}

.music-visualizer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
  height: 80px;
  margin-bottom: 2rem;
}

.visualizer-bar {
  width: 6px;
  background: linear-gradient(to top, #00ff88, #00d4ff);
  border-radius: 3px;
  animation: visualizer-pulse 1s infinite ease-in-out;
  transform-origin: bottom;
}

@keyframes visualizer-pulse {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}

.coming-soon-icon {
  width: 100px;
  height: 100px;
  color: #00ff88;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.coming-soon-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s infinite;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.coming-soon-description {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.coming-soon-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: left;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.feature-title {
  font-weight: 600;
  color: #00ff88;
}

.feature-desc {
  font-size: 0.9rem;
  opacity: 0.7;
}

.daw-preview {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
}

.daw-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.daw-interface {
  background: #1a1a1a;
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mixer-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.channel-strip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  padding: 1rem 0.5rem;
  min-width: 60px;
}

.channel-header {
  text-align: center;
}

.channel-name {
  font-size: 0.7rem;
  font-weight: 600;
  color: #00ff88;
}

.eq-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.eq-knob {
  width: 25px;
  height: 25px;
  background: #333;
  border-radius: 50%;
  border: 2px solid #00ff88;
  position: relative;
}

.eq-knob::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 8px;
  background: #00ff88;
  border-radius: 1px;
}

.fader-section {
  height: 120px;
  display: flex;
  align-items: center;
}

.fader-track {
  width: 30px;
  height: 100px;
  background: #333;
  border-radius: 15px;
  position: relative;
}

.fader-handle {
  position: absolute;
  width: 25px;
  height: 15px;
  background: #00ff88;
  border-radius: 3px;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.3s ease;
}

.transport-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
}

.transport-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.transport-btn.record {
  background: rgba(255, 107, 107, 0.2);
  border: 2px solid #ff6b6b;
}

.transport-btn.play {
  background: rgba(0, 255, 136, 0.2);
  border: 2px solid #00ff88;
}

.transport-btn.stop {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.transport-btn:hover {
  transform: scale(1.1);
}

.record-dot {
  width: 20px;
  height: 20px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: record-blink 1s infinite;
}

@keyframes record-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.transport-icon {
  width: 20px;
  height: 20px;
  color: #00ff88;
}

.bpm-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin-left: 1rem;
}

.bpm-label {
  font-size: 0.8rem;
  opacity: 0.7;
}

.bpm-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff88;
}

.notify-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
}

.notify-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.notify-description {
  opacity: 0.8;
  margin-bottom: 2rem;
}

.notify-form {
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.email-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.email-input:focus {
  border-color: #00ff88;
  box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2);
}

.email-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.notify-btn {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border: none;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.notify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
}

.notify-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .coming-soon-title {
    font-size: 2.5rem;
  }
  
  .coming-soon-features {
    grid-template-columns: 1fr;
  }
  
  .mixer-section {
    gap: 0.5rem;
  }
  
  .channel-strip {
    min-width: 50px;
    padding: 0.8rem 0.3rem;
  }
  
  .notify-form {
    flex-direction: column;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
