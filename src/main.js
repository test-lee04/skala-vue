import './assets/main.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 각각의 루트 컴포넌트를 주석을 통해 관리
import RootComponent from './App.vue'
// import RootComponent from './AppExam.vue'
// import RootComponent from './AppExercise.vue'

import router from './router'

const app = createApp(RootComponent)

app.use(createPinia())
app.use(router)

app.mount('#app')
