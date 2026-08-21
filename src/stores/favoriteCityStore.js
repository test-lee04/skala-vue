import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteCityStore = defineStore('favoriteCity', () => {
  const favoriteCityIds = ref([])
  const favoriteCount = computed(() => favoriteCityIds.value.length)
  const isFavorite = computed(() => {
    return (cityId) => favoriteCityIds.value.includes(cityId)
  })

  function toggleFavorite(cityId) {
    if (favoriteCityIds.value.includes(cityId)) {
      favoriteCityIds.value = favoriteCityIds.value.filter((id) => id !== cityId)
      return
    }
    favoriteCityIds.value.push(cityId)
  }

  function clearFavorites() {
    favoriteCityIds.value = []
  }

  return {
    favoriteCityIds,
    favoriteCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  }
})
