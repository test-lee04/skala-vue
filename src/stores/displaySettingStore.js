import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const FONT_SIZES = ['small', 'medium', 'large']

export const useDisplaySettingStore = defineStore('displaySetting', () => {
  const theme = ref('light')
  const fontSize = ref('medium')
  const isDarkMode = computed(() => theme.value === 'dark')
  const themeClass = computed(() => (isDarkMode.value ? 'dark-theme' : 'light-theme'))
  const fontSizeClass = computed(() => 'font-' + fontSize.value)

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function setFontSize(size) {
    if (FONT_SIZES.includes(size)) fontSize.value = size
  }

  function resetDisplaySettings() {
    theme.value = 'light'
    fontSize.value = 'medium'
  }

  return {
    theme,
    fontSize,
    isDarkMode,
    themeClass,
    fontSizeClass,
    toggleTheme,
    setFontSize,
    resetDisplaySettings,
  }
})
