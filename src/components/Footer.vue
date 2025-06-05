<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-brand">
            <h2 class="footer-title">
              <span class="title-line">LET'S CREATE</span>
              <span class="title-line accent">SOMETHING AMAZING</span>
            </h2>
            <p class="footer-subtitle">
              Ready to bring your ideas to life? Let's collaborate and build something extraordinary together.
            </p>
          </div>
          
          <div class="footer-links-section">
            <div class="footer-column">
              <h3 class="column-title">Connect</h3>
              <div class="social-links">
                <a href="mailto:banyubagastaranugroho@gmail.com" class="social-link">
                  <Mail class="social-icon" />
                  <span>Email</span>
                </a>
                <a href="https://www.linkedin.com/in/banyubn/" target="_blank" class="social-link">
                  <Linkedin class="social-icon" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/banyubn" target="_blank" class="social-link">
                  <Github class="social-icon" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
            
            <div class="footer-column">
              <h3 class="column-title">Explore</h3>
              <div class="service-links">
                <router-link to="/programming" class="service-link">Web Development</router-link>
                <router-link to="/video-editing" class="service-link">Video Editing</router-link>
                <router-link to="/music-production" class="service-link">Music Production</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="footer-divider"></div>
          <div class="footer-bottom-content">
            <p class="copyright">
              © 2025 Banyu Bagastara Nugroho. All rights reserved.
            </p>
            <div class="footer-badge">
              <span class="badge-text">Made with</span>
              <Heart class="badge-heart" />
              <span class="badge-text">& Vue.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Mail, Linkedin, Github, Heart } from 'lucide-vue-next'
</script>

<style scoped>
.footer {
  background: var(--footer-bg);
  border-top: 1px solid var(--border-color);
  padding: 6rem 0 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, var(--accent-glow-1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, var(--accent-glow-2) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.footer-brand {
  max-width: 600px;
}

.footer-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.title-line {
  display: block;
}

.title-line.accent {
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.footer-links-section {
  display: flex;
  gap: 3rem;
}

.footer-column {
  flex: 1;
}

.column-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: inherit;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.social-link:hover {
  color: var(--accent-color);
  transform: translateX(5px);
}

.social-icon {
  width: 20px;
  height: 20px;
}

.service-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-link {
  color: inherit;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  position: relative;
}

.service-link:hover {
  color: var(--accent-color);
  transform: translateX(5px);
}

.service-link::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.service-link:hover::before {
  width: 0.5rem;
}

.footer-bottom {
  margin-top: 2rem;
}

.footer-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-color), transparent);
  margin-bottom: 2rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  opacity: 0.6;
  font-size: 0.9rem;
}

.footer-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--card-bg-light);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: 1px solid var(--border-color);
}

.badge-text {
  font-size: 0.9rem;
  opacity: 0.8;
}

.badge-heart {
  width: 16px;
  height: 16px;
  color: #ff6b6b;
  animation: heartbeat 2s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .footer-links-section {
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 4rem 0 2rem;
  }
  
  .footer-links-section {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-title {
    font-size: 2rem;
  }
  
  .footer-subtitle {
    font-size: 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
