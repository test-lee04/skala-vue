import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteMatchStore = defineStore('favoriteMatch', () => {
  const favoriteMatchIds = ref([])
  const favoriteCount = computed(() => favoriteMatchIds.value.length)
  const isFavorite = (matchId) => favoriteMatchIds.value.includes(matchId)

  function toggleFavorite(matchId) {
    favoriteMatchIds.value = isFavorite(matchId)
      ? favoriteMatchIds.value.filter((id) => id !== matchId)
      : [...favoriteMatchIds.value, matchId]
  }

  return { favoriteMatchIds, favoriteCount, isFavorite, toggleFavorite }
})
