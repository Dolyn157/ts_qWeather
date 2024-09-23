import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../HomeView.vue'
import Setting from '../Settings.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/setting', component: Setting },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
