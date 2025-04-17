import { createRouter, createWebHistory } from 'vue-router'
// import LoginPage from '@/views/LoginPage.vue'
// import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/components/LoginPage.vue'
import HomePage from '@/components/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
