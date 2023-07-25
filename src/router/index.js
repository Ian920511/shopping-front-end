import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './../views/NotFound.vue'
import UserLogin from '../views/UserLogin.vue'
import Products from '../views/AllProducts'


const routes = [
  {
    path: "/login",
    name: "user-login",
    component: UserLogin,
  },
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/register",
    name: "user-register",
    component: () => import("../views/UserRegister.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: Products,
  },
  {
    path: "/products/new",
    name: "product-new",
    component: () => import("./../views/ProductNew.vue"),
  },
  {
    path: "/products/:id/edit",
    name: "product-edit",
    component: () => import("./../views/ProductEdit.vue"),
  },
  {
    path: "/products/:id",
    name: "product",
    component: () => import("./../views/OneProduct.vue"),
  },
  {
    path: "/users/profile",
    name: "user-profile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/users/:userId/products",
    name: "user-product",
    component: () => import("../views/UserProduct.vue"),
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
  routes,
  linkExactActiveClass: 'active',
})

export default router
