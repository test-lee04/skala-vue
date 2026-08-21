<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '../components/Mockup/BaseDashboardCard.vue'
import SearchBar from '../components/Mockup/SearchBar.vue'
import WeatherCard from '../components/Mockup/WeatherCard.vue'
import { useFavoriteCityStore } from '../stores/favoriteCityStore'
import { matchList, weatherList } from '../data/footballData'

const router = useRouter()
const route = useRoute()
const favoriteStore = useFavoriteCityStore()

// 검색어
const searchQuery = ref('')
// 선택된 도시
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
// 지역별 날시 데이터 배열
const cities = ref(weatherList)

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  let filteredCities = cities.value

  if (query) {
    filteredCities = filteredCities.filter((weather) =>
      weather.name.toLocaleLowerCase().includes(query),
    )
  }

  return [...filteredCities].sort((first, second) => {
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
    <header class="page-heading">
      <span>FOOTBALL WEATHER DASHBOARD</span>
      <h1>오늘, 어느 경기장이 좋을까요?</h1>
      <p>도시별 날씨를 비교하고 상세 기상 정보를 확인하세요.</p>
    </header>

    <div class="summary-grid">
      <RouterLink to="/today-match" class="summary-card"
        ><strong>{{ matchList.length }}</strong
        ><span>오늘의 경기</span></RouterLink
      >
      <RouterLink to="/live-weather" class="summary-card"
        ><strong>{{ weatherList.length }}</strong
        ><span>경기장 날씨</span></RouterLink
      >
      <RouterLink to="/favorites" class="summary-card"
        ><strong>★</strong><span>관심 경기</span></RouterLink
      >
    </div>

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
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.page-heading {
  margin-bottom: 24px;
}

.page-heading span {
  color: #168653;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.page-heading h1 {
  margin: 5px 0;
  color: inherit;
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
}

.page-heading p {
  color: #6c7e76;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}
.summary-card {
  display: grid;
  gap: 3px;
  padding: 16px;
  color: #17352a;
  background: #fff;
  border: 1px solid #dfe8e3;
  border-radius: 10px;
}
.summary-card:hover {
  border-color: #168653;
  background: #f0faf5;
}
.summary-card strong {
  color: #168653;
  font-size: 22px;
}
.summary-card span {
  color: #6c7e76;
  font-size: 12px;
  font-weight: 700;
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
    width: 100%;
  }
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
