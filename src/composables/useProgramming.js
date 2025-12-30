import { ref } from 'vue'
import { gsap } from 'gsap'

export function useProgramming() {
  const selectedProject = ref(null)

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
      ease: 'power2.out',
    })

    gsap.to(overlay, {
      duration: 0.3,
      opacity: 1,
      y: 0,
      ease: 'power2.out',
    })
  }

  const onLanguageLeave = (event) => {
    const card = event.currentTarget
    const overlay = card.querySelector('.language-overlay')

    gsap.to(card, {
      duration: 0.3,
      y: 0,
      scale: 1,
      ease: 'power2.out',
    })

    gsap.to(overlay, {
      duration: 0.3,
      opacity: 0,
      y: 10,
      ease: 'power2.out',
    })
  }

  const openModal = (project) => {
    selectedProject.value = project
  }

  const closeModal = () => {
    selectedProject.value = null
  }

  return {
    selectedProject,
    getSkillLevel,
    onLanguageHover,
    onLanguageLeave,
    openModal,
    closeModal,
  }
}
