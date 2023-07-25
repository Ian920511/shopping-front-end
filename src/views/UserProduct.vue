<template>
  <div class="container py-5">
    <div class="mb-3">
      <NavTabs />
      <h1>商品資訊</h1>
    </div>

    <router-link
      :to="'/products/new'"
      class="btn btn-primary mb-4"
    >
      New Product
    </router-link>

    <SellerProduct />
  </div>
</template>

<script>
import SellerProduct from '@/components/SellerProduct.vue';
import NavTabs from './../components/NavTabs.vue'

export default {
  components: {
    SellerProduct,
    NavTabs,
  },
  

}
</script>