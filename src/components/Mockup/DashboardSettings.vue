<script setup>
import { useDisplaySettingStore } from '../../stores/displaySettingStore'
import { useFavoriteCityStore } from '../../stores/favoriteCityStore'
import { useWeatherAlertStore } from '../../stores/weatherAlertStore'

const displayStore = useDisplaySettingStore()
const favoriteStore = useFavoriteCityStore()
const alertStore = useWeatherAlertStore()
</script>

<template>
  <section class="settings-panel">
    <div class="setting-group">
      <strong>⭐ 즐겨찾기 {{ favoriteStore.favoriteCount }}개</strong>
      <button :disabled="favoriteStore.favoriteCount === 0" @click="favoriteStore.clearFavorites">
        전체 해제
      </button>
    </div>

    <div class="setting-group alert-settings">
      <strong>⚠️ 위험 알림</strong>
      <label>
        폭염
        <input
          type="number"
          :value="alertStore.hotThreshold"
          @change="alertStore.setHotThreshold($event.target.value)"
        />
        ℃ 이상
      </label>
      <label>
        한파
        <input
          type="number"
          :value="alertStore.coldThreshold"
          @change="alertStore.setColdThreshold($event.target.value)"
        />
        ℃ 이하
      </label>
      <label>
        <input
          type="checkbox"
          :checked="alertStore.rainAlertEnabled"
          @change="alertStore.setRainAlertEnabled($event.target.checked)"
        />
        비 알림
      </label>
      <button @click="alertStore.resetAlertSettings">초기화</button>
    </div>

    <div class="setting-group">
      <strong>🎨 화면 설정</strong>
      <button @click="displayStore.toggleTheme">
        {{ displayStore.isDarkMode ? '라이트 모드' : '다크 모드' }}
      </button>
      <select
        :value="displayStore.fontSize"
        aria-label="글자 크기"
        @change="displayStore.setFontSize($event.target.value)"
      >
        <option value="small">작게</option>
        <option value="medium">보통</option>
        <option value="large">크게</option>
      </select>
      <button @click="displayStore.resetDisplaySettings">초기화</button>
    </div>
  </section>
</template>

<style scoped>
.settings-panel {
  display: grid;
  gap: 10px;
  padding: 12px;
  margin-bottom: 16px;
  background: var(--settings-background, #f7f9fa);
  border: 1px solid var(--settings-border, #e2e7eb);
  border-radius: 8px;
}

.setting-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.setting-group strong {
  margin-right: auto;
}

.setting-group button,
.setting-group select,
.setting-group input {
  padding: 5px 8px;
  color: inherit;
  background: var(--control-background, #fff);
  border: 1px solid var(--settings-border, #cbd3da);
  border-radius: 4px;
}

.setting-group button {
  cursor: pointer;
}

.setting-group button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.alert-settings label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.alert-settings input[type='number'] {
  width: 60px;
}

.alert-settings input[type='checkbox'] {
  width: auto;
}
</style>
