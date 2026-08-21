<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

import BaseDashboardCard from './BaseDashboardCard.vue'
import MatchStatusPanel from './MatchStatusPanel.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

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
// 경기 정보 배열
const matchList = ref([
  {
    id: 'match_01',
    cityId: 'city_01',
    home: '서울FC',
    away: '광주FC',
    time: '19:30',
    stadium: '서울월드컵경기장',
  },
  {
    id: 'match_02',
    cityId: 'city_02',
    home: '수원FC',
    away: '대전FC',
    time: '18:00',
    stadium: '수원종합운동장',
  },
  {
    id: 'match_03',
    cityId: 'city_03',
    home: '부산아이파크',
    away: '인천유나이티드',
    time: '19:00',
    stadium: '부산아시아드주경기장',
  },
  {
    id: 'match_04',
    cityId: 'city_04',
    home: '맨체스터 시티',
    away: '첼시',
    time: '20:00',
    stadium: '에티하드 스타디움',
  },
  {
    id: 'match_05',
    cityId: 'city_05',
    home: '아스널',
    away: '토트넘',
    time: '20:30',
    stadium: '에미레이츠 스타디움',
  },
  {
    id: 'match_06',
    cityId: 'city_06',
    home: '바르셀로나',
    away: '레알 마드리드',
    time: '21:00',
    stadium: '캄 노우',
  },
])

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()

  if (!query) return weatherList.value

  return weatherList.value.filter((weather) => weather.name.toLocaleLowerCase().includes(query))
})

// 선택된 도시 감시 (watch 이용)
watch(selectedCityInfo, (newCity) => {
  console.log(
    `👁️ [watch 감지] 상태 바 문구가 업데이트되었습니다 → "${newCity}"`,
  )
})

// 검색어 변화 감시 (watchEffect 이용)
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'에 매칭되는 도시: ${filteredWeatherList.value.map((city) => city.name).join(', ') || '없음'}`,
  )
})
</script>

<template>
  <div class="mockup">
    <BaseDashboardCard>
        <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)"></SearchBar>
    </BaseDashboardCard>

    <BaseDashboardCard>
        <h3>🏙️ 지역별 날씨 현황</h3>

        <WeatherCard v-for = "item in filteredWeatherList" :key="item.id" :city-item="item" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="showDetail" /> 
        
        <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">검색 결과와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <MatchStatusPanel :matches="matchList" :weather-list="weatherList" />
    </BaseDashboardCard>
        
    <p class="guide-message">
      {{ selectedCityInfo }}
    </p>

  </div>
</template>

<style scoped>
.mockup {
  width: 100%;
  max-width: 600px;
  min-width: 0;
  margin: 0 auto;
}

.mockup h1 {
  padding-bottom: 13px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 800;
  border-bottom: 1px solid #d9e1e7;
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

@media (max-width: 800px) {
  .mockup {
    width: 100%;
    padding: 24px 18px 20px;
  }
}
</style>
