import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const checkFadeIn = () => {
    const elements = document.querySelectorAll('.fade-on-scroll')

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top < windowHeight - 100) {
        element.classList.add('visible')
      }
    })
  }

  const onScroll = () => {
    checkFadeIn()
  }

  onMounted(() => {
    setTimeout(checkFadeIn, 100)

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', checkFadeIn)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', checkFadeIn)
  })

  return { checkFadeIn }
}