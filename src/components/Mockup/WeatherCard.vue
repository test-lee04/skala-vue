<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'
import { useFavoriteCityStore } from '../../stores/favoriteCityStore'
import { useWeatherAlertStore } from '../../stores/weatherAlertStore'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

// store 추가
const configStore = useConfigStore()
const favoriteStore = useFavoriteCityStore()
const alertStore = useWeatherAlertStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

const weatherAlert = computed(() => alertStore.getAlert(props.cityItem))
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}이(가) 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 33" class="weather-label hot">🥵 매우 더움</span>
    <span v-else-if="cityItem.temp >= 25" class="weather-label hot"> 🔥 더움 </span>
    <span v-else-if="cityItem.temp >= 11" class="weather-label cool">❄️ 선선함</span>
    <span v-else class="weather-label cool">❄️ 매우 추움</span>

    <span v-if="weatherAlert" class="alert-label" :class="weatherAlert.type">
      {{ weatherAlert.message }}
    </span>

    <div class="card-actions">
      <button
        class="favorite-btn"
        :aria-label="favoriteStore.isFavorite(cityItem.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'"
        @click.stop="favoriteStore.toggleFavorite(cityItem.id)"
      >
        {{ favoriteStore.isFavorite(cityItem.id) ? '⭐' : '☆' }}
      </button>
      <button class="btn-detail" @click.stop="emit('click-detail', cityItem.id)">상세보기</button>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  min-height: 92px;
  padding: 12px 150px 12px 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

.weather-label,
.alert-label {
  display: inline-block;
  padding: 3px 8px;
  margin-top: 4px;
  margin-right: 4px;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
}

.alert-label.danger {
  background: #c0392b;
}

.alert-label.cold {
  background: #356fa8;
}

.alert-label.rain {
  background: #587ea3;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.card-actions {
  position: absolute;
  right: 12px;
  top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.favorite-btn,
.btn-detail {
  position: static;
  width: auto;
  padding: 6px 10px;
  cursor: pointer;
  white-space: nowrap;
}

.favorite-btn {
  font-size: 16px;
  line-height: 1;
}

@media (max-width: 480px) {
  .weather-card {
    padding-right: 12px;
  }

  .card-actions {
    position: static;
    justify-content: flex-end;
    margin-top: 8px;
  }
}
</style>
