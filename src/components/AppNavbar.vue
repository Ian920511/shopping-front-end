<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark p-3">
    <router-link
      class="navbar-brand"
      to="/"
    >
      Shopping 購物網
    </router-link>

    <button
      class="navbar-toggler "
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent" 
      class="navbar-collapse collapse d-flex align-items-center justify-content-end"
    >
      <div class="ml-auto d-flex align-items-center">
        <template v-if="isAuthenticated">
          <router-link
              to="#" 
              class="text-white mx-3"
              v-if="currentUser.role === 'buyer'"
          >
          我要成為賣家
          </router-link>

          <router-link
                to="#" 
                class="text-white mx-3"
                v-if="currentUser.role === 'seller'"
            >
            我要成為買家
          </router-link>

        
          <router-link
              to="#" 
              class="text-white mx-3"
          > 
           {{ currentUser.name || '使用者' }} 您好
         </router-link>
         <button
           type="button" 
           class="btn btn-sm btn-outline-success my-2 my-sm-0"
           @click="logout"
          >
           登出
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from './../stores/userStore'
import { computed } from 'vue'

export default {
  setup() {
    const router  = useRouter()
    const userStore = useUserStore()
    const currentUser = computed(() => userStore.currentUser)
    const isAuthenticated = computed(() => userStore.isAuthenticated)

    const logout = () => {
      userStore.revokeAuthentication()
      router.push('/login')
    }

    return {
      currentUser,
      isAuthenticated,
      logout
    }
  },
  
}
</script>