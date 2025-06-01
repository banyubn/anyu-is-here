<template>
  <div class="video-page">
    <PageHeader 
      title="VIDEO EDITING"
      :icon="Video"
      description="Cinematic storytelling through visual media"
    />

    <div class="container">
      <!-- Video Intro -->
      <section class="video-intro">
        <div class="video-intro-text">
          <h2 class="glitch-text" data-text="VISUAL STORYTELLING">VISUAL STORYTELLING</h2>
          <p class="intro-description">
            Creating captivating visual narratives through dynamic editing, motion design, and cinematic techniques.
            Each project is crafted with attention to detail, rhythm, and emotional impact.
          </p>
          <div class="video-stats">
            <div class="video-stat">
              <span class="stat-number">500+</span>
              <span class="stat-label">Videos Edited</span>
            </div>
            <div class="video-stat">
              <span class="stat-number">50M+</span>
              <span class="stat-label">Total Views</span>
            </div>
            <div class="video-stat">
              <span class="stat-number">5+</span>
              <span class="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
        <div class="video-reel-preview">
          <div class="reel-frame">
            <div class="play-button">
              <Play class="reel-play-icon" />
            </div>
            <span class="reel-text">SHOWREEL 2024</span>
            <div class="reel-overlay"></div>
          </div>
        </div>
      </section>

      <!-- Video Categories -->
      <section class="video-categories">
        <h2 class="section-subtitle">PRODUCTION PORTFOLIO</h2>
        <div class="video-types">
          <div 
            v-for="videoType in videoTypes" 
            :key="videoType.id" 
            class="video-type-card"
            @click="openVideoModal(videoType)"
            @mouseenter="onCardHover"
            @mouseleave="onCardLeave"
          >
            <div class="video-thumbnail">
              <!-- Static thumbnail image -->
              <img 
                :src="videoType.thumbnail" 
                :alt="videoType.name"
                class="thumbnail-static"
                :class="{ 'hidden': hoveredCard === videoType.id }"
              />
              <!-- Animated GIF (shown on hover) -->
              <img 
                :src="videoType.gif" 
                :alt="videoType.name + ' preview'"
                class="thumbnail-gif"
                :class="{ 'visible': hoveredCard === videoType.id }"
              />
              <div class="play-overlay">
                <Play class="play-icon" />
              </div>
              <div class="video-badge">{{ videoType.count }}</div>
            </div>
            <div class="video-info">
              <h3 class="video-type-name">{{ videoType.name }}</h3>
              <p class="video-description">{{ videoType.description }}</p>
              <div class="video-stats-mini">
                <span class="video-count">{{ videoType.count }} videos</span>
                <span class="video-duration">{{ videoType.avgDuration }}</span>
              </div>
              <div class="video-features">
                <span v-for="feature in videoType.features" :key="feature" class="feature-tag">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Software Expertise -->
      <section class="software-expertise">
        <h2 class="section-subtitle">SOFTWARE MASTERY</h2>
        <div class="software-grid">
          <div v-for="(software, index) in videoSoftware" :key="index" class="software-card">
            <div class="software-icon" :style="{ backgroundColor: software.color }">
              {{ software.icon }}
            </div>
            <div class="software-info">
              <h3 class="software-name">{{ software.name }}</h3>
              <p class="software-description">{{ software.description }}</p>
              <div class="software-level">
                <div class="level-bar">
                  <div 
                    ref="softwareLevels"
                    class="level-fill" 
                    :style="{ backgroundColor: software.color }"
                    :data-width="software.level + '%'"
                  ></div>
                </div>
                <span class="level-text">{{ software.levelText }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Timeline Mockup -->
      <section class="video-editor-mockup">
        <h2 class="section-subtitle">EDITING WORKSPACE</h2>
        <div class="editor-interface">
          <div class="timeline-section">
            <div class="timeline-header">
              <span class="timeline-title">Timeline</span>
              <div class="timeline-controls">
                <button class="control-btn"><Play class="control-icon" /></button>
                <button class="control-btn"><Pause class="control-icon" /></button>
                <span class="timecode">00:02:34:15</span>
              </div>
            </div>
            <div class="timeline">
              <div v-for="i in 8" :key="i" class="timeline-track" :class="`track-${i}`">
                <div class="track-label">{{ getTrackLabel(i) }}</div>
                <div class="track-content">
                  <div v-for="j in getTrackClips(i)" :key="j" class="timeline-clip" :style="getClipStyle(i, j)"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="preview-section">
            <div class="preview-window">
              <div class="preview-content">
                <div class="preview-gradient"></div>
                <div class="preview-text">PREVIEW</div>
              </div>
              <div class="preview-overlay">
                <Play class="preview-play-icon" />
              </div>
            </div>
            <div class="preview-controls">
              <div class="control-group">
                <span class="control-label">Resolution</span>
                <span class="control-value">1920x1080</span>
              </div>
              <div class="control-group">
                <span class="control-label">Frame Rate</span>
                <span class="control-value">60fps</span>
              </div>
              <div class="control-group">
                <span class="control-label">Duration</span>
                <span class="control-value">02:34</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Video Modal -->
    <div v-if="selectedVideo" class="video-modal" @click="closeVideoModal">
      <div class="modal-backdrop"></div>
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeVideoModal">
          <X class="close-icon" />
        </button>
        <div class="modal-video-container">
          <img 
            :src="selectedVideo.gif" 
            :alt="selectedVideo.name"
            class="modal-video"
          />
          <div class="modal-info">
            <h2 class="modal-title">{{ selectedVideo.name }}</h2>
            <p class="modal-description">{{ selectedVideo.description }}</p>
            <div class="modal-stats">
              <div class="modal-stat">
                <span class="stat-label">Videos</span>
                <span class="stat-value">{{ selectedVideo.count }}</span>
              </div>
              <div class="modal-stat">
                <span class="stat-label">Duration</span>
                <span class="stat-value">{{ selectedVideo.avgDuration }}</span>
              </div>
            </div>
            <div class="modal-features">
              <span v-for="feature in selectedVideo.features" :key="feature" class="modal-feature-tag">
                {{ feature }}
              </span>
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
import { Video, Play, Pause, X } from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'

const softwareLevels = ref([])
const selectedVideo = ref(null)
const hoveredCard = ref(null)

const videoTypes = [
  {
    id: 1,
    name: 'PMV',
    description: 'Anime music videos with dynamic editing and effects',
    count: 25,
    avgDuration: '3-4 min',
    features: ['Motion Graphics', 'Color Grading', 'VFX', 'Sync Editing'],
    thumbnail: new URL('../assets/video-editing/pmv.gif', import.meta.url).href,
    gif: new URL('../assets/video-editing/pmv.gif', import.meta.url).href
  },
  {
    id: 2,
    name: 'Highlights Edit',
    description: 'Highlights edit with light and objects manipulation',
    count: 15,
    avgDuration: '1-2 min',
    features: ['Cinematic Look', 'Sound Design', 'Transitions', 'Storytelling'],
    thumbnail: new URL('../assets/video-editing/highlights-edit.gif', import.meta.url).href,
    gif: new URL('../assets/video-editing/highlights-edit.gif', import.meta.url).href
  },
  {
    id: 3,
    name: 'Film Projects',
    description: 'Short films and documentary productions',
    count: 5,
    avgDuration: '15-30 min',
    features: ['Documentary', 'Narrative', 'Interview', 'B-Roll'],
    thumbnail: new URL('../assets/video-editing/movie.gif', import.meta.url).href,
    gif: new URL('../assets/video-editing/movie.gif', import.meta.url).href
  },
  {
    id: 4,
    name: 'Motion Graphics',
    description: 'Animated graphics and visual effects',
    count: 20,
    avgDuration: '1-2 min',
    features: ['2D Animation', '3D Elements', 'Typography', 'Logo Animation'],
    thumbnail: new URL('../assets/video-editing/motion-graphic.gif', import.meta.url).href,
    gif: new URL('../assets/video-editing/motion-graphic.gif', import.meta.url).href
  }
]

const videoSoftware = [
  {
    name: 'After Effects',
    icon: 'Ae',
    color: '#9999ff',
    level: 95,
    levelText: 'Expert',
    description: 'Motion graphics and visual effects'
  },
  {
    name: 'Premiere Pro',
    icon: 'Pr',
    color: '#9999ff',
    level: 90,
    levelText: 'Expert',
    description: 'Video editing and post-production'
  },
  {
    name: 'DaVinci Resolve',
    icon: 'Dr',
    color: '#ff8a00',
    level: 30,
    levelText: 'Intermediate',
    description: 'Color grading and correction'
  },
  {
    name: 'Blender',
    icon: 'Bl',
    color: '#ff7f2a',
    level: 40,
    levelText: 'Intermediate',
    description: '3D modeling and animation'
  },
  {
    name: 'Canva',
    icon: 'Cv',
    color: '#2a7fff',
    level: 55,
    levelText: 'Intermediate',
    description: 'Presentation and image compositing'
  },
  {
    name: 'Photoshop',
    icon: 'Ps',
    color: '#31a8ff',
    level: 85,
    levelText: 'Advanced',
    description: 'Image editing and compositing'
  }
]

const getTrackLabel = (index) => {
  const labels = ['Video 1', 'Video 2', 'Audio 1', 'Audio 2', 'Music', 'SFX', 'Graphics', 'Text']
  return labels[index - 1] || `Track ${index}`
}

const getTrackClips = (trackIndex) => {
  const clipCounts = [3, 2, 4, 3, 1, 5, 2, 3]
  return clipCounts[trackIndex - 1] || 2
}

const getClipStyle = (trackIndex, clipIndex) => {
  const colors = [
    '#00ff88', '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
  ]
  
  const widths = ['15%', '25%', '10%', '20%', '30%']
  const leftPositions = ['5%', '25%', '45%', '65%', '80%']
  
  return {
    backgroundColor: colors[trackIndex - 1],
    width: widths[clipIndex - 1] || '15%',
    left: leftPositions[clipIndex - 1] || '0%'
  }
}

const onCardHover = (event) => {
  const card = event.currentTarget
  const videoId = parseInt(card.querySelector('.video-type-card')?.dataset?.id || 
                  videoTypes.find(v => card.textContent.includes(v.name))?.id)
  hoveredCard.value = videoId || null
  
  gsap.to(card, {
    duration: 0.3,
    y: -8,
    scale: 1.02,
    ease: 'power2.out'
  })
}

const onCardLeave = (event) => {
  hoveredCard.value = null
  const card = event.currentTarget
  
  gsap.to(card, {
    duration: 0.3,
    y: 0,
    scale: 1,
    ease: 'power2.out'
  })
}

const openVideoModal = (video) => {
  selectedVideo.value = video
  
  // Animate modal entrance
  gsap.fromTo('.video-modal', 
    { opacity: 0 },
    { duration: 0.3, opacity: 1, ease: 'power2.out' }
  )
  
  gsap.fromTo('.modal-content',
    { scale: 0.8, y: 50, opacity: 0 },
    { duration: 0.5, scale: 1, y: 0, opacity: 1, ease: 'back.out(1.7)', delay: 0.1 }
  )
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden'
}

const closeVideoModal = () => {
  gsap.to('.modal-content', {
    duration: 0.3,
    scale: 0.8,
    y: 50,
    opacity: 0,
    ease: 'power2.in'
  })
  
  gsap.to('.video-modal', {
    duration: 0.3,
    opacity: 0,
    ease: 'power2.in',
    delay: 0.1,
    onComplete: () => {
      selectedVideo.value = null
      document.body.style.overflow = 'auto'
    }
  })
}

onMounted(() => {
  // Animate glitch text
  gsap.fromTo('.glitch-text',
    { opacity: 0, scale: 0.9 },
    { duration: 1, opacity: 1, scale: 1, ease: 'elastic.out(1, 0.3)', delay: 0.4 }
  )
  
  // Animate video stats
  gsap.fromTo('.video-stat',
    { y: 30, opacity: 0 },
    { duration: 0.6, y: 0, opacity: 1, stagger: 0.2, ease: 'power2.out', delay: 0.6 }
  )
  
  // Animate video type cards
  gsap.fromTo('.video-type-card',
    { y: 30, opacity: 0 },
    { duration: 0.6, y: 0, opacity: 1, stagger: 0.15, ease: 'power2.out', delay: 0.8 }
  )
  
  // Animate software cards
  gsap.fromTo('.software-card',
    { y: 30, opacity: 0 },
    { duration: 0.6, y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', delay: 1 }
  )
  
  // Animate software levels
  gsap.fromTo(softwareLevels.value,
    { width: '0%' },
    { duration: 1, width: (i, el) => el.dataset.width, delay: 1.2, stagger: 0.1, ease: 'power2.out' }
  )
  
  // Animate timeline clips
  gsap.fromTo('.timeline-clip',
    { scaleX: 0, opacity: 0 },
    { duration: 0.8, scaleX: 1, opacity: 1, stagger: 0.05, ease: 'power2.out', delay: 1.4 }
  )
})
</script>

<style scoped>
.video-page {
  padding-top: 80px;
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-subtitle {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #00ff88;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Video Intro */
.video-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;
  align-items: center;
}

.video-intro-text {
  padding-right: 2rem;
}

.glitch-text {
  font-size: 3.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;
  position: relative;
  color: #00ff88;
  text-shadow: 2px 2px 10px rgba(0, 255, 136, 0.3);
  line-height: 1.1;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 #ff00ff;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: 2px 0 #00ffff;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0%, 100% { clip-path: inset(50% 0 30% 0); }
  20% { clip-path: inset(33% 0 33% 0); }
  40% { clip-path: inset(10% 0 60% 0); }
  60% { clip-path: inset(70% 0 20% 0); }
  80% { clip-path: inset(40% 0 40% 0); }
}

@keyframes glitch-anim-2 {
  0%, 100% { clip-path: inset(30% 0 50% 0); }
  20% { clip-path: inset(60% 0 10% 0); }
  40% { clip-path: inset(20% 0 70% 0); }
  60% { clip-path: inset(40% 0 40% 0); }
  80% { clip-path: inset(33% 0 33% 0); }
}

.intro-description {
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.video-stats {
  display: flex;
  gap: 2rem;
}

.video-stat {
  text-align: center;
}

.video-stat .stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.5rem;
}

.video-stat .stat-label {
  font-size: 0.9rem;
  opacity: 0.7;
  letter-spacing: 1px;
}

.video-reel-preview {
  position: relative;
}

.reel-frame {
  aspect-ratio: 16/9;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1));
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.reel-frame:hover {
  transform: scale(1.02);
}

.play-button {
  width: 80px;
  height: 80px;
  background: rgba(0, 255, 136, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.reel-frame:hover .play-button {
  background: rgba(0, 255, 136, 0.3);
  transform: scale(1.1);
}

.reel-play-icon {
  width: 30px;
  height: 30px;
  color: #00ff88;
  margin-left: 3px;
}

.reel-text {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.reel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 136, 0.1) 50%, transparent 70%);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

/* Video Categories */
.video-categories {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4rem;
}

.video-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.video-type-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.video-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.thumbnail-static,
.thumbnail-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
}

.thumbnail-static {
  opacity: 1;
}

.thumbnail-static.hidden {
  opacity: 0;
}

.thumbnail-gif {
  opacity: 0;
}

.thumbnail-gif.visible {
  opacity: 1;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-type-card:hover .play-overlay {
  opacity: 1;
}

.play-icon {
  width: 40px;
  height: 40px;
  color: #00ff88;
}

.video-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 255, 136, 0.9);
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.video-info {
  padding: 1.5rem;
}

.video-type-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: #00ff88;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.video-description {
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.video-stats-mini {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0.7;
}

.video-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Video Modal */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

.modal-content {
  position: relative;
  background: rgba(26, 26, 26, 0.95);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
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

.modal-video-container {
  padding: 2rem;
}

.modal-video {
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-bottom: 2rem;
}

.modal-info {
  text-align: center;
}

.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-description {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.modal-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
}

.modal-stat {
  text-align: center;
}

.modal-stat .stat-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-stat .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff88;
}

.modal-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.modal-feature-tag {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Software Expertise */
.software-expertise {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4rem;
}

.software-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.software-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.software-card:hover {
  transform: translateY(-3px);
}

.software-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
  flex-shrink: 0;
}

.software-info {
  flex: 1;
}

.software-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.software-description {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 0.8rem;
}

.software-level {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.level-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.level-fill {
  height: 100%;
  border-radius: 3px;
  width: 0%;
}

.level-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #00ff88;
  min-width: 80px;
}

/* Video Editor Mockup */
.video-editor-mockup {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4rem;
}

.editor-interface {
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-section {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timeline-title {
  font-weight: 600;
  color: #00ff88;
}

.timeline-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-btn {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 5px;
  padding: 0.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(0, 255, 136, 0.2);
}

.control-icon {
  width: 16px;
  height: 16px;
  color: #00ff88;
}

.timecode {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  color: #00ff88;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline-track {
  display: flex;
  align-items: center;
  height: 40px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 5px;
}

.track-label {
  width: 80px;
  padding: 0 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.track-content {
  flex: 1;
  position: relative;
  height: 100%;
}

.timeline-clip {
  position: absolute;
  height: 80%;
  top: 10%;
  border-radius: 3px;
  opacity: 0.8;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-origin: left;
}

.preview-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  padding: 1.5rem;
}

.preview-window {
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.preview-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0.8;
}

.preview-text {
  position: relative;
  z-index: 2;
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 3px;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-window:hover .preview-overlay {
  opacity: 1;
}

.preview-play-icon {
  width: 50px;
  height: 50px;
  color: #00ff88;
}

.preview-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 150px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.control-label {
  font-size: 0.8rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.control-value {
  font-weight: 600;
  color: #00ff88;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .video-intro {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .video-intro-text {
    padding-right: 0;
  }
  
  .glitch-text {
    font-size: 2.5rem;
  }
  
  .video-stats {
    justify-content: center;
  }
  
  .modal-stats {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .video-types {
    grid-template-columns: 1fr;
  }
  
  .software-grid {
    grid-template-columns: 1fr;
  }
  
  .preview-section {
    grid-template-columns: 1fr;
  }
  
  .timeline-controls {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: 95vh;
  }
  
  .modal-video-container {
    padding: 1rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .modal-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .video-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-features {
    gap: 0.5rem;
  }
  
  .modal-feature-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>