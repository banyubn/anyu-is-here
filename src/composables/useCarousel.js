import { gsap } from 'gsap'

export function useCarousel() {
  const createInfiniteCarousel = (trackElement, direction = 'right', speed = 30) => {
    if (!trackElement) return null

    const totalWidth = trackElement.scrollWidth / 3

    if (direction === 'left') {
      gsap.set(trackElement, { x: -totalWidth })
      return gsap.to(trackElement, {
        x: 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      })
    } else {
      gsap.set(trackElement, { x: 0 })
      return gsap.to(trackElement, {
        x: -totalWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      })
    }
  }

  return {
    createInfiniteCarousel,
  }
}
