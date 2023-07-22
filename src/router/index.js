import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './../views/NotFound.vue'
import UserLogin from '../views/UserLogin.vue'


const routes = [
  {
    path: "/login",
    name: "user-login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "user-register",
    component: () => import('../views/UserRegister.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
