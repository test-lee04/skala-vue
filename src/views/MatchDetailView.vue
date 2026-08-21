<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMatchById, getViewingGuide, getWeatherByCityId } from '../data/footballData'
import { useFavoriteMatchStore } from '../stores/favoriteMatchStore'

const route = useRoute()
const favoriteStore = useFavoriteMatchStore()
const match = computed(() => getMatchById(route.params.matchId))
const weather = computed(() => getWeatherByCityId(match.value?.cityId))
const guide = computed(() => getViewingGuide(weather.value))
</script>

<template>
  <section v-if="match" class="match-detail">
    <RouterLink to="/today-match" class="back-link">← 경기 목록</RouterLink>
    <header class="match-hero">
      <div>
        <span>{{ match.league }} · {{ match.time }} 킥오프</span>
        <h1>{{ match.home }} <small>VS</small> {{ match.away }}</h1>
        <p>📍 {{ match.stadium }}</p>
      </div>
      <button class="favorite-button" @click="favoriteStore.toggleFavorite(match.id)">
        {{ favoriteStore.isFavorite(match.id) ? '★ 관심 경기 해제' : '☆ 관심 경기 등록' }}
      </button>
    </header>

    <div class="detail-grid">
      <article class="info-card">
        <span>예상 날씨</span><strong>{{ weather.status }} · {{ weather.temp }}℃</strong>
        <p>{{ weather.name }} 지역의 경기 시간대 예상 정보</p>
      </article>
      <article class="info-card">
        <span>관람 적합도</span><strong :class="guide.className">{{ guide.level }}</strong>
        <p>{{ guide.message }}</p>
      </article>
      <article class="info-card">
        <span>추천 준비물</span
        ><strong>{{
          weather.status === '비'
            ? '우비 · 방수 가방'
            : weather.temp >= 33
              ? '물 · 모자 · 선크림'
              : '응원 도구 · 겉옷'
        }}</strong>
        <p>경기장 반입 규정을 함께 확인하세요.</p>
      </article>
    </div>

    <section class="stadium-guide">
      <h2>경기장 방문 안내</h2>
      <ul>
        <li>킥오프 1시간 전 도착을 권장합니다.</li>
        <li>대중교통 운행 시간과 입장 게이트를 미리 확인하세요.</li>
        <li>기상 악화 시 주최 측의 경기 진행 공지를 확인하세요.</li>
      </ul>
    </section>
  </section>
  <section v-else class="not-found">
    <h1>경기를 찾을 수 없습니다.</h1>
    <RouterLink to="/today-match">경기 목록으로 돌아가기</RouterLink>
  </section>
</template>

<style scoped>
.match-detail {
  max-width: 820px;
  margin: 0 auto;
}
.back-link {
  display: inline-block;
  margin-bottom: 18px;
  color: #168653;
  font-weight: 800;
}
.match-hero {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 28px;
  color: #fff;
  background: linear-gradient(135deg, #126c45, #1ca669);
  border-radius: 18px;
}
.match-hero span {
  font-size: 12px;
  font-weight: 800;
  opacity: 0.82;
}
.match-hero h1 {
  margin: 8px 0;
  font-size: clamp(23px, 4vw, 36px);
}
.match-hero h1 small {
  padding: 0 7px;
  font-size: 13px;
  opacity: 0.7;
}
.favorite-button {
  align-self: start;
  padding: 9px 12px;
  color: #604900;
  background: #fff4bd;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 18px 0;
}
.info-card,
.stadium-guide {
  padding: 20px;
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 12px;
}
.info-card span {
  color: var(--site-muted);
  font-size: 11px;
}
.info-card strong {
  display: block;
  margin: 8px 0;
  font-size: 18px;
}
.info-card p,
.stadium-guide li {
  color: var(--site-muted);
  font-size: 12px;
  line-height: 1.7;
}
.normal {
  color: #168653;
}
.danger {
  color: #dc4c35;
}
.rain {
  color: #2980b9;
}
.cold {
  color: #5277a3;
}
.stadium-guide h2 {
  margin-bottom: 10px;
  font-size: 18px;
}
.stadium-guide ul {
  padding-left: 18px;
}
.not-found {
  text-align: center;
}
@media (max-width: 680px) {
  .match-hero {
    display: grid;
  }
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
