<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop='handleSubmit'>
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Account</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="form-control"
          placeholder="account"
          autocomplete="username"
          required
          autofocus
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        >
      </div>

      <button
        class="btn btn-lg btn-primary d-block mx-auto mb-3" 
        type="submit"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link :to="'/register'">Register</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2023-2023
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './../stores/userStore'
import authorizationAPI from './../apis/authorization'
import { Toast } from './../utils/helper'

export default {
  setup() {
    const account = ref('')
    const password = ref('')

    const router = useRouter()
    const userStore = useUserStore()

    const handleSubmit =  async () => {
      try {
        if (!account.value || !password.value) {
          Toast.fire({
            icon: 'warning',
            title: '請填入帳號 和 密碼'
          })

          return
        }

        const response = await authorizationAPI.login({
          account: account.value,
          password: password.value
        })

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.token)

        userStore.setCurrentUser(data.user)
        
        router.push('/products')
      } catch (error) {
        password.value = ''

        Toast.fire({
          icon: 'error',
          title: '請確認您輸入了正確的帳號及密碼'
        })
      }
    }

    return {
      account,
      password,
      handleSubmit
    }
  },
}
</script>