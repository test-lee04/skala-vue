import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useWeatherAlertStore = defineStore('weatherAlert', () => {
  const hotThreshold = ref(33)
  const coldThreshold = ref(5)
  const rainAlertEnabled = ref(true)

  const alertSummary = computed(() => {
    const rain = rainAlertEnabled.value ? '사용' : '사용 안 함'
    return (
      '폭염 ' +
      hotThreshold.value +
      '℃ 이상 · 한파 ' +
      coldThreshold.value +
      '℃ 이하 · 비 알림 ' +
      rain
    )
  })

  const getAlert = computed(() => {
    return (weather) => {
      if (weather.temp >= hotThreshold.value) return { type: 'danger', message: '폭염 주의' }
      if (weather.temp <= coldThreshold.value) return { type: 'cold', message: '한파 주의' }
      if (rainAlertEnabled.value && weather.status === '비') {
        return { type: 'rain', message: '우천 주의' }
      }
      return null
    }
  })

  function setHotThreshold(value) {
    const threshold = Number(value)
    if (Number.isFinite(threshold)) hotThreshold.value = threshold
  }

  function setColdThreshold(value) {
    const threshold = Number(value)
    if (Number.isFinite(threshold)) coldThreshold.value = threshold
  }

  function setRainAlertEnabled(enabled) {
    rainAlertEnabled.value = enabled
  }

  function resetAlertSettings() {
    hotThreshold.value = 33
    coldThreshold.value = 5
    rainAlertEnabled.value = true
  }

  return {
    hotThreshold,
    coldThreshold,
    rainAlertEnabled,
    alertSummary,
    getAlert,
    setHotThreshold,
    setColdThreshold,
    setRainAlertEnabled,
    resetAlertSettings,
  }
})
