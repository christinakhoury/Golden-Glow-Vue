<!-- src/components/layout/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="fixed z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
    :class="[
      theme === 'dark' 
        ? 'bg-[#1a1a1a] text-[#bd9c30] hover:bg-[#262626] border-amber-500/20 shadow-amber-500/5' 
        : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200',
      'border'
    ]"
    style="bottom: 100px; right: 20px;"
    aria-label="Toggle theme"
  >
    <!-- Sun icon (shows in dark mode to switch to light) -->
    <svg v-if="theme === 'dark'" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
    </svg>
    <!-- Moon icon (shows in light mode to switch to dark) -->
    <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>