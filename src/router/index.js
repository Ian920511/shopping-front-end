import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './../views/NotFound.vue'
import UserLogin from '../views/UserLogin.vue'


const routes = [
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
