<template>
  <div class="container py-5">
    <nav-tabs />
    <h1 class="mt-5">
      使用者資訊
    </h1>
    <form class="w-100" @submit.stop.prevent="handleSubmit">
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
          disabled
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

      <div class="form-label-group mb-2">
        <label for="account">Role</label>
        <input
          id="role"
          v-model= "role"
          name="role"
          type="text"
          class="form-control"
          placeholder="role"
          autocomplete="role"
          required
          disabled
        >
      </div>

      <button
        class="btn btn-lg btn-primary d-block mx-auto mb-3"
        type="submit"
      >
        Edit
      </button>
      <button
        class="btn btn-lg btn-secondary d-block mx-auto mb-3"
        type="button"
        @click="handleCancel"
      >
        Cancel
      </button>
    </form>
  </div>
  
</template>

<script>
import { defineComponent } from 'vue'
import NavTabs from './../components/NavTabs.vue'
import { ref, onMounted } from 'vue'
import { useUserStore } from './../stores/userStore'
import { Toast } from './../utils/helper'
import userAPI from './../apis/user'

export default defineComponent({
  components: {
    NavTabs
  },
  setup() {
    const userStore = useUserStore()

    const name = ref(userStore.currentUser.name)
    const account = ref(userStore.currentUser.account)
    const address = ref(userStore.currentUser.address)
    const tel = ref(userStore.currentUser.tel)
    const role = ref(userStore.currentUser.role)

    const originalName = ref('')
    const originalAddress = ref('')
    const originalTel = ref('')

    const fetchUserProfile = async () => {
      try {
        const { data } = await userAPI.getUserProfile({ userId: userStore.currentUser.id })
        name.value = data.name
        account.value = data.account
        address.value = data.address
        tel.value = data.tel
        role.value = data.role

        originalName.value = data.name
        originalAddress.value = data.address
        originalTel.value = data.tel

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '獲取用戶資料失敗'
        })
      }
    }

    const handleSubmit = async () => {
      try {
        const userData = {
          name: name.value,
          address: address.value,
          tel: tel.value,
        }

        const { data } = await userAPI.updateUser({ userId: userStore.currentUser.id, formData: userData })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        name.value = data.name
        address.value = data.address
        tel.value = data.tel

        userStore.currentUser.name = name.value
        userStore.currentUser.address = address.value
        userStore.currentUser.tel = tel.value

        Toast.fire({
          icon: 'success',
          title: '更新用戶資料成功'
        })

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: error.message || '更新用戶資料失敗'
        })
      }
    }

    const handleCancel = () => {
      name.value = originalName.value
      address.value = originalAddress.value
      tel.value = originalTel.value
    }

    onMounted(() => {
      fetchUserProfile()
    })

    return {
      name,
      account,
      address,
      tel,
      role,
      handleSubmit,
      handleCancel,
    }
  },
})
</script>