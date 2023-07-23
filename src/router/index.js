import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './../views/NotFound.vue'
import UserLogin from '../views/UserLogin.vue'


const routes = [
  {
    path: "/",
    name: "root",
    redirect: '/products',
  },
  {
    path: "/login",
    name: "user-login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "user-register",
    component: () => import("../views/UserRegister.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/AllProducts.vue"),
  },
  {
    path: "/carts",
    name: "user-cart",
    component: () => import("../views/UserCart.vue"),
  },
  {
    path: "/orders",
    name: "user-order",
    component: () => import("../views/UserOrder.vue"),
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
