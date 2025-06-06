<template>
  <!-- Add a class to the root element that we can use to control cursor styles -->
  <div class="home-page" :class="{ 'is-mobile': isMobileDevice }">
    <!-- Hero Section -->
    <section ref="heroSection" class="hero">
      <div class="hero-bg">
        <div class="grid-overlay"></div>
        <div class="floating-elements">
          <div v-for="i in 20" :key="i" class="floating-dot" :style="getRandomPosition()"></div>
        </div>
        <div class="morphing-shapes">
          <div v-for="i in 5" :key="i" class="morphing-shape" :style="getShapeStyle(i)"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-left">
          <div ref="heroTitle" class="hero-title">
            <div class="title-line">BANYU</div>
            <div class="title-line">BAGASTARA</div>
            <div class="title-line accent">NUGROHO</div>
          </div>
          <p ref="heroSubtitle" class="hero-subtitle">
            Programmer • Music Composer • Video Editor • Motion Graphic Artist
          </p>
          <div class="hero-description">
            <p>Crafting digital experiences through code, visuals, and sound</p>
          </div>
          
          <div ref="heroStats" class="hero-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat-item">
              <span ref="statNumbers" class="stat-number" :data-target="stat.value">0</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        
        <div class="hero-right">
          <h2 class="section-title">
            <span class="title-bg">EXPERTISE</span>
            WHAT I DO
          </h2>
          
          <div ref="categoryCards" class="categories-grid">
            <router-link 
              v-for="category in categories" 
              :key="category.id"
              :to="category.path"
              class="category-card"
              :class="{ 'coming-soon': category.comingSoon }"
              @mouseenter="onCardHover"
              @mouseleave="onCardLeave"
            >
              <div class="card-bg"></div>
              <div class="card-content">
                <div class="card-header">
                  <div class="card-icon-wrapper">
                    <component :is="category.icon" class="card-icon-svg" />
                  </div>
                  <h3 class="card-title">
                    {{ category.name }}
                    <span v-if="category.comingSoon" class="coming-soon-badge">COMING SOON</span>
                  </h3>
                </div>
                <p class="card-description">{{ category.description }}</p>
                <div class="card-tech">
                  <span v-for="tech in category.technologies" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
              <div class="card-overlay"></div>
            </router-link>
          </div>
        </div>
      </div>

      <div ref="scrollIndicator" class="scroll-indicator">
        <div class="scroll-line"></div>
        <span class="scroll-text">SCROLL</span>
      </div>
    </section>

    <!-- About Section with Enhanced 3D -->
    <section ref="aboutSection" class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 ref="aboutTitle" class="section-title">
              <span class="title-bg">ABOUT</span>
              WHO I AM
            </h2>
            <div ref="aboutDescription" class="about-description">
              <p>
                I'm a passionate creator who bridges the gap between technology and artistry. 
                With over 4 years of experience in full-stack development, video editing, and music production, 
                I bring a unique perspective to every project.
              </p>
              <p>
                My journey started with curiosity about how things work, which led me to programming. 
                Along the way, I discovered my love for visual storytelling and audio composition, 
                creating a perfect blend of technical expertise and creative vision.
              </p>
            </div>
          </div>
          <div ref="aboutVisual" class="about-visual">
            <div class="skill-orbit-container">
              <div class="skill-orbit">
                <div class="orbit-center">
                  <span class="center-text">SKILLS</span>
                </div>
                <div v-for="(skill, index) in orbitSkills" :key="skill" 
                     class="orbit-item" 
                     :style="getOrbitPosition(index, orbitSkills.length)"
                     @mouseenter="onOrbitItemHover"
                     @mouseleave="onOrbitItemLeave">
                  <span class="skill-text">{{ skill }}</span>
                  <div class="orbit-glow"></div>
                </div>
              </div>
              <!-- 3D Floating Elements -->
              <div class="floating-3d-elements">
                <div v-for="i in 8" :key="i" class="floating-3d-dot" :style="get3DPosition(i)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Showcase -->
    <section ref="skillsSection" class="skills-section">
      <div class="container">
        <h2 ref="skillsTitle" class="section-title">
          <span class="title-bg">SKILLS</span>
          TECHNICAL EXPERTISE
        </h2>
        <div class="skills-grid">
          <div v-for="skillCategory in skillCategories" :key="skillCategory.name" 
               ref="skillCards"
               class="skill-category">
            <div class="skill-category-header">
              <component :is="skillCategory.icon" class="skill-category-icon" />
              <h3 class="skill-category-name">{{ skillCategory.name }}</h3>
            </div>
            <div class="skill-items">
              <div v-for="skill in skillCategory.skills" :key="skill.name" class="skill-item">
                <span class="skill-name">{{ skill.name }}</span>
                <div class="skill-bar">
                  <div ref="skillBars" 
                       class="skill-progress" 
                       :data-width="skill.level + '%'"
                       :style="{ backgroundColor: skillCategory.color }"></div>
                </div>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements -->
    <section ref="achievementsSection" class="achievements-section">
      <div class="container">
        <h2 ref="achievementsTitle" class="section-title">
          <span class="title-bg">ACHIEVEMENTS</span>
          MILESTONES
        </h2>
        <div class="achievements-grid">
          <div v-for="achievement in achievements" :key="achievement.id" 
               ref="achievementCards"
               class="achievement-card"
               @mouseenter="onAchievementHover"
               @mouseleave="onAchievementLeave">
            <div class="achievement-icon">
              <component :is="achievement.icon" class="achievement-icon-svg" />
            </div>
            <div class="achievement-content">
              <h3 class="achievement-title">{{ achievement.title }}</h3>
              <p class="achievement-description">{{ achievement.description }}</p>
              <span class="achievement-year">{{ achievement.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeMount, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Code, Video, Music, Award, Palette, Database, 
  Globe, Zap, Trophy, Star, Target, Rocket
} from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

// Add reactive state for mobile detection
const isMobileDevice = ref(false)

// Refs
const heroSection = ref(null)
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroStats = ref(null)
const scrollIndicator = ref(null)
const categoryCards = ref(null)
const statNumbers = ref([])
const skillBars = ref([])

// Section refs
const aboutSection = ref(null)
const aboutTitle = ref(null)
const aboutDescription = ref(null)
const aboutVisual = ref(null)
const skillsSection = ref(null)
const skillsTitle = ref(null)
const skillCards = ref([])
const achievementsSection = ref(null)
const achievementsTitle = ref(null)
const achievementCards = ref([])

// Check if device is mobile
const isMobile = () => {
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Update mobile state and handle custom cursor
const checkMobileState = () => {
  isMobileDevice.value = isMobile()
  
  // If there's a custom cursor element, hide it on mobile
  const customCursor = document.querySelector('.custom-cursor')
  if (customCursor) {
    if (isMobileDevice.value) {
      customCursor.style.display = 'none'
    } else {
      customCursor.style.display = ''
    }
  }
}

// Fix mobile scroll issues
const fixMobileScroll = () => {
  if (isMobileDevice.value) {
    // Reset body and html scroll behavior
    document.body.style.overflow = 'auto'
    document.body.style.overflowX = 'hidden'
    document.body.style.height = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.documentElement.style.overflowX = 'hidden'
    document.documentElement.style.height = 'auto'
    
    // Force refresh of scroll
    window.scrollTo(0, window.scrollY)
  }
}

const stats = [
  { value: '150+', label: 'PROJECTS' },
  { value: '8+', label: 'YEARS' },
  { value: '40+', label: 'CLIENTS' }
]

const categories = [
  {
    id: 'programming',
    name: 'PROGRAMMING',
    description: 'Full-stack development with modern technologies',
    icon: Code,
    technologies: ['Vue.js', 'React', 'Node.js', 'Python', 'TypeScript'],
    comingSoon: false,
    path: '/programming'
  },
  {
    id: 'video',
    name: 'VIDEO EDITING',
    description: 'Cinematic storytelling through visual media',
    icon: Video,
    technologies: ['After Effects', 'Premiere Pro', 'DaVinci', 'Blender'],
    comingSoon: false,
    path: '/video-editing'
  },
  {
    id: 'music',
    name: 'MUSIC PRODUCTION',
    description: 'Creating immersive audio experiences',
    icon: Music,
    technologies: ['FL Studio', 'Sytrus', 'Serum', 'Kontakt'],
    comingSoon: false,
    path: '/music-production'
  },
  {
    id: 'certificates',
    name: 'CERTIFICATES',
    description: 'Professional certifications and achievements',
    icon: Award,
    technologies: ['AWS', 'Google Cloud', 'Microsoft', 'Adobe'],
    comingSoon: false,
    path: '/certificates'
  }
]

const orbitSkills = [
  'Vue.js', 'React', 'Node.js', 'Python', 'After Effects', 
  'Premiere Pro', 'Ableton Live', 'TypeScript'
]

const skillCategories = [
  {
    name: 'Frontend Development',
    icon: Globe,
    color: '#61dafb',
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'React', level: 85 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'GSAP', level: 82 }
    ]
  },
  {
    name: 'Backend Development',
    icon: Database,
    color: '#339933',
    skills: [
      { name: 'LUMEN', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Express', level: 75 },
      { name: 'PostgreSQL', level: 78 }
    ]
  },
  {
    name: 'Creative Tools',
    icon: Palette,
    color: '#9999ff',
    skills: [
      { name: 'After Effects', level: 90 },
      { name: 'Premiere Pro', level: 88 },
      { name: 'Photoshop', level: 85 },
      { name: 'FL Studio', level: 80 }
    ]
  },
  {
    name: 'DevOps & Tools',
    icon: Zap,
    color: '#ff6b6b',
    skills: [
      { name: 'Docker', level: 25 },
      { name: 'Git', level: 90 },
      { name: 'WSL', level: 70 },
      { name: 'SQLWorkBench', level: 65 }
    ]
  }
]

const achievements = [
  {
    id: 1,
    title: 'LKS National Champion',
    description: 'Proved skills on the national stage. Excellence through competition.',
    year: '2023',
    icon: Trophy
  },
  {
    id: 2,
    title: '10M+ Video Views',
    description: 'Cumulative views across all video editing projects and content',
    year: '2021',
    icon: Star
  },
  {
    id: 3,
    title: '100+ Projects Completed',
    description: 'Successfully delivered diverse projects across multiple domains',
    year: '2022',
    icon: Target
  },
  {
    id: 4,
    title: 'Certified Cool Guy',
    description: 'Certified in spreading good vibes',
    year: 'jk :/',
    icon: Rocket
  }
]

// Methods
const getRandomPosition = () => ({
  left: Math.random() * 100 + '%',
  top: Math.random() * 100 + '%',
  animationDelay: Math.random() * 2 + 's'
})

const getShapeStyle = (index) => {
  const shapes = [
    { left: '10%', top: '20%', size: '100px' },
    { left: '80%', top: '10%', size: '60px' },
    { left: '70%', top: '70%', size: '80px' },
    { left: '20%', top: '80%', size: '120px' },
    { left: '50%', top: '50%', size: '40px' }
  ]
  return {
    left: shapes[index - 1]?.left || '50%',
    top: shapes[index - 1]?.top || '50%',
    width: shapes[index - 1]?.size || '60px',
    height: shapes[index - 1]?.size || '60px',
    animationDelay: (index * 0.5) + 's'
  }
}

const getOrbitPosition = (index, total) => {
  const angle = (index / total) * 360
  const radius = 120
  const x = Math.cos(angle * Math.PI / 180) * radius
  const y = Math.sin(angle * Math.PI / 180) * radius
  return {
    transform: `translate(${x}px, ${y}px)`,
    animationDelay: (index * 0.2) + 's'
  }
}

const get3DPosition = (index) => {
  const positions = [
    { left: '10%', top: '15%', animationDelay: '0s' },
    { left: '85%', top: '25%', animationDelay: '0.5s' },
    { left: '15%', top: '75%', animationDelay: '1s' },
    { left: '80%', top: '80%', animationDelay: '1.5s' },
    { left: '50%', top: '10%', animationDelay: '2s' },
    { left: '90%', top: '50%', animationDelay: '2.5s' },
    { left: '5%', top: '45%', animationDelay: '3s' },
    { left: '60%', top: '90%', animationDelay: '3.5s' }
  ]
  return positions[index - 1] || { left: '50%', top: '50%', animationDelay: '0s' }
}

const onCardHover = (event) => {
  if (isMobileDevice.value) return // Disable hover effects on mobile
  
  const card = event.currentTarget
  const overlay = card.querySelector('.card-overlay')
  const iconWrapper = card.querySelector('.card-icon-wrapper')
  const techTags = card.querySelectorAll('.tech-tag')
  
  if (!card.classList.contains('coming-soon')) {
    gsap.to(card, {
      duration: 0.15,
      y: -10,
      scale: 1.02,
      rotationY: 5,
      ease: 'power2.out'
    })
    
    gsap.to(overlay, {
      duration: 0.15,
      opacity: 1,
      ease: 'power2.out'
    })

    gsap.to(iconWrapper, {
      duration: 0.15,
      scale: 1.1,
      rotationY: 10,
      ease: 'power2.out'
    })

    gsap.to(techTags, {
      duration: 0.15,
      y: -2,
      stagger: 0.02,
      ease: 'power2.out'
    })
  }
}

const onCardLeave = (event) => {
  if (isMobileDevice.value) return // Disable hover effects on mobile
  
  const card = event.currentTarget
  const overlay = card.querySelector('.card-overlay')
  const iconWrapper = card.querySelector('.card-icon-wrapper')
  const techTags = card.querySelectorAll('.tech-tag')
  
  gsap.to(card, {
    duration: 0.15,
    y: 0,
    scale: 1,
    rotationY: 0,
    ease: 'power2.out'
  })
  
  gsap.to(overlay, {
    duration: 0.15,
    opacity: 0,
    ease: 'power2.out'
  })

  gsap.to(iconWrapper, {
    duration: 0.15,
    scale: 1,
    rotationY: 0,
    ease: 'power2.out'
  })

  gsap.to(techTags, {
    duration: 0.15,
    y: 0,
    ease: 'power2.out'
  })
}

const onOrbitItemHover = (event) => {
  if (isMobileDevice.value) return // Disable hover effects on mobile
  
  const item = event.currentTarget
  gsap.to(item, {
    duration: 0.15,
    scale: 1.3,
    z: 50,
    rotationY: 15,
    ease: 'power2.out'
  })
}

const onOrbitItemLeave = (event) => {
  if (isMobileDevice.value) return // Disable hover effects on mobile
  
  const item = event.currentTarget
  gsap.to(item, {
    duration: 0.15,
    scale: 1,
    z: 0,
    rotationY: 0,
    ease: 'power2.out'
  })
}

const onAchievementHover = (event) => {
  if (isMobileDevice.value) return // Disable hover effects on mobile
  
  const card = event.currentTarget
  const icon = card.querySelector('.achievement-icon')
  
  gsap.to(card, {
    duration: 0.15,
    y: -15,
    rotationY: 8,
    scale: 1.02,
    ease: 'power2.out'
  })

  gsap.to(icon, {
    duration: 0.15,
    scale: 1.15,
    rotationY: 20,
    ease: 'power2.out'
  })
}

const onAchievementLeave = (event) => {
  if (isMobileDevice.value) return // Disable hover effects on mobile
  
  const card = event.currentTarget
  const icon = card.querySelector('.achievement-icon')
  
  gsap.to(card, {
    duration: 0.15,
    y: 0,
    rotationY: 0,
    scale: 1,
    ease: 'power2.out'
  })

  gsap.to(icon, {
    duration: 0.15,
    scale: 1,
    rotationY: 0,
    ease: 'power2.out'
  })
}

const animateCounter = (element, target) => {
  const isInfinity = target === '∞'
  if (isInfinity) {
    element.textContent = '∞'
    return
  }
  
  const numTarget = parseInt(target)
  gsap.to({ value: 0 }, {
    duration: 2,
    value: numTarget,
    ease: 'power2.out',
    onUpdate: function() {
      element.textContent = Math.round(this.targets()[0].value) + (target.includes('+') ? '+' : '')
    }
  })
}

onBeforeMount(() => {
  // Check mobile state before mounting
  if (typeof window !== 'undefined') {
    checkMobileState()
  }
})

onMounted(async () => {
  await nextTick()
  
  // Check mobile state again after mounting
  checkMobileState()
  
  // Fix mobile scroll issues
  fixMobileScroll()
  
  // Add resize listener to update mobile state
  window.addEventListener('resize', () => {
    checkMobileState()
    fixMobileScroll()
  })
  
  // Add orientation change listener for mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      checkMobileState()
      fixMobileScroll()
    }, 500)
  })

  // Configure ScrollTrigger for both desktop and mobile
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true
  })

  // Hero animations (works on both desktop and mobile)
  const heroTl = gsap.timeline()
  
  heroTl.fromTo(heroTitle.value.children,
    { y: isMobileDevice.value ? 50 : 100, opacity: 0, rotationX: isMobileDevice.value ? 0 : -15 },
    { duration: 0.8, y: 0, opacity: 1, rotationX: 0, stagger: 0.1, ease: 'power3.out' }
  )
  .fromTo(heroSubtitle.value,
    { y: isMobileDevice.value ? 30 : 50, opacity: 0 },
    { duration: 0.6, y: 0, opacity: 1, ease: 'power2.out' },
    '-=0.6'
  )
  .fromTo('.hero-description',
    { y: isMobileDevice.value ? 20 : 30, opacity: 0 },
    { duration: 0.5, y: 0, opacity: 1, ease: 'power2.out' },
    '-=0.4'
  )
  .fromTo(heroStats.value.children,
    { y: isMobileDevice.value ? 20 : 30, opacity: 0 },
    { duration: 0.5, y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
    '-=0.4'
  )
  .fromTo(scrollIndicator.value,
    { opacity: 0 },
    { duration: 0.3, opacity: 1, ease: 'power2.out' },
    '-=0.3'
  )
  .fromTo(categoryCards.value.children,
    { y: isMobileDevice.value ? 30 : 50, opacity: 0, rotationY: isMobileDevice.value ? 0 : -10 },
    { duration: 0.6, y: 0, opacity: 1, rotationY: 0, stagger: 0.1, ease: 'power2.out' },
    '-=0.5'
  )

  // Background animations (lighter on mobile)
  if (isMobileDevice.value) {
    // Lighter mobile animations with better performance
    gsap.to('.floating-dot', {
      duration: 'random(6, 12)',
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(0, 180)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 4,
        from: 'random'
      },
      force3D: true
    })

    gsap.to('.morphing-shape', {
      duration: 'random(8, 16)',
      scale: 'random(0.9, 1.1)',
      rotation: 'random(0, 90)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 2,
      force3D: true
    })

    // Simple orbit rotation for mobile
    gsap.to('.orbit-item', {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
      force3D: true
    })

    // Light floating for 3D elements
    gsap.to('.floating-3d-dot', {
      duration: 'random(8, 15)',
      y: 'random(-20, 20)',
      x: 'random(-15, 15)',
      scale: 'random(0.9, 1.1)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1.5,
      force3D: true
    })
  } else {
    // Optimized desktop animations
    gsap.to('.floating-dot', {
      duration: 'random(4, 8)',
      y: 'random(-60, 60)',
      x: 'random(-60, 60)',
      rotation: 'random(0, 360)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 3,
        from: 'random'
      },
      force3D: true
    })

    gsap.to('.floating-3d-dot', {
      duration: 'random(6, 12)',
      y: 'random(-40, 40)',
      x: 'random(-25, 25)',
      z: 'random(-50, 50)',
      rotationX: 'random(0, 180)',
      rotationY: 'random(0, 180)',
      scale: 'random(0.7, 1.3)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1,
      force3D: true
    })

    gsap.to('.morphing-shape', {
      duration: 'random(6, 12)',
      scale: 'random(0.7, 1.3)',
      rotation: 'random(0, 180)',
      borderRadius: 'random(10%, 40%)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1,
      force3D: true
    })

    gsap.to('.orbit-item', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
      force3D: true
    })

    gsap.to('.orbit-item', {
      y: 'random(-8, 8)',
      z: 'random(-20, 20)',
      rotationX: 'random(-5, 5)',
      rotationY: 'random(-5, 5)',
      duration: 'random(4, 8)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5,
      force3D: true
    })
  }

  // Scroll indicator animation
  gsap.to('.scroll-line', {
    duration: 1.5,
    scaleY: 0.3,
    repeat: -1,
    yoyo: true,
    ease: 'power2.inOut'
  })

  // About section animations (optimized for mobile)
  gsap.fromTo(aboutTitle.value,
    { y: isMobileDevice.value ? 20 : 30, opacity: 0, rotationX: isMobileDevice.value ? 0 : -5 },
    { 
      duration: 0.8, 
      y: 0, 
      opacity: 1, 
      rotationX: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutSection.value,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    }
  )

  gsap.fromTo(aboutDescription.value.children,
    { y: isMobileDevice.value ? 15 : 20, opacity: 0, rotationY: isMobileDevice.value ? 0 : -3 },
    { 
      duration: 0.6, 
      y: 0, 
      opacity: 1, 
      rotationY: 0,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aboutDescription.value,
        start: 'top 85%',
        toggleActions: "play none none reverse"
      }
    }
  )

  gsap.fromTo('.orbit-item',
    { scale: 0, opacity: 0, z: isMobileDevice.value ? 0 : -50, rotationY: isMobileDevice.value ? 0 : -90 },
    { 
      scale: 1, 
      opacity: 1, 
      z: 0,
      rotationY: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: aboutVisual.value,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    }
  )

  // Skills section animations
  gsap.fromTo(skillsTitle.value,
    { y: isMobileDevice.value ? 30 : 50, opacity: 0 },
    { 
      duration: 1, 
      y: 0, 
      opacity: 1, 
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skillsSection.value,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    }
  )

  gsap.fromTo('.skill-category',
    { y: isMobileDevice.value ? 30 : 50, opacity: 0, rotationY: isMobileDevice.value ? 0 : -10 },
    { 
      y: 0, 
      opacity: 1, 
      rotationY: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    }
  )

  // Skill bars animation
  skillBars.value.forEach(bar => {
    gsap.fromTo(bar,
      { width: '0%' },
      { 
        width: bar.dataset.width,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
          toggleActions: "play none none reverse"
        }
      }
    )
  })

  // Achievements animations
  gsap.fromTo(achievementsTitle.value,
    { y: isMobileDevice.value ? 30 : 50, opacity: 0 },
    { 
      duration: 1, 
      y: 0, 
      opacity: 1, 
      ease: 'power2.out',
      scrollTrigger: {
        trigger: achievementsSection.value,
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    }
  )

  gsap.fromTo('.achievement-card',
    { y: isMobileDevice.value ? 30 : 50, opacity: 0, rotationY: isMobileDevice.value ? 0 : -15 },
    { 
      y: 0, 
      opacity: 1, 
      rotationY: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.achievements-grid',
        start: 'top 80%',
        toggleActions: "play none none reverse"
      }
    }
  )

  // Counter animations (works on both desktop and mobile)
  statNumbers.value.forEach(el => {
    const target = el.dataset.target
    animateCounter(el, target)
  })
})

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('resize', checkMobileState)
  window.removeEventListener('orientationchange', checkMobileState)
  
  // Kill all GSAP animations
  gsap.killTweensOf("*")
  ScrollTrigger.killAll()
})
</script>

<style scoped>
.home-page {
  background: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  touch-action: pan-y pinch-zoom;
  -webkit-overflow-scrolling: touch;
  position: relative;
  /* Add scroll optimization */
  overscroll-behavior: none;
  scroll-behavior: smooth;
}

/* Mobile-specific fixes */
.is-mobile {
  cursor: auto !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  height: auto !important;
  min-height: 100vh !important;
}

.is-mobile .custom-cursor,
.is-mobile .cursor-dot,
.is-mobile .cursor-outline,
.is-mobile .cursor-follower {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hero {
  height: auto;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  padding-top: 80px;
  padding-bottom: 2rem;
  overflow: visible;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  /* Add performance optimization */
  contain: layout style paint;
  transform: translateZ(0);
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Optimize container performance */
  contain: layout style paint;
  transform: translateZ(0);
}

.floating-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #00ff88;
  border-radius: 50%;
  opacity: 0.6;
}

.morphing-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Optimize container performance */
  contain: layout style paint;
  transform: translateZ(0);
}

.morphing-shape {
  position: absolute;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1));
  border-radius: 20%;
  opacity: 0.3;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  max-width: 1400px;
  padding: 0 clamp(1rem, 3vw, 2rem);
  width: 100%;
  align-items: start;
  position: relative;
  z-index: 1;
}

.hero-left {
  text-align: left;
}

.hero-right {
  text-align: right;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 0.9;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: clamp(-1px, -0.3vw, -2px);
}

.title-line {
  display: block;
  overflow: hidden;
  margin-bottom: 0.2em;
}

.title-line.accent {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2.5vw, 1.3rem);
  opacity: 0.9;
  margin-bottom: clamp(0.8rem, 2vw, 1rem);
  font-weight: 400;
  letter-spacing: clamp(1px, 0.3vw, 2px);
  color: #00ff88;
  line-height: 1.4;
}

.hero-description {
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.hero-description p {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  opacity: 0.8;
  font-weight: 300;
  letter-spacing: clamp(0.5px, 0.1vw, 1px);
  line-height: 1.5;
}

.hero-stats {
  display: flex;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  flex-wrap: wrap;
  justify-content: flex-start;
}

.stat-item {
  text-align: center;
  min-width: 80px;
}

.stat-number {
  display: block;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: clamp(0.7rem, 1.5vw, 0.8rem);
  opacity: 0.7;
  letter-spacing: clamp(1px, 0.2vw, 2px);
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 900;
  text-align: right;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  position: relative;
  text-transform: uppercase;
  letter-spacing: clamp(-0.5px, -0.1vw, -1px);
}

.title-bg {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: clamp(3rem, 8vw, 6rem);
  opacity: 0.05;
  z-index: -1;
  white-space: nowrap;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(1rem, 2.5vw, 1.5rem);
  max-width: 600px;
  margin-left: auto;
}

.category-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(15px, 3vw, 20px);
  padding: clamp(1rem, 2.5vw, 1.5rem);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.15s ease;
  min-height: clamp(180px, 25vw, 220px);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  backdrop-filter: blur(10px);
  touch-action: manipulation;
}

.category-card.coming-soon {
  cursor: not-allowed;
  opacity: 0.7;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.card-header {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1rem);
  margin-bottom: clamp(0.8rem, 2vw, 1rem);
}

.card-icon-wrapper {
  width: clamp(40px, 8vw, 50px);
  height: clamp(40px, 8vw, 50px);
  background: rgba(0, 255, 136, 0.1);
  border-radius: clamp(10px, 2vw, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
  flex-shrink: 0;
}

.card-icon-svg {
  width: clamp(20px, 4vw, 24px);
  height: clamp(20px, 4vw, 24px);
  color: #00ff88;
}

.card-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 700;
  letter-spacing: clamp(0.5px, 0.1vw, 1px);
  position: relative;
  line-height: 1.2;
}

.coming-soon-badge {
  position: absolute;
  top: -0.5rem;
  right: -1rem;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  font-size: clamp(0.4rem, 1vw, 0.5rem);
  padding: clamp(0.15rem, 0.5vw, 0.2rem) clamp(0.3rem, 0.8vw, 0.4rem);
  border-radius: clamp(6px, 1.5vw, 8px);
  font-weight: 600;
  letter-spacing: 1px;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from { box-shadow: 0 0 5px rgba(255, 107, 107, 0.5); }
  to { box-shadow: 0 0 20px rgba(255, 107, 107, 0.8); }
}

.card-description {
  opacity: 0.8;
  margin: clamp(0.8rem, 2vw, 1rem) 0;
  line-height: 1.5;
  font-size: clamp(0.8rem, 1.8vw, 0.9rem);
  flex: 1;
}

.card-tech {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.2rem, 0.5vw, 0.3rem);
  margin-top: auto;
}

.tech-tag {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: clamp(0.15rem, 0.4vw, 0.2rem) clamp(0.4rem, 1vw, 0.6rem);
  border-radius: clamp(12px, 2.5vw, 15px);
  font-size: clamp(0.6rem, 1.3vw, 0.7rem);
  font-weight: 500;
  transition: all 0.15s ease;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1));
  opacity: 0;
  transition: opacity 0.15s ease;
}

.scroll-indicator {
  position: absolute;
  bottom: clamp(1.5rem, 3vw, 2rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1rem);
  z-index: 10;
}

.scroll-line {
  width: 1px;
  height: clamp(30px, 6vw, 40px);
  background: #00ff88;
  transform-origin: top;
}

.scroll-text {
  font-size: clamp(0.7rem, 1.5vw, 0.8rem);
  letter-spacing: clamp(1px, 0.3vw, 2px);
  opacity: 0.7;
  writing-mode: vertical-rl;
}

/* Container and Sections */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 3vw, 2rem);
}

.about-section,
.skills-section,
.achievements-section {
  padding: clamp(4rem, 10vw, 8rem) 0;
  position: relative;
}

.about-section {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 255, 136, 0.02) 50%, transparent 100%);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(3rem, 8vw, 6rem);
  align-items: center;
}

.about-description p {
  font-size: clamp(1rem, 2.2vw, 1.1rem);
  line-height: 1.8;
  opacity: 0.9;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
}

.about-visual {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.skill-orbit-container {
  position: relative;
  width: 100%;
  height: clamp(300px, 50vw, 400px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.skill-orbit {
  position: relative;
  width: clamp(200px, 40vw, 300px);
  height: clamp(200px, 40vw, 300px);
  transform-style: preserve-3d;
}

.orbit-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(60px, 12vw, 80px);
  height: clamp(60px, 12vw, 80px);
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
}

.center-text {
  font-weight: 700;
  color: #000;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  letter-spacing: 1px;
}

.orbit-item {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(45px, 9vw, 60px);
  height: clamp(45px, 9vw, 60px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: orbit-float 3s ease-in-out infinite;
  backface-visibility: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  cursor: pointer;
  touch-action: manipulation;
}

@keyframes orbit-float {
  0%, 100% { 
    transform: translate(var(--x, 0), var(--y, 0)) scale(1) rotateY(0deg) translateZ(0px); 
  }
  50% { 
    transform: translate(var(--x, 0), var(--y, 0)) scale(1.1) rotateY(180deg) translateZ(20px); 
  }
}

.skill-text {
  font-size: clamp(0.5rem, 1.2vw, 0.7rem);
  font-weight: 600;
  text-align: center;
  color: #00ff88;
  line-height: 1.1;
  padding: 0 2px;
}

.orbit-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.orbit-item:hover .orbit-glow {
  opacity: 1;
}

.floating-3d-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-3d-dot {
  position: absolute;
  width: clamp(4px, 1vw, 6px);
  height: clamp(4px, 1vw, 6px);
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 50%;
  opacity: 0.6;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.skills-section {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.02) 50%, transparent 100%);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(280px, 40vw, 300px), 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
}

.skill-category {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(15px, 3vw, 20px);
  padding: clamp(1.5rem, 3vw, 2rem);
  backdrop-filter: blur(10px);
  transition: transform 0.15s ease;
}

.skill-category:hover {
  transform: translateY(-5px) rotateY(2deg);
}

.skill-category-header {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1rem);
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
}

.skill-category-icon {
  width: clamp(25px, 5vw, 30px);
  height: clamp(25px, 5vw, 30px);
  color: #00ff88;
}

.skill-category-name {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  font-weight: 700;
  color: #00ff88;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.skill-item {
  display: flex;
  align-items: center;
  gap: clamp(0.8rem, 2vw, 1rem);
  position: relative;
}

.skill-name {
  min-width: clamp(100px, 20vw, 120px);
  font-weight: 500;
  font-size: clamp(0.85rem, 1.8vw, 0.95rem);
}

.skill-bar {
  flex: 1;
  height: clamp(6px, 1.5vw, 8px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: clamp(3px, 0.8vw, 4px);
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: clamp(3px, 0.8vw, 4px);
  width: 0%;
  position: relative;
  overflow: hidden;
}

.skill-progress::after {
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

.skill-level {
  min-width: clamp(35px, 7vw, 40px);
  text-align: right;
  font-weight: 600;
  color: #00ff88;
  font-size: clamp(0.8rem, 1.6vw, 0.9rem);
}

.achievements-section {
  background: rgba(255, 255, 255, 0.01);
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 35vw, 280px), 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
}

.achievement-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(15px, 3vw, 20px);
  padding: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  transition: transform 0.15s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  cursor: pointer;
  touch-action: manipulation;
}

.achievement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.05), rgba(0, 212, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.achievement-card:hover::before {
  opacity: 1;
}

.achievement-icon {
  width: clamp(60px, 12vw, 80px);
  height: clamp(60px, 12vw, 80px);
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.2), rgba(0, 212, 255, 0.2));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto clamp(1rem, 2.5vw, 1.5rem);
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
  transition: transform 0.15s ease;
}

.achievement-icon-svg {
  width: clamp(30px, 6vw, 40px);
  height: clamp(30px, 6vw, 40px);
  color: #00ff88;
}

.achievement-content {
  position: relative;
  z-index: 2;
}

.achievement-title {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  font-weight: 700;
  margin-bottom: clamp(0.8rem, 2vw, 1rem);
  color: #00ff88;
  line-height: 1.3;
}

.achievement-description {
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: clamp(0.8rem, 2vw, 1rem);
  font-size: clamp(0.85rem, 1.8vw, 0.95rem);
}

.achievement-year {
  font-weight: 600;
  color: #00d4ff;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
}

/* Performance optimizations for animated elements */
.floating-dot,
.morphing-shape,
.floating-3d-dot,
.orbit-item {
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Reduce animation complexity on scroll */
@media (prefers-reduced-motion: reduce) {
  .floating-dot,
  .morphing-shape,
  .floating-3d-dot {
    animation: none !important;
  }
}

/* Scroll performance optimization */
html {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  /* Add scroll optimization */
  overscroll-behavior: none;
}

body {
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  /* Prevent scroll bounce */
  overscroll-behavior-y: none;
}

/* Enhanced Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    gap: clamp(2rem, 4vw, 3rem);
  }

  .about-content {
    gap: clamp(3rem, 6vw, 4rem);
  }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: clamp(2rem, 4vw, 3rem);
  }

  .hero-left,
  .hero-right {
    text-align: center;
  }

  .section-title {
    text-align: center;
  }

  .categories-grid {
    margin: 0 auto;
    max-width: clamp(400px, 60vw, 500px);
  }

  .hero-stats {
    justify-content: center;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: clamp(3rem, 6vw, 4rem);
    text-align: center;
  }

  .title-bg {
    text-align: center;
    left: 50%;
    right: auto;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .scroll-indicator {
    display: none;
  }
}

@media (max-width: 768px) {
  .home-page {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .hero {
    height: auto;
    min-height: 100vh;
    padding-top: 100px;
    align-items: center;
    justify-content: center;
    padding-bottom: 3rem;
  }
  
  .hero-content {
    margin-top: 0;
    align-items: center;
    min-height: auto;
    justify-content: center;
    text-align: center;
  }

  .hero-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    pointer-events: none;
    contain: layout style paint;
    transform: translateZ(0);
  }
  
  .scroll-indicator {
    display: none;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    max-width: clamp(300px, 80vw, 350px);
  }

  .hero-stats {
    gap: clamp(1rem, 3vw, 2rem);
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-content {
    padding: 0 clamp(1rem, 2vw, 1.5rem);
  }

  .container {
    padding: 0 clamp(1rem, 2vw, 1.5rem);
  }

  .about-section,
  .skills-section,
  .achievements-section {
    padding: clamp(3rem, 8vw, 4rem) 0;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 70vw, 300px), 1fr));
  }

  .skill-orbit {
    width: clamp(180px, 35vw, 250px);
    height: clamp(180px, 35vw, 250px);
  }

  .orbit-item {
    width: clamp(40px, 8vw, 50px);
    height: clamp(40px, 8vw, 50px);
  }

  .skill-text {
    font-size: clamp(0.45rem, 1vw, 0.6rem);
  }

  .about-visual {
    perspective: none;
    transform-style: flat;
  }

  .skill-orbit {
    transform-style: flat;
  }

  .orbit-item {
    transform-style: flat;
  }

  @keyframes orbit-float {
    0%, 100% { 
      transform: translate(var(--x, 0), var(--y, 0)) scale(1); 
    }
    50% { 
      transform: translate(var(--x, 0), var(--y, 0)) scale(1.1); 
    }
  }

  /* Fix title-bg positioning for mobile */
  .title-bg {
    font-size: clamp(2.5rem, 7vw, 4rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    opacity: 0.05;
    z-index: -1;
  }
  
  .section-title {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0.5rem 0;
  }

  /* Force default cursor on mobile */
  * {
    cursor: auto !important;
  }
  
  /* Hide any custom cursor elements */
  .custom-cursor,
  .cursor-dot,
  .cursor-outline,
  .cursor-follower {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  
  /* Hide scrollbar on mobile for cleaner look */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  /* Ensure smooth scrolling on mobile */
  html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  body {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 100vh;
    padding-top: 100px;
    padding-bottom: 2rem;
    align-items: center;
    justify-content: center;
  }
  
  .hero-content {
    min-height: auto;
    gap: clamp(2rem, 6vw, 3rem);
    align-items: center;
    justify-content: center;
  }
  
  .hero-title {
    margin-top: 0;
    line-height: 0.85;
  }
  
  .categories-grid {
    margin-bottom: 2rem;
  }

  .hero-title {
    font-size: clamp(2rem, 10vw, 2.5rem);
  }

  .hero-subtitle {
    font-size: clamp(0.8rem, 3vw, 1rem);
    line-height: 1.5;
  }

  .categories-grid {
    max-width: clamp(280px, 90vw, 300px);
  }

  .category-card {
    min-height: clamp(160px, 35vw, 180px);
    padding: clamp(0.8rem, 3vw, 1rem);
  }

  .hero-stats {
    gap: clamp(0.8rem, 4vw, 1rem);
  }

  .stat-number {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
  }

  .skill-orbit {
    width: clamp(160px, 40vw, 200px);
    height: clamp(160px, 40vw, 200px);
  }

  .orbit-center {
    width: clamp(50px, 12vw, 60px);
    height: clamp(50px, 12vw, 60px);
  }

  .center-text {
    font-size: clamp(0.6rem, 1.5vw, 0.7rem);
  }

  .skill-item {
    flex-direction: column;
    align-items: flex-start;
    gap: clamp(0.4rem, 1vw, 0.5rem);
  }

  .skill-name {
    min-width: auto;
    margin-bottom: clamp(0.2rem, 0.5vw, 0.25rem);
    width: 100%;
  }

  .skill-bar {
    width: 100%;
  }

  .skill-level {
    position: absolute;
    right: 0;
    top: 0;
    min-width: auto;
  }

  .achievement-card {
    padding: clamp(1rem, 4vw, 1.5rem);
  }

  .achievement-icon {
    width: clamp(50px, 12vw, 60px);
    height: clamp(50px, 12vw, 60px);
  }

  .achievement-icon-svg {
    width: clamp(25px, 6vw, 30px);
    height: clamp(25px, 6vw, 30px);
  }

  .title-bg {
    font-size: clamp(2rem, 6vw, 3rem);
  }
}

@media (max-width: 360px) {
  .hero-title {
    font-size: clamp(1.8rem, 12vw, 2rem);
    letter-spacing: -1px;
  }

  .hero-subtitle {
    font-size: clamp(0.75rem, 3.5vw, 0.9rem);
    letter-spacing: 1px;
  }

  .hero-description p {
    font-size: clamp(0.85rem, 3vw, 0.9rem);
  }

  .stat-number {
    font-size: clamp(1.1rem, 5vw, 1.3rem);
  }

  .stat-label {
    font-size: clamp(0.65rem, 2.5vw, 0.7rem);
  }

  .section-title {
    font-size: clamp(1.5rem, 6vw, 1.8rem);
    margin-bottom: clamp(1.5rem, 4vw, 2rem);
  }

  .title-bg {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }

  .categories-grid {
    max-width: 95vw;
  }

  .category-card {
    min-height: clamp(140px, 40vw, 160px);
    padding: clamp(0.7rem, 3vw, 0.8rem);
  }

  .card-title {
    font-size: clamp(0.8rem, 3vw, 0.9rem);
  }

  .card-description {
    font-size: clamp(0.75rem, 2.5vw, 0.8rem);
  }

  .tech-tag {
    font-size: clamp(0.55rem, 2vw, 0.6rem);
    padding: clamp(0.1rem, 0.5vw, 0.15rem) clamp(0.3rem, 1vw, 0.4rem);
  }
}

::-webkit-scrollbar {
  width: clamp(6px, 1.5vw, 8px);
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: clamp(3px, 0.8vw, 4px);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #00d4ff, #00ff88);
}

@media (max-width: 768px) {
  * {
    cursor: auto !important;
  }
  
  .custom-cursor,
  .cursor-dot,
  .cursor-outline,
  .cursor-follower {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }
  
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  body {
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }
}
</style>