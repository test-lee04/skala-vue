<script setup>
import DashboardSettings from './components/Mockup/DashboardSettings.vue'
import OpenWeatherMap from './components/Mockup/OpenWeatherMap.vue'
import UnitToggler from './components/Mockup/UnitToggler.vue'
import WeatherMockup from './components/Mockup/WeatherMockup.vue'
import WeatherParent from './components/Mockup/WeatherParent.vue'
import { useDisplaySettingStore } from './stores/displaySettingStore'

const displayStore = useDisplaySettingStore()
</script>

<template>
  <section class="exercise-page">
    <header class="exercise-heading">
      <RouterLink to="/">← MatchCast로 돌아가기</RouterLink>
      <p>LEARNING ARCHIVE</p>
      <h1>Vue 과제 진행 과정</h1>
      <span>Mockup부터 Router, Store, 외부 API까지 단계별 결과를 모았습니다.</span>
    </header>
    <div class="app-container">
      <h1>⛅ 과제 1: 날씨 (Mockup)</h1>
      <hr />
      <WeatherMockup />
    </div>

    <div class="app-container">
      <h1>⛅ 과제 2: 날씨 (컴포지션)</h1>
      <hr />
      <WeatherMockup />
    </div>

    <div class="app-container">
      <h1>⛅ 과제 3: 날씨 (컴포넌트)</h1>
      <hr />
      <WeatherParent />
    </div>

    <div class="app-container">
      <h1>⛅ 과제 4: 라우터 적용</h1>
      <hr />
      <div class="dashboard-wrapper">
        <nav class="navigation-bar">
          <span class="nav-item active">🌦️ 날씨 대시보드</span>
          <span class="divider">|</span>
          <span class="nav-item">ℹ️ 서비스 소개</span>
          <span class="divider">|</span>
          <span class="nav-item">⚽️ 금일 경기 일정</span>
        </nav>
        <WeatherParent />
      </div>
    </div>

    <div class="app-container" :class="[displayStore.themeClass, displayStore.fontSizeClass]">
      <h1>⛅ 과제 5: 스토어 적용</h1>
      <hr />
      <div class="dashboard-wrapper">
        <nav class="navigation-bar">
          <span class="nav-item active">🌦️ 날씨 대시보드</span>
          <span class="divider">|</span>
          <span class="nav-item">ℹ️ 서비스 소개</span>
          <span class="divider">|</span>
          <span class="nav-item">⚽️ 금일 경기 일정</span>
          <UnitToggler />
        </nav>
        <DashboardSettings />
        <WeatherParent />
      </div>
    </div>

    <div class="app-container" :class="[displayStore.themeClass, displayStore.fontSizeClass]">
      <h1>⛅ 과제 6: 외부 날씨 API 적용</h1>
      <hr />
      <OpenWeatherMap />
    </div>
  </section>
</template>

<style>
@import '@/assets/exercise.css';

.exercise-heading {
  max-width: 900px;
  padding: 24px;
  margin: 0 auto 20px;
  background: var(--site-surface);
  border: 1px solid var(--site-border);
  border-radius: 14px;
}
.exercise-heading a {
  color: #168653;
  font-weight: 800;
}
.exercise-heading p {
  margin-top: 20px;
  color: #168653;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
}
.exercise-heading h1 {
  margin: 4px 0;
}
.exercise-heading span {
  color: var(--site-muted);
}
.app-container.dark-theme {
  --settings-background: #253342;
  --settings-border: #526274;
  --control-background: #34495e;
  color: #e7edf3;
  background: #1f2b38;
}

.app-container.dark-theme h1,
.app-container.dark-theme h3,
.app-container.dark-theme h4 {
  color: #f2f5f7;
}

.app-container.dark-theme .navigation-bar,
.app-container.dark-theme .panel,
.app-container.dark-theme .weather-card,
.app-container.dark-theme .detail-container {
  color: #e7edf3;
  background: #2b3b4c;
  border-color: #526274;
}

.app-container.dark-theme .info-card {
  color: #e7edf3;
  background: #34495e;
}

.app-container.font-small :is(p, span, button, input, select, label, a) {
  font-size: 12px;
}

.app-container.font-large :is(p, span, button, input, select, label, a) {
  font-size: 17px;
}
</style>
