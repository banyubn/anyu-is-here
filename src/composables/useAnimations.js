import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAnimations() {
  const animateCounter = (element, target, duration = 2) => {
    if (!element) return

    gsap.to(element, {
      innerText: target,
      duration,
      ease: 'power1.out',
      snap: { innerText: 1 },
      onUpdate: function () {
        element.innerText = Math.ceil(this.targets()[0].innerText)
      },
    })
  }

  const fadeInUp = (elements, options = {}) => {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    }

    return gsap.from(elements, { ...defaults, ...options })
  }

  const fadeIn = (elements, options = {}) => {
    const defaults = {
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    }

    return gsap.from(elements, { ...defaults, ...options })
  }

  const scaleIn = (elements, options = {}) => {
    const defaults = {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }

    return gsap.from(elements, { ...defaults, ...options })
  }

  const animateProgressBar = (element, percentage) => {
    if (!element) return

    gsap.to(element, {
      width: percentage,
      duration: 1.5,
      ease: 'power2.out',
    })
  }

  const createScrollTrigger = (triggerElement, animation, options = {}) => {
    const defaults = {
      trigger: triggerElement,
      start: 'top 80%',
      toggleActions: 'play none none none',
    }

    return ScrollTrigger.create({
      ...defaults,
      ...options,
      animation,
    })
  }

  const hoverScale = (element, scale = 1.05, duration = 0.3) => {
    gsap.to(element, {
      scale,
      duration,
      ease: 'power2.out',
    })
  }

  const hoverScaleReset = (element, duration = 0.3) => {
    gsap.to(element, {
      scale: 1,
      duration,
      ease: 'power2.out',
    })
  }

  return {
    animateCounter,
    fadeInUp,
    fadeIn,
    scaleIn,
    animateProgressBar,
    createScrollTrigger,
    hoverScale,
    hoverScaleReset,
  }
}
