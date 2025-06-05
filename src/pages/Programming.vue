<template>
  <div class="programming-page">
    <PageHeader 
      title="PROGRAMMING"
      :icon="Code"
      description="Full-stack development with modern technologies"
    />

    <div class="container">
      <!-- Enhanced Language Statistics -->
      <section ref="statsSection" class="programming-stats">
        <div class="stats-header">
          <h2 ref="statsTitle" class="section-subtitle">
            <span class="title-accent">LANGUAGE</span>
            <span class="title-main">PROFICIENCY</span>
          </h2>
          <div ref="statsSubtext" class="stats-description">
            Expertise levels based on years of experience and project complexity
          </div>
        </div>

        <div class="stats-container">
          <!-- Language Proficiency Chart -->
          <div ref="proficiencyChart" class="proficiency-chart">
            <div class="chart-header">
              <h3 class="chart-title">Skill Distribution</h3>
              <div class="chart-legend">
                <div class="legend-item">
                  <div class="legend-color expert"></div>
                  <span>Expert (90%+)</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color advanced"></div>
                  <span>Advanced (80-89%)</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color intermediate"></div>
                  <span>Intermediate (70-79%)</span>
                </div>
              </div>
            </div>

            <div class="languages-grid">
              <div 
                v-for="(lang, index) in programmingStats" 
                :key="lang.name" 
                ref="languageCards"
                class="language-card"
                :class="getSkillLevel(lang.percentage)"
                @mouseenter="onLanguageHover"
                @mouseleave="onLanguageLeave"
              >
                <div class="language-header">
                  <div class="language-icon" :style="{ backgroundColor: lang.color }">
                    <component :is="lang.icon" v-if="lang.icon" class="tech-icon" />
                    <span v-else class="language-initial">{{ lang.name.charAt(0) }}</span>
                  </div>
                  <div class="language-info">
                    <h4 class="language-name">{{ lang.name }}</h4>
                    <span class="language-category">{{ lang.category }}</span>
                  </div>
                  <div class="language-percentage">
                    <span ref="percentageNumbers" class="percentage-number" :data-target="lang.percentage">0</span>
                    <span class="percentage-symbol">%</span>
                  </div>
                </div>

                <div class="progress-container">
                  <div class="progress-track">
                    <div 
                      ref="progressBars"
                      class="progress-fill"
                      :data-width="lang.percentage + '%'"
                      :style="{ backgroundColor: lang.color }"
                    ></div>
                    <div class="progress-glow" :style="{ backgroundColor: lang.color }"></div>
                  </div>
                  <div class="skill-indicators">
                    <div 
                      v-for="i in 5" 
                      :key="i"
                      class="skill-dot"
                      :class="{ active: (lang.percentage / 20) >= i }"
                    ></div>
                  </div>
                </div>

                <div class="language-details">
                  <div class="experience-years">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">{{ lang.years }} years</span>
                  </div>
                  <div class="project-count">
                    <span class="detail-label">Projects:</span>
                    <span class="detail-value">{{ lang.projects }}+</span>
                  </div>
                </div>

                <div class="language-overlay">
                  <div class="overlay-content">
                    <p class="overlay-description">{{ lang.description }}</p>
                    <div class="overlay-tags">
                      <span v-for="tag in lang.tags" :key="tag" class="overlay-tag">
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack Carousel -->
      <section class="tech-stack-carousel">
        <h2 class="section-subtitle">TECH STACK</h2>
        <div class="carousel-container">
          <!-- Row 1 - Moving Right -->
          <div class="carousel">
            <div class="track track-right" ref="trackRight1">
              <div v-for="(tech, index) in [...techStackRow1, ...techStackRow1, ...techStackRow1]" :key="`row1-${index}`" class="tech-tag-carousel">
                <component :is="getTechIcon(tech)" class="tech-chip-icon" />
                <span>{{ tech }}</span>
              </div>
            </div>
            <!-- Fade overlays -->
            <div class="carousel-fade-left"></div>
            <div class="carousel-fade-right"></div>
          </div>
          
          <!-- Row 2 - Moving Left -->
          <div class="carousel">
            <div class="track track-left" ref="trackLeft">
              <div v-for="(tech, index) in [...techStackRow2, ...techStackRow2, ...techStackRow2]" :key="`row2-${index}`" class="tech-tag-carousel">
                <component :is="getTechIcon(tech)" class="tech-chip-icon" />
                <span>{{ tech }}</span>
              </div>
            </div>
            <!-- Fade overlays -->
            <div class="carousel-fade-left"></div>
            <div class="carousel-fade-right"></div>
          </div>
          
          <!-- Row 3 - Moving Right -->
          <div class="carousel">
            <div class="track track-right" ref="trackRight2">
              <div v-for="(tech, index) in [...techStackRow3, ...techStackRow3, ...techStackRow3]" :key="`row3-${index}`" class="tech-tag-carousel">
                <component :is="getTechIcon(tech)" class="tech-chip-icon" />
                <span>{{ tech }}</span>
              </div>
            </div>
            <!-- Fade overlays -->
            <div class="carousel-fade-left"></div>
            <div class="carousel-fade-right"></div>
          </div>
        </div>
      </section>

      <!-- Projects Showcase -->
      <section class="projects-showcase">
        <h2 class="section-subtitle">FEATURED PROJECTS</h2>
        <div class="projects-grid">
          <div v-for="project in projects" :key="project.id" class="project-card" @click="openModal(project)">
            <div class="project-image">
              <img :src="project.image" :alt="project.name" class="project-img" />
              <div class="project-overlay">
                <ExternalLink class="overlay-icon" />
              </div>
            </div>
            <div class="project-info">
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Project Modal -->
    <div v-if="selectedProject" class="project-modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <div class="modal-image">
          <img :src="selectedProject.image" :alt="selectedProject.name" />
        </div>
        <h2>{{ selectedProject.name }}</h2>
        <p>{{ selectedProject.description }}</p>
        <h3>Technologies Used:</h3>
        <div class="tech-stack">
          <span v-for="tech in selectedProject.tech" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
        <a href="#" class="view-project-button">View Project</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Code, 
  ExternalLink, 
  Database, 
  Server, 
  Globe, 
  Smartphone, 
  GitBranch, 
  Container, 
  Cloud, 
  Flame,
  Layers,
  FileCode,
  Palette,
  Zap,
  Settings,
  Box
} from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'

gsap.registerPlugin(ScrollTrigger)

// Refs
const statsSection = ref(null)
const statsTitle = ref(null)
const statsSubtext = ref(null)
const proficiencyChart = ref(null)
const languageCards = ref([])
const progressBars = ref([])
const percentageNumbers = ref([])
const track = ref(null)
const selectedProject = ref(null)

// New refs for the three carousel tracks
const trackRight1 = ref(null)
const trackLeft = ref(null)
const trackRight2 = ref(null)

// Tech icon mapping
const techIconMap = {
  'JavaScript': Code,
  'TypeScript': FileCode,
  'Vue.js': Layers,
  'React': Zap,
  'Node.js': Server,
  'Express': Server,
  'MongoDB': Database,
  'PostgreSQL': Database,
  'Python': Code,
  'PHP': Globe,
  'HTML': Globe,
  'CSS': Palette,
  'Git': GitBranch,
  'Docker': Container,
  'AWS': Cloud,
  'Firebase': Flame,
  'Laravel': Settings,
  'Nuxt.js': Box
}

// Method to get tech icon
const getTechIcon = (techName) => {
  return techIconMap[techName] || Code
}

const programmingStats = [
  { 
    name: 'JavaScript/TypeScript', 
    percentage: 85, 
    color: '#f7df1e',
    category: 'Frontend/Backend',
    years: 3,
    projects: 10,
    description: 'Primary language for full-stack development with modern frameworks and libraries.',
    tags: ['ES6+', 'Async/Await', 'TypeScript', 'Node.js']
  },
  { 
    name: 'Vue.js', 
    percentage: 80, 
    color: '#4fc08d',
    category: 'Frontend Framework',
    years: 3,
    projects: 25,
    description: 'Preferred frontend framework for building reactive and component-based applications.',
    tags: ['Composition API', 'Vuex', 'Vue Router', 'Nuxt.js']
  },
  { 
    name: 'React', 
    percentage: 65, 
    color: '#61dafb',
    category: 'Frontend Framework',
    years: 3,
    projects: 20,
    description: 'Extensive experience in building scalable React applications with modern patterns.',
    tags: ['Hooks', 'Redux', 'Next.js', 'React Native']
  },
  { 
    name: 'Node.js', 
    percentage: 88, 
    color: '#339933',
    category: 'Backend Runtime',
    years: 3,
    projects: 15,
    description: 'Server-side JavaScript development with Express, APIs, and microservices.',
    tags: ['Express.js', 'REST APIs', 'GraphQL', 'Microservices']
  },
  { 
    name: 'Python', 
    percentage: 40, 
    color: '#3776ab',
    category: 'Backend/Data Science',
    years: 2,
    projects: 3,
    description: 'Backend development, automation scripts, and data analysis projects.',
    tags: ['Django', 'Flask', 'Pandas', 'Automation']
  },
  { 
    name: 'PHP', 
    percentage: 84, 
    color: '#777bb4',
    category: 'Backend Language',
    years: 3,
    projects: 20,
    description: 'Web development with modern PHP frameworks and content management systems.',
    tags: ['Laravel', 'Lumen', 'WordPress', 'Composer']
  },
  { 
    name: 'MySQL/PostgreSQL', 
    percentage: 82, 
    color: '#336791',
    category: 'Database',
    years: 3,
    projects: 35,
    description: 'Database design, optimization, and complex query development.',
    tags: ['Query Optimization', 'Database Design', 'Migrations', 'Indexing']
  },
  { 
    name: 'MongoDB', 
    percentage: 62, 
    color: '#47a248',
    category: 'NoSQL Database',
    years: 2,
    projects: 5,
    description: 'NoSQL database development with aggregation pipelines and schema design.',
    tags: ['Aggregation', 'Mongoose', 'Atlas', 'Indexing']
  }
]

// Split tech stack into three rows
const techStackRow1 = ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Express']
const techStackRow2 = ['MongoDB', 'PostgreSQL', 'Python', 'PHP', 'HTML', 'CSS']
const techStackRow3 = ['Git', 'Docker', 'AWS', 'Firebase', 'Laravel', 'Nuxt.js']

// Original tech stack array (keep for compatibility)
const techStack = [
  'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Python', 'PHP', 'HTML', 'CSS', 'Git', 'Docker', 'AWS', 'Firebase'
]

const projects = [
  {
    id: 1,
    name: 'Weather Gaul App',
    description: 'Weather forecasts with map integration',
    tech: ['React', 'Leaflet'],
    image: new URL('../assets/programming/weather-gaul-app.png', import.meta.url).href
  },
  {
    id: 2,
    name: 'Late Recapitulation',
    description: "Student's presence manager with VueJS and Laravel",
    tech: ['Vue', 'Laravel', 'Vuetify', 'MySQL'],
    image: new URL('../assets/programming/late-recapitulation.png', import.meta.url).href
  },
  {
    id: 3,
    name: 'Ticketing App',
    description: 'Booking simulation mobile application',
    tech: ['Flutter', 'Firebase'],
    image: new URL('../assets/programming/ticketing-app.png', import.meta.url).href
  },
  {
    id: 4,
    name: 'Makan Cuy',
    description: 'An award-winning LKS project that won first place, a food E-Commerce web application',
    tech: ['Vue', 'Vuetify', 'Lumen', 'MySQL'],
    image: new URL('../assets/programming/makan-cuy.png', import.meta.url).href
  },
  {
    id: 5,
    name: 'Football Gaul',
    description: '2D football game I made with Javascript',
    tech: ['Native Javascript'],
    image: new URL('../assets/programming/football-wow.png', import.meta.url).href
  }
]

// Methods
const getSkillLevel = (percentage) => {
  if (percentage >= 90) return 'expert'
  if (percentage >= 80) return 'advanced'
  return 'intermediate'
}

const onLanguageHover = (event) => {
  const card = event.currentTarget
  const overlay = card.querySelector('.language-overlay')
  
  gsap.to(card, {
    duration: 0.3,
    y: -8,
    scale: 1.02,
    ease: 'power2.out'
  })
  
  gsap.to(overlay, {
    duration: 0.3,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
  })
}

const onLanguageLeave = (event) => {
  const card = event.currentTarget
  const overlay = card.querySelector('.language-overlay')
  
  gsap.to(card, {
    duration: 0.3,
    y: 0,
    scale: 1,
    ease: 'power2.out'
  })
  
  gsap.to(overlay, {
    duration: 0.3,
    opacity: 0,
    y: 10,
    ease: 'power2.out'
  })
}

const animateCounter = (element, target) => {
  gsap.to({ value: 0 }, {
    duration: 2,
    value: target,
    ease: 'power2.out',
    onUpdate: function() {
      element.textContent = Math.round(this.targets()[0].value)
    }
  })
}

const openModal = (project) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}

onMounted(async () => {
  await nextTick()

  // Title animation with split text effect
  const titleChars = gsap.utils.toArray(statsTitle.value.children)
  gsap.fromTo(titleChars,
    { 
      y: 100,
      opacity: 0,
      rotationX: -90
    },
    { 
      duration: 0.8,
      y: 0,
      opacity: 1,
      rotationX: 0,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: statsSection.value,
        start: 'top 80%'
      }
    }
  )

  // Subtitle animation
  gsap.fromTo(statsSubtext.value,
    { y: 30, opacity: 0 },
    { 
      duration: 0.6,
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      delay: 0.5,
      scrollTrigger: {
        trigger: statsSection.value,
        start: 'top 80%'
      }
    }
  )

  // Language cards animation
  gsap.fromTo(languageCards.value,
    { y: 60, opacity: 0, rotationY: -15 },
    { 
      duration: 0.8,
      y: 0,
      opacity: 1,
      rotationY: 0,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.8,
      scrollTrigger: {
        trigger: proficiencyChart.value,
        start: 'top 80%'
      }
    }
  )

  // Progress bars animation
  progressBars.value.forEach((bar, index) => {
    gsap.fromTo(bar,
      { width: '0%' },
      { 
        duration: 1.5,
        width: bar.dataset.width,
        ease: 'power2.out',
        delay: 1.2 + (index * 0.1),
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%'
        },
        onStart: () => {
          // Also animate the glow element
          gsap.to(bar.nextElementSibling, {
            width: bar.dataset.width,
            duration: 1.5,
            ease: 'power2.out'
          })
        }
      }
    )
  })

  // Counter animations
  percentageNumbers.value.forEach((el, index) => {
    const target = parseInt(el.dataset.target)
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        setTimeout(() => {
          animateCounter(el, target)
        }, 1200 + (index * 100))
      }
    })
  })

  // Project cards animation
  gsap.fromTo('.project-card',
    { y: 30, opacity: 0 },
    { 
      duration: 0.6, 
      y: 0, 
      opacity: 1, 
      stagger: 0.15, 
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects-showcase',
        start: 'top 80%'
      }
    }
  )

  // Improved infinite carousel animations with portal effect
  // Row 1 - Moving Right (portal effect)
  if (trackRight1.value) {
    const totalWidth = trackRight1.value.scrollWidth / 3 // Divide by 3 because we tripled the content
    
    gsap.set(trackRight1.value, { x: 0 })
    gsap.to(trackRight1.value, {
      x: -totalWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    })
  }

  // Row 2 - Moving Left (portal effect)
  if (trackLeft.value) {
    const totalWidth = trackLeft.value.scrollWidth / 3 // Divide by 3 because we tripled the content
    
    gsap.set(trackLeft.value, { x: -totalWidth })
    gsap.to(trackLeft.value, {
      x: 0,
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    })
  }

  // Row 3 - Moving Right (portal effect)
  if (trackRight2.value) {
    const totalWidth = trackRight2.value.scrollWidth / 3 // Divide by 3 because we tripled the content
    
    gsap.set(trackRight2.value, { x: 0 })
    gsap.to(trackRight2.value, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    })
  }
})
</script>

<style scoped>
.programming-page {
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
}

/* Enhanced Programming Stats */
.programming-stats {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 212, 255, 0.05) 100%);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4rem;
  backdrop-filter: blur(10px);
}

.stats-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.title-accent {
  color: #00ff88;
  display: inline-block;
  margin-right: 1rem;
}

.title-main {
  color: #ffffff;
  display: inline-block;
}

.stats-description {
  font-size: 1.1rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.stats-container {
  display: grid;
  gap: 3rem;
}

/* Proficiency Chart */
.proficiency-chart {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff88;
}

.chart-legend {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-color.expert {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
}

.legend-color.advanced {
  background: linear-gradient(45deg, #ffd700, #ff8c00);
}

.legend-color.intermediate {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
}

/* Languages Grid */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.language-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.language-card.expert {
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.1);
}

.language-card.advanced {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
}

.language-card.intermediate {
  border-color: rgba(255, 107, 107, 0.3);
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.1);
}

.language-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.language-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.tech-icon {
  width: 24px;
  height: 24px;
  color: #000;
}

.language-initial {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
}

.language-info {
  flex: 1;
}

.language-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.language-category {
  font-size: 0.8rem;
  opacity: 0.7;
  color: #00ff88;
}

.language-percentage {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.percentage-number {
  font-size: 2rem;
  font-weight: 700;
  color: #00ff88;
}

.percentage-symbol {
  font-size: 1.2rem;
  font-weight: 600;
  color: #00ff88;
  opacity: 0.8;
}

/* Progress Container */
.progress-container {
  margin-bottom: 1rem;
}

.progress-track {
  position: relative;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
  width: 0%;
  position: relative;
  transition: all 0.3s ease;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.progress-glow {
  position: absolute;
  top: -2px;
  left: 0;
  height: 12px;
  width: 0%;
  border-radius: 6px;
  opacity: 0.5;
  filter: blur(4px);
  transition: width 1.5s ease;
}

.skill-indicators {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
}

.skill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.skill-dot.active {
  background: #00ff88;
  box-shadow: 0 0 8px rgba(0, 255, 136, 0.5);
}

/* Language Details */
.language-details {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.detail-label {
  opacity: 0.7;
  margin-right: 0.5rem;
}

.detail-value {
  color: #00ff88;
  font-weight: 600;
}

/* Language Overlay */
.language-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8));
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-content {
  text-align: center;
}

.overlay-description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.overlay-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.overlay-tag {
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.4);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Tech Stack Carousel */
.tech-stack-carousel {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
}

/* New carousel container for multiple rows */
.carousel-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.carousel {
  overflow: hidden;
  border-radius: 10px;
  position: relative;
}

/* Fade overlays for smooth edges */
.carousel-fade-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(to right, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.8), transparent);
  z-index: 10;
  pointer-events: none;
}

.carousel-fade-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(to left, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.8), transparent);
  z-index: 10;
  pointer-events: none;
}

/* Infinite carousel improvements with portal effect */
.track {
  display: flex;
  width: fit-content;
  will-change: transform;
}

.tech-tag-carousel {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 1rem;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.tech-chip-icon {
  width: 18px;
  height: 18px;
  color: #00ff88;
  flex-shrink: 0;
}

.tech-tag-carousel:hover {
  background: rgba(0, 255, 136, 0.2);
  border-color: rgba(0, 255, 136, 0.5);
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
}

.tech-tag-carousel:hover .tech-chip-icon {
  color: #ffffff;
}

/* Pause animation on hover */
.carousel:hover .track {
  animation-play-state: paused;
}

/* Projects Showcase */
.projects-showcase {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.overlay-icon {
  width: 30px;
  height: 30px;
  color: #00ff88;
}

.project-info {
  padding: 1.5rem;
}

.project-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.project-description {
  opacity: 0.8;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Project Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 15px;
  width: 80%;
  max-width: 700px;
  position: relative;
}

.modal-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
  color: #fff;
  z-index: 10;
}

.modal-content h2 {
  color: #00ff88;
  margin-bottom: 1rem;
}

.modal-content p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.modal-content h3 {
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.view-project-button {
  display: inline-block;
  background: #00ff88;
  color: #1a1a1a;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.view-project-button:hover {
  background: #00cc66;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .chart-legend {
    justify-content: center;
    width: 100%;
  }
  
  .languages-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .carousel-fade-left,
  .carousel-fade-right {
    width: 60px;
  }
}

@media (max-width: 768px) {
  .programming-stats {
    padding: 2rem 1rem;
  }
  
  .languages-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .language-header {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .language-percentage {
    order: -1;
    width: 100%;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .tech-tag-carousel {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    min-width: 100px;
    margin: 0.5rem 0.8rem;
  }

  .carousel-fade-left,
  .carousel-fade-right {
    width: 40px;
  }
}

@media (max-width: 480px) {
  .programming-stats {
    padding: 1.5rem 1rem;
  }
  
  .chart-legend {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .language-card {
    padding: 1rem;
  }
  
  .language-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .tech-tag-carousel {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
    min-width: 80px;
    margin: 0.5rem 0.6rem;
  }

  .carousel-fade-left,
  .carousel-fade-right {
    width: 30px;
  }

  .tech-chip-icon {
    width: 16px;
    height: 16px;
  }
}
</style>