import { onUnmounted, ref } from 'vue'

export default function userResize() {
  const rect = ref({
    width: window.innerWidth,
    height: window.innerHeight
  })
  function handleResize() {
    rect.value = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  window.addEventListener('resize', handleResize)
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
  return rect
}
