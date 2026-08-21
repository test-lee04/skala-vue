<script setup>
import { computed, ref } from 'vue'
import MatchStatusPanel from '../components/Mockup/MatchStatusPanel.vue'
import BaseDashboardCard from '../components/Mockup/BaseDashboardCard.vue'
import { matchList, weatherList } from '../data/footballData'

const selectedLeague = ref('전체')
const leagues = ['전체', ...new Set(matchList.map((match) => match.league))]
const filteredMatches = computed(() =>
  selectedLeague.value === '전체'
    ? matchList
    : matchList.filter((match) => match.league === selectedLeague.value),
)
</script>

<template>
  <section class="today-match">
    <header class="page-heading">
      <span>MATCH DAY</span>
      <h1>오늘의 주요 경기</h1>
      <p>킥오프 시간과 경기장 날씨, 관람 주의사항을 확인하세요.</p>
    </header>

    <div class="league-filter" aria-label="리그 필터">
      <button
        v-for="league in leagues"
        :key="league"
        :class="{ active: selectedLeague === league }"
        @click="selectedLeague = league"
      >
        {{ league }}
      </button>
    </div>

    <BaseDashboardCard>
      <MatchStatusPanel :matches="filteredMatches" :weather-list="weatherList" />
    </BaseDashboardCard>
  </section>
</template>

<style scoped>
.today-match {
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

.league-filter {
  display: flex;
  gap: 7px;
  margin-bottom: 14px;
  overflow-x: auto;
}
.league-filter button {
  padding: 8px 13px;
  color: #60756c;
  background: #fff;
  border: 1px solid #dfe8e3;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
}
.league-filter button.active {
  color: #fff;
  background: #168653;
  border-color: #168653;
}
</style>
