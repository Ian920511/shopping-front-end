<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Register
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model= "name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        >
      </div>

      <div class="form-label-group mb-2">
        <label for="account">Account</label>
        <input
          id="account"
          v-model= "account"
          name="account"
          type="text"
          class="form-control"
          placeholder="account"
          autocomplete="account"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model= "password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="address">Address</label>
        <input
          id="address"
          v-model= "address"
          name="address"
          type="text"
          class="form-control"
          placeholder="address"
          autocomplete="address-level4"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="tel">Tel</label>
        <input
          id="tel"
          v-model= "tel"
          name="tel"
          type="text"
          class="form-control"
          placeholder="tel"
          autocomplete="tel"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="role">Role</label>
        <select id="role" name="role" class="form-control" v-model="role" required>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      </div>

      <button
        class="btn btn-lg btn-primary d-block mx-auto mb-3"
        type="submit"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link :to="'/login'">
            Login
          </router-link>
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
    const tel = ref('')
    const address = ref('')
    const name = ref('')
    const role = ref('')

    const handleSubmit = () => {
      const data = JSON.stringify({
        account: account.value,
        password: password.value,
        tel: tel.value,
        address: address.value,
        name: name.value,
        role: role.value
      })

      console.log('data', data)
    }

    return {
      account,
      password,
      tel,
      address,
      name,
      role,
      handleSubmit
    }
  },
}
</script>