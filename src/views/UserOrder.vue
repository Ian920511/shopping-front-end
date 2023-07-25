<template>
  <div class="container py-5">
    <nav-tabs />
    <h1 class="mt-5">
      訂單資訊
    </h1>
    <BuyDetail v-if="currentUser.role === 'buyer'"/>
    <SellerDetail v-else-if="currentUser.role === 'seller'"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import NavTabs from './../components/NavTabs.vue'
import SellerDetail from '@/components/SellerDetail.vue';
import BuyDetail from '@/components/BuyDetail.vue';
import { useUserStore } from './../stores/userStore' 

export default defineComponent({
  components: {
    NavTabs,
    SellerDetail,
    BuyDetail
  },
  setup() {
    const userStore = useUserStore() 

    return {
      currentUser: userStore.currentUser
    }
  }
})
</script>