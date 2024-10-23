import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../components/HomeView.vue'
import Setting from '../components/Settings.vue'
import Details from '../components/Details/Details.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/setting', component: Setting },
  { path: '/details', component: Details },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
