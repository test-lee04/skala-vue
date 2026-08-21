<script setup>
import OpenWeatherMap from '../components/Mockup/OpenWeatherMap.vue'
</script>

<template>
  <section class="live-weather-page">
    <header class="page-heading">
      <span class="eyebrow">LIVE CONDITIONS</span>
      <h1>경기장 실시간 날씨</h1>
      <p>현재 날씨와 5일 예보, 대기질을 확인해 경기 관람 계획을 세워보세요.</p>
    </header>

    <OpenWeatherMap />
  </section>
</template>

<style scoped>
.page-heading {
  margin-bottom: 22px;
}

.eyebrow {
  color: #168653;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

h1 {
  margin: 5px 0 6px;
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 800;
}

.page-heading p {
  color: #6c7e76;
}
</style>
