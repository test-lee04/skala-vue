<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

// 검색어
const searchQuery = ref('')
// 선택된 도시
const selectedCityInfo = ref(null)
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

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const getWeather = (cityId) => weatherList.value.find((weather) => weather.id === cityId)

const getNotice = (cityId) => {
  const weather = getWeather(cityId)
  const notices = []

  if (weather.temp >= 33) notices.push('하이드레이션 브레이크 운영 (전·후반 20분 후 휴식)')
  if (weather.status === '비') notices.push('우비와 우산을 준비해 주세요')

  return notices.length ? notices.join(' / ') : '기상 특이사항 없이 정상 진행'
}

const getNoticeType = (cityId) => {
  const weather = getWeather(cityId)
  return weather.temp >= 33 ? 'danger' : weather.status === '비' ? 'rain' : 'normal'
}

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()

  if (!query) return weatherList.value

  return weatherList.value.filter((weather) => weather.name.toLocaleLowerCase().includes(query))
})

// 선택된 도시 감시 (watch 이용)
watch(selectedCityInfo, (newCity, oldCity) => {
  console.log(
    `👁️ [watch 감지] 상태 바 문구가 업데이트되었습니다: ${oldCity?.name ?? '선택 없음'} → ${newCity?.name ?? '선택 없음'}`,
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
  <section class="mockup">
    <h1>🌥️ 과제 2: 날씨 (컴포지션)</h1>
    <div class="panel search-panel">
      <h3>🔍 도시 검색</h3>
      <input v-model="searchQuery" type="text" placeholder="검색할 도시 이름 입력" />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </div>

    <div class="status-grid">
      <div class="panel weather-panel">
        <h3>🏙️ 지역별 날씨 현황</h3>
        <article
          v-for="item in filteredWeatherList"
          :key="item.id"
          class="weather-card"
          @click="selectCity(item)"
        >
          <div class="weather-info">
            <p class="city-name">{{ item.name }} ({{ item.status }})</p>
            <p>현재 기온: {{ item.temp }}℃</p>
            <span v-if="item.temp >= 33" class="weather-label hot"
              >🥵 매우 더움 (하이드레이션 필요)</span
            >
            <span v-else-if="item.temp >= 25" class="weather-label hot"> 🔥 더움 (25도 이상) </span>
            <span v-else-if="item.temp >= 11" class="weather-label cool"
              >❄️ 선선함 (25도 미만)</span
            >
            <span v-else class="weather-label cool">❄️매우 추움(겉옷 필요)</span>
          </div>
          <button type="button" @click.stop="showDetail(item.name, item.status)">상세보기</button>
        </article>
        <p v-if="filteredWeatherList.length === 0" class="empty-message">
          검색 결과와 일치하는 도시가 없습니다.
        </p>
      </div>

      <div class="panel stadium-panel">
        <h3>🏟️ 지역별 경기 현황</h3>

        <article v-for="match in matchList" :key="match.id" class="stadium-card">
          <h4>{{ match.home }} vs {{ match.away }}</h4>
          <p><strong>시간:</strong> {{ match.time }}</p>
          <p><strong>경기장:</strong> {{ match.stadium }}</p>
          <p>
            <strong>예상 날씨:</strong> {{ getWeather(match.cityId).status }} ·
            {{ getWeather(match.cityId).temp }}℃
          </p>
          <p class="notice" :class="getNoticeType(match.cityId)">
            <strong>주의사항:</strong> {{ getNotice(match.cityId) }}
          </p>
        </article>
      </div>
    </div>

    <p class="guide-message">
      {{
        selectedCityInfo
          ? `${selectedCityInfo.name}이 선택되었습니다.`
          : '카드를 클릭하거나 검색해 보세요.'
      }}
    </p>
  </section>
</template>

<style scoped>
.mockup {
  width: min(1100px, calc(100vw - 64px));
  padding: 32px 36px 28px;
  color: #222;
}

.mockup h1 {
  padding-bottom: 13px;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 800;
  border-bottom: 1px solid #d9e1e7;
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

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 16px;
}

.search-panel input {
  display: block;
  width: 100%;
  height: 40px;
  padding: 8px 10px;
  color: #334e63;
  background: #fff;
  border: 1px solid #8c969e;
  outline: none;
}

.search-panel input:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.18);
}

.search-panel input::placeholder {
  color: #8796a2;
}

.search-panel p {
  margin-top: 3px;
  font-size: 12px;
}

.search-panel strong {
  font-weight: 700;
}

.weather-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 82px;
  padding: 12px 10px;
  margin-top: 9px;
  background: #fff;
  border: 1px solid #d7e0e7;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(35, 64, 86, 0.04);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.weather-card:hover {
  border-color: #9fb7c9;
  box-shadow: 0 3px 8px rgba(35, 64, 86, 0.1);
}

.empty-message {
  padding: 28px 12px;
  margin-top: 9px;
  color: #7a4a16;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  background: #fff6df;
  border: 1px solid #f0d89d;
  border-radius: 5px;
}

.weather-info p {
  font-size: 12px;
  line-height: 1.45;
}

.weather-info .city-name {
  font-weight: 700;
}

.weather-label {
  display: inline-block;
  padding: 3px 8px;
  margin-top: 2px;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.4;
  border-radius: 4px;
}

.weather-label.hot {
  background: #ff626a;
}

.weather-label.cool {
  background: #3caff2;
}

.weather-card button {
  flex: 0 0 auto;
  padding: 5px 9px;
  margin-left: 12px;
  color: #284864;
  font-size: 11px;
  font-weight: 700;
  background: #fff;
  border: 1px solid #8e969c;
  cursor: pointer;
}

.weather-card button:hover {
  background: #f1f5f7;
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

.stadium-card .notice {
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
  .status-grid {
    grid-template-columns: 1fr;
  }

  .mockup {
    width: calc(100vw - 32px);
    padding: 24px 18px 20px;
  }
}
</style>
