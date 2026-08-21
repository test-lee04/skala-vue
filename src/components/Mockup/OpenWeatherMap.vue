<script setup>
import axios from 'axios'
import { ElAlert, ElButton, ElCard, ElOption, ElSelect, ElTag } from 'element-plus'
import { computed, ref } from 'vue'

import { useConfigStore } from '../../stores/configStore'

const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'
const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality'
const locations = [
  { id: 'gwangju', name: '광주', lat: 35.158582, lon: 126.804975 },
  { id: 'seoul', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'busan', name: '부산', lat: 35.1796, lon: 129.0756 },
]

const configStore = useConfigStore()
const selectedLocationId = ref(locations[0].id)
const weatherData = ref(null)
const forecastData = ref([])
const airQualityData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const selectedLocation = computed(() => {
  return locations.find((location) => location.id === selectedLocationId.value)
})

const convertTemperature = (temperature) => {
  if (configStore.unit === 'fahrenheit') return Math.round((temperature * 9) / 5 + 32)
  return Math.round(temperature)
}

const currentTemperature = computed(() => {
  return weatherData.value ? convertTemperature(weatherData.value.main.temp) : null
})

const dailyForecasts = computed(() => {
  return forecastData.value.map((forecast) => ({
    ...forecast,
    displayTemp: convertTemperature(forecast.main.temp),
    dateLabel: new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
    }).format(new Date(forecast.dt * 1000)),
  }))
})

const getAirQualityLabel = (aqi) => {
  if (aqi <= 20) return '매우 좋음'
  if (aqi <= 40) return '좋음'
  if (aqi <= 60) return '보통'
  if (aqi <= 80) return '나쁨'
  if (aqi <= 100) return '매우 나쁨'
  return '극도로 나쁨'
}

const selectDailyForecasts = (list) => {
  const noonForecasts = list.filter((item) => item.dt_txt.includes('12:00:00'))
  if (noonForecasts.length > 0) return noonForecasts.slice(0, 5)
  return list.filter((_, index) => index % 8 === 0).slice(0, 5)
}

const handleFetchWeather = async () => {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (!apiKey) {
    errorMessage.value = '.env.local에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  const { lat, lon } = selectedLocation.value
  const commonParams = { lat, lon, appid: apiKey, units: 'metric', lang: 'kr' }

  try {
    const [currentResponse, forecastResponse, airQualityResponse] = await Promise.all([
      axios.get(OPEN_WEATHER_BASE_URL + '/weather', { params: commonParams }),
      axios.get(OPEN_WEATHER_BASE_URL + '/forecast', { params: commonParams }),
      axios.get(AIR_QUALITY_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'pm10,pm2_5,european_aqi,uv_index',
          timezone: 'auto',
        },
      }),
    ])

    weatherData.value = currentResponse.data
    forecastData.value = selectDailyForecasts(forecastResponse.data.list)
    airQualityData.value = airQualityResponse.data.current
  } catch (error) {
    const status = error.response?.status
    errorMessage.value =
      status === 401
        ? 'OpenWeather API 키가 유효하지 않거나 아직 활성화되지 않았습니다.'
        : '날씨 데이터를 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.'
    console.error('날씨 API 요청 실패:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="weather-api">
    <div class="api-header">
      <div>
        <h2>🌍 실시간 날씨 API</h2>
        <p>OpenWeather 현재 날씨·5일 예보 + Open-Meteo 대기질</p>
      </div>
      <div class="api-controls">
        <ElSelect v-model="selectedLocationId" aria-label="지역 선택">
          <ElOption
            v-for="location in locations"
            :key="location.id"
            :label="location.name"
            :value="location.id"
          />
        </ElSelect>
        <ElButton type="primary" :loading="isLoading" @click="handleFetchWeather">
          실시간 데이터 조회
        </ElButton>
      </div>
    </div>

    <ElAlert
      v-if="errorMessage"
      class="api-alert"
      type="error"
      :title="errorMessage"
      :closable="false"
      show-icon
    />

    <div v-if="weatherData" class="api-grid">
      <ElCard class="result-card">
        <template #header><strong>현재 날씨</strong></template>
        <div>
          <img
            :src="'https://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png'"
            :alt="weatherData.weather[0].description"
          />
          <p>
            <strong>{{ weatherData.name }}</strong>
          </p>
          <p>기온: {{ currentTemperature }}{{ configStore.unitSymbol }}</p>
          <p>
            체감: {{ convertTemperature(weatherData.main.feels_like) }}{{ configStore.unitSymbol }}
          </p>
          <p>날씨: {{ weatherData.weather[0].description }}</p>
          <p>습도: {{ weatherData.main.humidity }}%</p>
          <p>풍속: {{ weatherData.wind.speed }}m/s</p>
          <ElTag type="info">OpenWeather Current API</ElTag>
        </div>
      </ElCard>

      <ElCard v-if="airQualityData" class="result-card">
        <template #header><strong>대기질 · 외부 API</strong></template>
        <div>
          <p>
            유럽 AQI:
            <strong>
              {{ airQualityData.european_aqi }} ·
              {{ getAirQualityLabel(airQualityData.european_aqi) }}
            </strong>
          </p>
          <p>PM2.5: {{ airQualityData.pm2_5 }}㎍/㎥</p>
          <p>PM10: {{ airQualityData.pm10 }}㎍/㎥</p>
          <p>자외선 지수: {{ airQualityData.uv_index }}</p>
          <ElTag type="success">Open-Meteo Air Quality API</ElTag>
        </div>
      </ElCard>
    </div>

    <section v-if="dailyForecasts.length" class="forecast-section">
      <h3>OpenWeather 5일 예보</h3>
      <div class="forecast-list">
        <ElCard v-for="forecast in dailyForecasts" :key="forecast.dt" class="forecast-card">
          <div class="forecast-content">
            <strong>{{ forecast.dateLabel }}</strong>
            <img
              :src="'https://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png'"
              :alt="forecast.weather[0].description"
            />
            <span>{{ forecast.displayTemp }}{{ configStore.unitSymbol }}</span>
            <small>{{ forecast.weather[0].description }}</small>
          </div>
        </ElCard>
      </div>
    </section>

    <p v-if="!weatherData && !errorMessage" class="empty-message">
      지역을 선택하고 실시간 데이터 조회 버튼을 눌러 주세요.
    </p>
  </section>
</template>

<style scoped>
.weather-api {
  width: 100%;
  padding: 20px;
  color: inherit;
  background: var(--settings-background, #f7f9fa);
  border: 1px solid var(--settings-border, #e2e7eb);
  border-radius: 10px;
}
.api-header,
.api-controls,
.api-grid,
.forecast-list {
  display: flex;
  gap: 12px;
}
.api-header {
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.api-controls {
  flex: 0 0 auto;
  align-items: center;
}
.api-header p,
.result-card p {
  margin: 2px 0;
}
.api-controls :deep(.el-select) {
  width: 110px;
  min-width: 110px;
}
.api-controls :deep(.el-button) {
  white-space: nowrap;
}
.api-grid {
  margin-top: 16px;
}
.result-card {
  flex: 1;
  min-width: 0;
  padding: 14px;
  background: var(--control-background, #fff);
  border: 1px solid var(--settings-border, #d7e0e7);
  border-radius: 7px;
}
.result-card img {
  width: 64px;
  height: 64px;
}
.forecast-section {
  margin-top: 16px;
}
.forecast-list {
  margin-top: 8px;
}
.forecast-card {
  flex: 1;
  min-width: 0;
  text-align: center;
}
.forecast-card :deep(.el-card__body) {
  height: 100%;
  padding: 10px 4px;
}
.forecast-content {
  display: grid;
  justify-items: center;
}
.forecast-card img {
  width: 48px;
  height: 48px;
}
.api-alert {
  margin-top: 12px;
}
.empty-message {
  padding: 20px 0 4px;
  text-align: center;
}
@media (max-width: 640px) {
  .api-controls {
    width: 100%;
  }

  .api-grid,
  .forecast-list {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
