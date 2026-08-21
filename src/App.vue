<script setup>
import UnitToggler from './components/Mockup/UnitToggler.vue'
import { useDisplaySettingStore } from './stores/displaySettingStore'

const displayStore = useDisplaySettingStore()
</script>

<template>
  <div class="site-shell" :class="displayStore.themeClass">
    <div class="score-strip">
      <div class="layout-container">
        <span><b>LIVE</b> 경기 전 기상 정보를 확인하세요</span>
        <span class="score-strip-detail">서울 28℃ 맑음 · 수원 24℃ 비 · 부산 26℃ 구름</span>
      </div>
    </div>

    <header class="site-header">
      <div class="header-inner layout-container">
        <RouterLink to="/" class="brand">
          <span class="brand-mark">⚽</span>
          <span>
            <strong>MatchCast</strong>
            <small>축구와 날씨를 한눈에</small>
          </span>
        </RouterLink>

        <nav class="site-nav" aria-label="주요 메뉴">
          <RouterLink to="/">대시보드</RouterLink>
          <RouterLink to="/today-match">오늘의 경기</RouterLink>
          <RouterLink to="/live-weather">경기장 날씨</RouterLink>
          <RouterLink to="/favorites">관심 경기</RouterLink>
          <RouterLink to="/about">서비스 소개</RouterLink>
          <RouterLink to="/exercise">과제</RouterLink>
        </nav>

        <UnitToggler />
      </div>
    </header>

    <main class="site-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <div class="footer-inner layout-container">
        <div>
          <strong>⚽ MatchCast</strong>
          <p>경기 전 날씨를 확인하고 더 안전하게 응원하세요.</p>
        </div>
        <div class="footer-links">
          <RouterLink to="/about">서비스 소개</RouterLink
          ><RouterLink to="/exercise">과제 기록</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.site-shell {
  --site-bg: #f4f7f5;
  --site-surface: #ffffff;
  --site-text: #17352a;
  --site-muted: #6c7e76;
  --site-border: #dfe8e3;
  --site-primary: #168653;
  min-height: 100vh;
  color: var(--site-text);
  background: var(--site-bg);
}

.site-shell.dark-theme {
  --site-bg: #14231d;
  --site-surface: #1d3129;
  --site-text: #eef8f3;
  --site-muted: #a9bdb4;
  --site-border: #355247;
  --site-primary: #55d49a;
}

.layout-container {
  width: min(100% - 48px, 1180px);
  margin-inline: auto;
}

.score-strip {
  padding: 7px 0;
  color: #d8f7e8;
  font-size: 11px;
  background: #0d3e2b;
}

.score-strip .layout-container {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.score-strip b {
  padding: 2px 6px;
  margin-right: 7px;
  color: #092d20;
  background: #6ee7aa;
  border-radius: 999px;
}

.site-header {
  position: sticky;
  z-index: 20;
  top: 0;
  background: var(--site-surface);
  border-bottom: 1px solid var(--site-border);
  box-shadow: 0 4px 20px rgba(22, 70, 50, 0.05);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 22px;
  min-height: 76px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
  color: var(--site-text);
}

.brand:hover,
.site-nav a:hover {
  background: transparent;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  font-size: 22px;
  background: #e2f7ec;
  border-radius: 13px;
  place-items: center;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 19px;
}

.brand small {
  color: var(--site-muted);
  font-size: 11px;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.site-nav a {
  padding: 8px 12px;
  color: var(--site-muted);
  font-weight: 700;
  border-radius: 8px;
}

.site-nav a.router-link-exact-active {
  color: var(--site-primary);
  background: color-mix(in srgb, var(--site-primary) 12%, transparent);
}

.site-main {
  width: 100%;
  min-height: calc(100vh - 220px);
  padding: 54px max(24px, calc((100% - 1180px) / 2)) 80px;
  background:
    radial-gradient(circle at 8% 5%, rgba(70, 201, 136, 0.12), transparent 25%),
    radial-gradient(circle at 94% 30%, rgba(39, 125, 88, 0.08), transparent 22%), var(--site-bg);
}

.site-footer {
  padding: 30px 0;
  color: var(--site-muted);
  font-size: 13px;
  background: var(--site-surface);
  border-top: 1px solid var(--site-border);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.footer-inner strong {
  color: var(--site-text);
  font-size: 16px;
}
.footer-inner p {
  margin-top: 4px;
}
.footer-links {
  display: flex;
  gap: 18px;
}
.footer-links a {
  color: var(--site-muted);
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@media (max-width: 760px) {
  .site-header {
    position: static;
  }

  .header-inner {
    flex-wrap: wrap;
    gap: 12px;
    padding-block: 14px;
  }

  .site-nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .site-nav a {
    flex: 0 0 auto;
  }

  .site-main {
    padding: 34px 16px 52px;
  }

  .site-footer {
    padding: 24px 0;
  }

  .footer-inner {
    display: grid;
  }
  .score-strip-detail {
    display: none;
  }
  .layout-container {
    width: min(100% - 32px, 1180px);
  }
}
</style>
