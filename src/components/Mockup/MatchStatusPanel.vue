<script setup>
import { computed } from 'vue'

const props = defineProps({
  matches: {
    type: Array,
    required: true,
  },
  weatherList: {
    type: Array,
    required: true,
  },
})

const weatherByCityId = computed(() =>
  Object.fromEntries(props.weatherList.map((weather) => [weather.id, weather])),
)

const getWeather = (cityId) => weatherByCityId.value[cityId]

const getNotice = (cityId) => {
  const weather = getWeather(cityId)
  if (!weather) return '날씨 정보가 없습니다'

  const notices = []

  if (weather.temp >= 33) {
    notices.push('하이드레이션 브레이크 운영 (전·후반 20분 후 휴식)')
  }
  if (weather.status === '비') notices.push('우비와 우산을 준비해 주세요')

  return notices.length ? notices.join(' / ') : '기상 특이사항 없이 정상 진행'
}

const getNoticeType = (cityId) => {
  const weather = getWeather(cityId)

  if (!weather) return 'unknown'
  if (weather.temp >= 33) return 'danger'
  return weather.status === '비' ? 'rain' : 'normal'
}
</script>

<template>
  <h3>🏟️ 지역별 경기 현황</h3>

  <article v-for="match in matches" :key="match.id" class="stadium-card">
    <h4>{{ match.home }} vs {{ match.away }}</h4>
    <p><strong>시간:</strong> {{ match.time }}</p>
    <p><strong>경기장:</strong> {{ match.stadium }}</p>
    <p v-if="getWeather(match.cityId)">
      <strong>예상 날씨:</strong> {{ getWeather(match.cityId).status }} ·
      {{ getWeather(match.cityId).temp }}℃
    </p>
    <p v-else><strong>예상 날씨:</strong> 정보 없음</p>
    <p class="notice" :class="getNoticeType(match.cityId)">
      <strong>주의사항:</strong> {{ getNotice(match.cityId) }}
    </p>
  </article>
</template>

<style scoped>
h3 {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.stadium-card {
  padding: 12px;
  margin-top: 9px;
  background: #fff;
  border: 1px solid #d7e0e7;
  border-radius: 5px;
}

.stadium-card h4 {
  padding-bottom: 7px;
  margin-bottom: 7px;
  font-size: 13px;
  font-weight: 800;
  border-bottom: 1px solid #edf0f2;
}

.stadium-card p {
  font-size: 12px;
  line-height: 1.6;
}

.stadium-card strong {
  font-weight: 700;
}

.notice {
  padding: 6px 8px;
  margin-top: 7px;
  border-radius: 4px;
}

.notice.normal {
  color: #187d3a;
  background: #e7f7eb;
}

.notice.rain {
  color: #176998;
  background: #e4f3fc;
}

.notice.danger {
  color: #a33b24;
  background: #ffede7;
}

.notice.unknown {
  color: #5f6368;
  background: #eef0f2;
}
</style>
