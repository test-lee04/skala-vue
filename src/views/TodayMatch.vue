<script setup>
import MatchStatusPanel from '../components/Mockup/MatchStatusPanel.vue'
import BaseDashboardCard from '../components/Mockup/BaseDashboardCard.vue'

const weatherList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '맨체스터', temp: 10, status: '비' },
  { id: 'city_05', name: '런던', temp: 21, status: '구름' },
  { id: 'city_06', name: '바르셀로나', temp: 34, status: '맑음' },
]

const matchList = [
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
]
</script>

<template>
  <section class="today-match">
    <BaseDashboardCard>
      <MatchStatusPanel :matches="matchList" :weather-list="weatherList" />
    </BaseDashboardCard>
  </section>
</template>

<style scoped>
.today-match {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
