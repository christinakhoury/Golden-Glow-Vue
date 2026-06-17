// src/composables/useTheme.js
import { ref, watch, readonly } from 'vue'

const theme = ref('light')
const isInitialized = ref(false)

export function useTheme() {
  const loadTheme = () => {
    const saved = localStorage.getItem('gg-theme')
    if (saved) {
      theme.value = saved
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark'
    }
  }

  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('gg-theme', theme.value)
    applyTheme()
  }

  // Initialize only once
  if (!isInitialized.value) {
    loadTheme()
    applyTheme()
    isInitialized.value = true

    // Watch for changes
    watch(theme, () => {
      applyTheme()
    })
  }

  return {
    theme: readonly(theme),
    toggleTheme,
    loadTheme,
    applyTheme
  }
}