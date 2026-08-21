<script setup>
import { computed } from 'vue'
import MatchStatusPanel from '../components/Mockup/MatchStatusPanel.vue'
import BaseDashboardCard from '../components/Mockup/BaseDashboardCard.vue'
import { matchList, weatherList } from '../data/footballData'
import { useFavoriteMatchStore } from '../stores/favoriteMatchStore'

const favoriteStore = useFavoriteMatchStore()
const favoriteMatches = computed(() =>
  matchList.filter((match) => favoriteStore.isFavorite(match.id)),
)
</script>

<template>
  <section class="favorites-page">
    <header class="page-heading">
      <span>MY MATCHES</span>
      <h1>관심 경기</h1>
      <p>즐겨찾기한 경기의 일정과 관람 날씨를 모아서 확인하세요.</p>
    </header>
    <BaseDashboardCard v-if="favoriteMatches.length"
      ><MatchStatusPanel :matches="favoriteMatches" :weather-list="weatherList"
    /></BaseDashboardCard>
    <div v-else class="empty-state">
      <span>☆</span>
      <h2>아직 관심 경기가 없습니다.</h2>
      <p>오늘의 경기에서 별표를 눌러 경기를 추가해 보세요.</p>
      <RouterLink to="/today-match">경기 찾아보기</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.favorites-page {
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
  font-size: clamp(26px, 4vw, 38px);
}
.page-heading p {
  color: var(--site-muted);
}
.empty-state {
  padding: 60px 24px;
  text-align: center;
  background: var(--site-surface);
  border: 1px dashed var(--site-border);
  border-radius: 14px;
}
.empty-state span {
  color: #e6a900;
  font-size: 38px;
}
.empty-state h2 {
  margin: 10px 0;
  font-size: 19px;
}
.empty-state p {
  margin-bottom: 18px;
  color: var(--site-muted);
}
.empty-state a {
  display: inline-block;
  padding: 10px 16px;
  color: #fff;
  font-weight: 800;
  background: #168653;
  border-radius: 8px;
}
</style>
