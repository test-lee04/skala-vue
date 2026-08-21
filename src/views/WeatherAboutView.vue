<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="about-page">
    <span class="eyebrow">ABOUT MATCHCAST</span>
    <h1>축구 관람에 날씨라는 변수를 더합니다.</h1>
    <p class="lead">
      MatchCast는 경기 일정과 개최 도시의 날씨를 함께 확인할 수 있는 축구 경기 날씨 대시보드입니다.
    </p>

    <div class="feature-grid">
      <article>
        <strong>⚽ 경기 일정</strong>
        <p>경기 시간과 경기장 정보를 한눈에 확인합니다.</p>
      </article>
      <article>
        <strong>🌦️ 날씨 분석</strong>
        <p>현재 기온과 비·폭염 등 관람에 영향을 주는 요소를 제공합니다.</p>
      </article>
      <article>
        <strong>🌍 실시간 API</strong>
        <p>OpenWeather와 Open-Meteo 데이터를 활용해 예보와 대기질을 보여줍니다.</p>
      </article>
    </div>

    <button class="home-btn" @click="handleGoHome">대시보드 둘러보기</button>
  </section>
</template>

<style scoped>
.about-page {
  max-width: 760px;
  margin: 0 auto;
}

.eyebrow {
  color: #168653;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

h1 {
  max-width: 620px;
  margin: 7px 0 12px;
  color: inherit;
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 800;
  line-height: 1.2;
}

.lead {
  max-width: 650px;
  color: #6c7e76;
  font-size: 16px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 30px 0;
}

.feature-grid article {
  padding: 20px;
  background: #fff;
  border: 1px solid #dfe8e3;
  border-radius: 14px;
}

.feature-grid strong {
  font-size: 16px;
}

.feature-grid p {
  margin-top: 10px;
  color: #6c7e76;
  font-size: 13px;
}

.home-btn {
  padding: 11px 18px;
  background-color: #168653;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 680px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
