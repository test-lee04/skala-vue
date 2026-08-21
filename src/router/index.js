import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('../views/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('../views/WeatherDetailView.vue'),
  },
  {
    path: '/today-match',
    alias: '/todayMatch',
    name: 'TodayMatch',
    component: () => import('../views/TodayMatch.vue'),
  },
  {
    path: '/live-weather',
    name: 'LiveWeather',
    component: () => import('../views/FootballWeatherView.vue'),
  },
  {
    path: '/matches/:matchId',
    name: 'MatchDetail',
    component: () => import('../views/MatchDetailView.vue'),
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoriteMatchesView.vue'),
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: () => import('../AppExercise.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, left: 0 }
  },
})

export default router
