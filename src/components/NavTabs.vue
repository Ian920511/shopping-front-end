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
  </ul>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default defineComponent({
  setup() {
    const tabs = ref([
      {
        id: uuidv4(),
        title: '首頁',
        path: '/products'
      },
      {
        id: uuidv4(),
        title: '使用者資訊',
        path: '/users/:userId/profile'
      },
      {
        id: uuidv4(),
        title: '購物車',
        path: '/carts'
      },
      {
        id: uuidv4(),
        title: '訂單資訊',
        path: '/orders'
      },
      
    ])

    return {
      tabs,
    }
  },
})
</script>