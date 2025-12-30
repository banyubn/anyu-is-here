import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { DARK_THEME, LIGHT_THEME, THEME_PROPERTY_MAP } from '@/constants/theme'

export function useTheme() {
  const isDarkMode = ref(true)

  const updateThemeColors = (theme) => {
    const root = document.documentElement
    
    Object.keys(theme).forEach((key) => {
      const cssProperty = THEME_PROPERTY_MAP[key]
      if (cssProperty) {
        root.style.setProperty(cssProperty, theme[key])
      }
    })
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    
    gsap.to('body', {
      duration: 0.5,
      backgroundColor: isDarkMode.value ? DARK_THEME.bgColor : LIGHT_THEME.bgColor,
      ease: 'power2.inOut',
    })
    
    updateThemeColors(isDarkMode.value ? DARK_THEME : LIGHT_THEME)
  }

  const initializeTheme = () => {
    updateThemeColors(isDarkMode.value ? DARK_THEME : LIGHT_THEME)
  }

  onMounted(() => {
    initializeTheme()
  })

  return {
    isDarkMode,
    toggleDarkMode,
    initializeTheme,
  }
}
