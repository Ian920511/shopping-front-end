<template>
  <div class="container py-5">
    <nav-tabs />
    <h1 class="mt-5">
      首頁  商品列表
    </h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NavTabs from './../components/NavTabs.vue'

export default defineComponent({
  components: {
    NavTabs
  }
})
</script>