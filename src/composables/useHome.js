import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { isMobileDevice as checkIsMobile } from '@/utils/helpers'

export function useHome() {
  const isMobileDevice = ref(false)

  const checkMobileState = () => {
    isMobileDevice.value = checkIsMobile()

    const customCursor = document.querySelector('.custom-cursor')
    const cursorFollower = document.querySelector('.cursor-follower')
    
    if (customCursor && cursorFollower) {
      if (isMobileDevice.value) {
        customCursor.style.display = 'none'
        cursorFollower.style.display = 'none'
      } else {
        customCursor.style.display = ''
        cursorFollower.style.display = ''
      }
    }
  }

  const fixMobileScroll = () => {
    if (isMobileDevice.value) {
      document.body.style.overflow = 'auto'
      document.body.style.overflowX = 'hidden'
      document.body.style.height = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.documentElement.style.overflowX = 'hidden'
      document.documentElement.style.height = 'auto'
      window.scrollTo(0, window.scrollY)
    }
  }

  const onCardHover = (event) => {
    if (isMobileDevice.value) return

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
        ease: 'power2.out',
      })

      gsap.to(overlay, {
        duration: 0.15,
        opacity: 1,
        ease: 'power2.out',
      })

      gsap.to(iconWrapper, {
        duration: 0.15,
        scale: 1.1,
        rotation: 10,
        ease: 'power2.out',
      })

      gsap.to(techTags, {
        duration: 0.15,
        y: -2,
        scale: 1.05,
        stagger: 0.02,
        ease: 'power2.out',
      })
    }
  }

  const onCardLeave = (event) => {
    if (isMobileDevice.value) return

    const card = event.currentTarget
    const overlay = card.querySelector('.card-overlay')
    const iconWrapper = card.querySelector('.card-icon-wrapper')
    const techTags = card.querySelectorAll('.tech-tag')

    if (!card.classList.contains('coming-soon')) {
      gsap.to(card, {
        duration: 0.15,
        y: 0,
        scale: 1,
        rotationY: 0,
        ease: 'power2.out',
      })

      gsap.to(overlay, {
        duration: 0.15,
        opacity: 0,
        ease: 'power2.out',
      })

      gsap.to(iconWrapper, {
        duration: 0.15,
        scale: 1,
        rotation: 0,
        ease: 'power2.out',
      })

      gsap.to(techTags, {
        duration: 0.15,
        y: 0,
        scale: 1,
        stagger: 0.02,
        ease: 'power2.out',
      })
    }
  }

  const onOrbitItemHover = (event) => {
    if (isMobileDevice.value) return

    const item = event.currentTarget
    const glow = item.querySelector('.orbit-glow')

    gsap.to(item, {
      duration: 0.2,
      scale: 1.2,
      ease: 'power2.out',
    })

    gsap.to(glow, {
      duration: 0.2,
      opacity: 1,
      scale: 1.5,
      ease: 'power2.out',
    })
  }

  const onOrbitItemLeave = (event) => {
    if (isMobileDevice.value) return

    const item = event.currentTarget
    const glow = item.querySelector('.orbit-glow')

    gsap.to(item, {
      duration: 0.2,
      scale: 1,
      ease: 'power2.out',
    })

    gsap.to(glow, {
      duration: 0.2,
      opacity: 0,
      scale: 1,
      ease: 'power2.out',
    })
  }

  const onAchievementHover = (event) => {
    if (isMobileDevice.value) return

    const card = event.currentTarget

    gsap.to(card, {
      duration: 0.3,
      y: -8,
      scale: 1.02,
      ease: 'power2.out',
    })
  }

  const onAchievementLeave = (event) => {
    if (isMobileDevice.value) return

    const card = event.currentTarget

    gsap.to(card, {
      duration: 0.3,
      y: 0,
      scale: 1,
      ease: 'power2.out',
    })
  }

  onMounted(() => {
    checkMobileState()
    fixMobileScroll()
    window.addEventListener('resize', checkMobileState)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobileState)
  })

  return {
    isMobileDevice,
    onCardHover,
    onCardLeave,
    onOrbitItemHover,
    onOrbitItemLeave,
    onAchievementHover,
    onAchievementLeave,
  }
}
