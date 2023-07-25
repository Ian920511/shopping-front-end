<template>
  <ul class="nav nav-tabs mb-4">
    <li 
      class="nav-item"
      v-for="tab in tabs"
      :key="tab.id"
    >
      <router-link
        :to="tab.path"
        class="nav-link router-link-exact-active router-link-active"
      >
        {{ tab.title }}
      </router-link>
    </li>
    <li 
      class="nav-item"
      v-if="currentUserRole === 'buyer'"
    >
      <router-link
        :to="'/carts'"
        class="nav-link router-link-exact-active router-link-active"
      >
        購物車
      </router-link>
    </li>
    <li 
      class="nav-item"
      v-else
    >
      <router-link  
        :to="`/users/${currentUserId}/products`"
        class="nav-link router-link-exact-active router-link-active"
      >
        商品資訊
      </router-link>
    </li>
  </ul>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useUserStore } from './../stores/userStore'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const tabs = ref([
      {
        id: uuidv4(),
        title: '首頁',
        path: '/products'
      },
      {
        id: uuidv4(),
        title: '使用者資訊',
        path: '/users/profile'
      },
      {
        id: uuidv4(),
        title: '訂單資訊',
        path: '/orders'
      },  
    ])

    return {
      tabs,
      currentUserId: userStore.currentUser.id,
      currentUserRole: userStore.currentUser.role
    }
  },
})
</script>