<template>
  <div class="container py-5">
    <nav-tabs />
    <h1 class="mt-5">
      購物車
    </h1>
    <cart-detail />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NavTabs from './../components/NavTabs.vue'
import CartDetail from '@/components/CartDetail.vue';

export default defineComponent({
  components: {
    NavTabs,
    CartDetail
  }
})
</script>