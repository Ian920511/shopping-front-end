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
          type="account"
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

export default {
  setup() {
    const account = ref('')
    const password = ref('')

    const handleSubmit = () => {
      const data = JSON.stringify({
        account: account.value,
        password: password.value
      })

      console.log('data', data)
    }

    return {
      account,
      password,
      handleSubmit
    }
  },
}
</script>