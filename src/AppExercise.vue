<script setup>
import DashboardSettings from './components/Mockup/DashboardSettings.vue'
import UnitToggler from './components/Mockup/UnitToggler.vue'
import WeatherMockup from './components/Mockup/WeatherMockup.vue'
import WeatherParent from './components/Mockup/WeatherParent.vue'
import { useDisplaySettingStore } from './stores/displaySettingStore'

const displayStore = useDisplaySettingStore()
</script>

<template>
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
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/today-match" class="nav-item">⚽️ 금일 경기 일정</RouterLink>
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
  </div>

  <div class="app-container" :class="[displayStore.themeClass, displayStore.fontSizeClass]">
    <h1>⛅ 과제 5: 스토어 적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/today-match" class="nav-item">⚽️ 금일 경기 일정</RouterLink>
        <UnitToggler />
      </nav>
      <DashboardSettings />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style>
@import '@/assets/exercise.css';
</style>
