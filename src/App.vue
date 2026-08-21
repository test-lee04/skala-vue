<script setup>
import AppExercise from './AppExercise.vue'
import OpenWeatherMap from './components/Mockup/OpenWeatherMap.vue'
import { useDisplaySettingStore } from './stores/displaySettingStore'

const displayStore = useDisplaySettingStore()
</script>

<template>
  <AppExercise />

  <div class="app-container" :class="[displayStore.themeClass, displayStore.fontSizeClass]">
    <h1>⛅ 과제 6: 외부 날씨 API 적용</h1>
    <hr />
    <OpenWeatherMap />
  </div>
</template>

<style>
@import '@/assets/exercise.css';

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
