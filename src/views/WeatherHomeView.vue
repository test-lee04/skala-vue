<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '../components/Mockup/BaseDashboardCard.vue'
import SearchBar from '../components/Mockup/SearchBar.vue'
import WeatherCard from '../components/Mockup/WeatherCard.vue'
import { useFavoriteCityStore } from '../stores/favoriteCityStore'

const router = useRouter()
const route = useRoute()
const favoriteStore = useFavoriteCityStore()

// 검색어
const searchQuery = ref('')
// 선택된 도시
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
// 지역별 날시 데이터 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '맨체스터', temp: 10, status: '비' },
  { id: 'city_05', name: '런던', temp: 21, status: '구름' },
  { id: 'city_06', name: '바르셀로나', temp: 34, status: '맑음' },
])

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  let cities = weatherList.value

  if (query) {
    cities = cities.filter((weather) => weather.name.toLocaleLowerCase().includes(query))
  }

  return [...cities].sort((first, second) => {
    return Number(favoriteStore.isFavorite(second.id)) - Number(favoriteStore.isFavorite(first.id))
  })
})

// 선택된 도시 감시 (watch 이용)
watch(selectedCityInfo, (newCity) => {
  console.log(`👁️ [watch 감지] 상태 바 문구가 업데이트되었습니다 → "${newCity}"`)
})

// 검색어 변화 감시 (watchEffect 이용)
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 도시: ${filteredWeatherList.value.map((city) => city.name).join(', ') || '없음'}`,
  )
})

onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
})

watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="mockup">
    <BaseDashboardCard>
      <SearchBar
        :current-query="searchQuery"
        @update-query="(val) => (searchQuery = val)"
      ></SearchBar>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="(msg) => (selectedCityInfo = msg)"
        @click-detail="handleDetailJump(item.id)"
      />

      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="guide-message">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>

<style scoped>
.mockup {
  width: 600px;
  margin: 0 auto;
}

.panel {
  padding: 16px 14px;
  margin-bottom: 12px;
  background: #f7f9fa;
  border: 1px solid #e2e7eb;
  border-radius: 8px;
}

.panel h3 {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.guide-message {
  padding: 10px;
  margin-top: 12px;
  color: #169447;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  background: #e1f6e6;
  border-radius: 5px;
}

.empty-message {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}

@media (max-width: 800px) {
  .mockup {
    width: calc(100vw - 32px);
    padding: 24px 18px 20px;
  }
}
</style>
