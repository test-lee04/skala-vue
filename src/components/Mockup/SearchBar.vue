<script setup>
defineEmits(['update-query'])

defineProps({
    currentQuery:{
        type: String,
        default: '',
    }
})
</script>

<template>
  <div class="search-content">
    <h3>🔍 도시 검색</h3>
    <input
      type="text"
      :value="currentQuery"
      placeholder="검색할 도시 이름 입력"
      @input="$emit('update-query', $event.target.value)"
    />
    <p>검색 중인 도시: <strong>{{ currentQuery }}</strong></p>
  </div>
</template>

<style scoped>
.search-content h3 {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.search-content input {
  display: block;
  width: 100%;
}

.search-content p {
  margin-top: 3px;
  font-size: 12px;
}

.search-content strong {
  font-weight: 700;
}
</style>
