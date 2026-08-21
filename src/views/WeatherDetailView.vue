<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getWeatherByCityId } from '../data/footballData'
import { useConfigStore } from '../stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const observationDetails = {
  city_01: { fullName: '대한민국 서울특별시', humidity: '55%', wind: '2.5m/s' },
  city_02: { fullName: '경기도 수원시 영통구', humidity: '85%', wind: '4.1m/s' },
  city_03: { fullName: '부산광역시 해운대구', humidity: '65%', wind: '5.0m/s' },
  city_04: { fullName: '영국 맨체스터', humidity: '81%', wind: '4.8m/s' },
  city_05: { fullName: '영국 런던', humidity: '70%', wind: '3.6m/s' },
  city_06: { fullName: '스페인 바르셀로나', humidity: '48%', wind: '2.9m/s' },
}

const cityData = computed(() => {
  const weather = getWeatherByCityId(route.params.cityId)
  const observation = observationDetails[route.params.cityId]
  if (!weather || !observation) return null
  return { ...weather, ...observation }
})

const displayTemp = computed(() => {
  if (!cityData.value) return 0
  const rawTemp = cityData.value.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보</h3>
    <hr />

    <div v-if="cityData" class="info-card">
      <h4>📍 지정 지역: {{ cityData.fullName }}</h4>
      <p>
        실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
      </p>
      <p>기상 현황: {{ cityData.status }}</p>
      <p>대기 습도: {{ cityData.humidity }}</p>
      <p>현재 풍속: {{ cityData.wind }}</p>
    </div>
    <div v-else>
      <p>해당 지역의 상세 데이터 장부가 존재하지 않습니다.</p>
    </div>

    <button class="back-btn" @click="router.back()">← 이전 화면으로 돌아가기</button>
  </div>
</template>

<style scoped>
.detail-container {
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.info-card {
  background: #f1f2f6;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
}
.back-btn {
  padding: 8px 12px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
