<template>
  <div class="certificates-page">
    <PageHeader 
      title="CERTIFICATES"
      :icon="Award"
      description="Professional certifications and achievements"
    />

    <div class="container">
      <section class="certificates-intro">
        <h2 class="section-subtitle">PROFESSIONAL CERTIFICATIONS</h2>
        <p class="intro-text">
          A collection of professional certifications and achievements that validate my expertise 
          and commitment to continuous learning in technology and creative fields.
        </p>
        
        <div class="achievement-stats">
          <div class="achievement-stat">
            <span class="stat-number">{{ certificates.length }}</span>
            <span class="stat-label">Certifications</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">{{ getUniqueIssuers() }}</span>
            <span class="stat-label">Organizations</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">{{ getYearRange() }}</span>
            <span class="stat-label">Years Active</span>
          </div>
        </div>
      </section>
      
      <section class="certificates-grid-section">
        <div class="certificates-filter">
          <h3 class="filter-title">Filter by Category</h3>
          <div class="filter-buttons">
            <button 
              v-for="category in categories" 
              :key="category"
              @click="selectedCategory = category"
              :class="['filter-btn', { active: selectedCategory === category }]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <DisclaimerBanner />
        
        <div class="certificate-grid">
          <div 
            v-for="cert in filteredCertificates" 
            :key="cert.id" 
            class="certificate-card"
            @mouseenter="onCertHover"
            @mouseleave="onCertLeave"
          >
            <div class="cert-hologram"></div>
            <div class="cert-content">
              <div class="cert-header">
                <div class="cert-icon" :style="{ backgroundColor: cert.color }">
                  <component :is="cert.icon" class="cert-icon-svg" />
                </div>
                <div class="cert-badge" :class="cert.level">
                  {{ cert.level }}
                </div>
              </div>
              
              <h3 class="cert-name">{{ cert.name }}</h3>
              <p class="cert-issuer">{{ cert.issuer }}</p>
              <p class="cert-description">{{ cert.description }}</p>
              
              <div class="cert-details">
                <div class="cert-detail">
                  <Calendar class="detail-icon" />
                  <span>{{ cert.year }}</span>
                </div>
                <div class="cert-detail">
                  <Clock class="detail-icon" />
                  <span>{{ cert.duration }}</span>
                </div>
                <div v-if="cert.credentialId" class="cert-detail">
                  <Shield class="detail-icon" />
                  <span>ID: {{ cert.credentialId }}</span>
                </div>
              </div>
              
              <div class="cert-skills">
                <span v-for="skill in cert.skills" :key="skill" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
              
              <div class="cert-actions">
                <button class="cert-btn primary">
                  <ExternalLink class="btn-icon" />
                  View Certificate
                </button>
                <button class="cert-btn secondary">
                  <Download class="btn-icon" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="learning-journey">
        <h2 class="section-subtitle">LEARNING JOURNEY</h2>
        <div class="timeline">
          <div v-for="(year, index) in timelineYears" :key="year" class="timeline-item">
            <div class="timeline-marker">
              <span class="timeline-year">{{ year }}</span>
            </div>
            <div class="timeline-content">
              <div class="timeline-certs">
                <div 
                  v-for="cert in getCertsByYear(year)" 
                  :key="cert.id"
                  class="timeline-cert"
                >
                  <component :is="cert.icon" class="timeline-cert-icon" />
                  <div class="timeline-cert-info">
                    <h4>{{ cert.name }}</h4>
                    <p>{{ cert.issuer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { 
  Award, Calendar, Clock, Shield, ExternalLink, Download,
  Code, Palette, Cloud, Database, Globe, Zap
} from 'lucide-vue-next'
import PageHeader from '../components/PageHeader.vue'
import DisclaimerBanner from '../components/DisclaimerBanner.vue'

const selectedCategory = ref('All')

const certificates = [
  {
    id: 1,
    name: 'AWS Solutions Architect Professional',
    issuer: 'Amazon Web Services',
    year: '2023',
    duration: 'Valid until 2026',
    credentialId: 'AWS-SAP-2023-001',
    description: 'Advanced cloud architecture and solutions design',
    category: 'Cloud',
    level: 'Professional',
    color: '#ff9900',
    icon: Cloud,
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security']
  },
  {
    id: 2,
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    year: '2023',
    duration: 'Valid until 2025',
    credentialId: 'GCP-PD-2023-002',
    description: 'Cloud-native application development and deployment',
    category: 'Cloud',
    level: 'Professional',
    color: '#4285f4',
    icon: Cloud,
    skills: ['GCP', 'Kubernetes', 'Microservices', 'APIs']
  },
  {
    id: 3,
    name: 'Adobe Certified Expert - After Effects',
    issuer: 'Adobe',
    year: '2022',
    duration: 'Valid until 2024',
    credentialId: 'ACE-AE-2022-003',
    description: 'Advanced motion graphics and visual effects',
    category: 'Creative',
    level: 'Expert',
    color: '#9999ff',
    icon: Palette,
    skills: ['After Effects', 'Motion Graphics', 'VFX', 'Animation']
  },
  {
    id: 4,
    name: 'Vue.js 3 Certified Developer',
    issuer: 'Vue School',
    year: '2022',
    duration: 'Lifetime',
    credentialId: 'VUE3-CD-2022-004',
    description: 'Modern Vue.js development and best practices',
    category: 'Development',
    level: 'Professional',
    color: '#4fc08d',
    icon: Code,
    skills: ['Vue.js', 'JavaScript', 'TypeScript', 'Composition API']
  },
  {
    id: 5,
    name: 'React Developer Professional',
    issuer: 'Meta',
    year: '2022',
    duration: 'Valid until 2024',
    credentialId: 'META-RDP-2022-005',
    description: 'Advanced React development and ecosystem',
    category: 'Development',
    level: 'Professional',
    color: '#61dafb',
    icon: Code,
    skills: ['React', 'Redux', 'Next.js', 'GraphQL']
  },
  {
    id: 6,
    name: 'Node.js Application Developer',
    issuer: 'OpenJS Foundation',
    year: '2021',
    duration: 'Valid until 2024',
    credentialId: 'JSNAD-2021-006',
    description: 'Server-side JavaScript development',
    category: 'Development',
    level: 'Professional',
    color: '#339933',
    icon: Code,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs']
  },
  {
    id: 7,
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB Inc.',
    year: '2021',
    duration: 'Valid until 2024',
    credentialId: 'MDB-DEV-2021-007',
    description: 'NoSQL database design and development',
    category: 'Database',
    level: 'Professional',
    color: '#47a248',
    icon: Database,
    skills: ['MongoDB', 'Aggregation', 'Indexing', 'Sharding']
  },
  {
    id: 8,
    name: 'Web Performance Optimization',
    issuer: 'Google Developers',
    year: '2021',
    duration: 'Lifetime',
    credentialId: 'GD-WPO-2021-008',
    description: 'Advanced web performance techniques',
    category: 'Web',
    level: 'Advanced',
    color: '#ea4335',
    icon: Zap,
    skills: ['Performance', 'Core Web Vitals', 'Optimization', 'Lighthouse']
  }
]

const categories = computed(() => {
  const cats = ['All', ...new Set(certificates.map(cert => cert.category))]
  return cats
})

const filteredCertificates = computed(() => {
  if (selectedCategory.value === 'All') {
    return certificates
  }
  return certificates.filter(cert => cert.category === selectedCategory.value)
})

const timelineYears = computed(() => {
  const years = [...new Set(certificates.map(cert => cert.year))].sort((a, b) => b - a)
  return years
})

const getUniqueIssuers = () => {
  return new Set(certificates.map(cert => cert.issuer)).size
}

const getYearRange = () => {
  const years = certificates.map(cert => parseInt(cert.year))
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  return `${maxYear - minYear + 1}`
}

const getCertsByYear = (year) => {
  return certificates.filter(cert => cert.year === year)
}

const onCertHover = (event) => {
  const card = event.currentTarget
  gsap.to(card, {
    duration: 0.3,
    y: -10,
    rotationY: 5,
    scale: 1.02,
    ease: 'power2.out'
  })
}

const onCertLeave = (event) => {
  const card = event.currentTarget
  gsap.to(card, {
    duration: 0.3,
    y: 0,
    rotationY: 0,
    scale: 1,
    ease: 'power2.out'
  })
}

onMounted(() => {
  // Animate certificate cards
  gsap.fromTo('.certificate-card',
    { y: 50, opacity: 0, rotationY: -15 },
    { duration: 0.8, y: 0, opacity: 1, rotationY: 0, stagger: 0.1, ease: 'power2.out', delay: 0.4 }
  )
  
  // Animate timeline items
  gsap.fromTo('.timeline-item',
    { x: -50, opacity: 0 },
    { duration: 0.8, x: 0, opacity: 1, stagger: 0.2, ease: 'power2.out', delay: 0.8 }
  )
  
  // Animate achievement stats
  gsap.fromTo('.achievement-stat',
    { scale: 0.8, opacity: 0 },
    { duration: 0.6, scale: 1, opacity: 1, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.2 }
  )
})
</script>

<style scoped>
.certificates-page {
  padding-top: 80px;
  min-height: 100vh;
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

.certificates-intro {
  text-align: center;
  margin-bottom: 4rem;
}

.intro-text {
  font-size: 1.1rem;
  opacity: 0.8;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.achievement-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 2rem;
}

.achievement-stat {
  text-align: center;
}

.achievement-stat .stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #00ff88;
  margin-bottom: 0.5rem;
}

.achievement-stat .stat-label {
  font-size: 0.9rem;
  opacity: 0.7;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.certificates-grid-section {
  margin-bottom: 5rem;
}

.certificates-filter {
  margin-bottom: 3rem;
  text-align: center;
}

.filter-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #00ff88;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
  color: #00ff88;
}

.certificate-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.certificate-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cert-hologram {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    transparent 30%, 
    rgba(0, 255, 136, 0.1) 50%, 
    transparent 70%);
  animation: hologram 4s infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certificate-card:hover .cert-hologram {
  opacity: 1;
}

@keyframes hologram {
  0%, 100% { transform: translateX(-100%) rotate(0deg); }
  50% { transform: translateX(100%) rotate(180deg); }
}

.cert-content {
  position: relative;
  z-index: 2;
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.cert-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.cert-icon-svg {
  width: 24px;
  height: 24px;
}

.cert-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cert-badge.professional {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.cert-badge.expert {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
}

.cert-badge.advanced {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.cert-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.cert-issuer {
  color: #00ff88;
  font-weight: 600;
  margin-bottom: 1rem;
}

.cert-description {
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.cert-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.cert-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.detail-icon {
  width: 16px;
  height: 16px;
  color: #00ff88;
}

.cert-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.skill-tag {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.cert-actions {
  display: flex;
  gap: 1rem;
}

.cert-btn {
  flex: 1;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cert-btn.primary {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: #000;
}

.cert-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cert-btn:hover {
  transform: translateY(-2px);
}

.cert-btn.primary:hover {
  box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
}

.cert-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.learning-journey {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 4rem;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #00ff88, #00d4ff);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 4rem;
  height: 4rem;
  background: rgba(0, 255, 136, 0.2);
  border: 3px solid #00ff88;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-year {
  font-weight: 700;
  font-size: 0.9rem;
  color: #00ff88;
}

.timeline-content {
  margin-left: 3rem;
}

.timeline-certs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-cert {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.timeline-cert:hover {
  transform: translateX(10px);
}

.timeline-cert-icon {
  width: 30px;
  height: 30px;
  color: #00ff88;
  flex-shrink: 0;
}

.timeline-cert-info h4 {
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.timeline-cert-info p {
  opacity: 0.7;
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .achievement-stats {
    gap: 2rem;
  }
  
  .certificate-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .achievement-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .filter-buttons {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
  
  .certificate-grid {
    grid-template-columns: 1fr;
  }
  
  .cert-actions {
    flex-direction: column;
  }
  
  .timeline {
    padding-left: 1rem;
  }
  
  .timeline-marker {
    left: -1.5rem;
    width: 3rem;
    height: 3rem;
  }
  
  .timeline-content {
    margin-left: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
