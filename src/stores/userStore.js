import { defineStore } from 'pinia'
import usersAPI from './../apis/users'

export const useUserStore = defineStore({
  id: 'user',

  state: () => ({
    currentUser: {
      id: -1,
      name: '',
      account: '',
      password: '',
      tel: '',
      address: '',
      role: 'buyer',
    },
    isAuthenticated: false,
    token : '',
  }),

  getters: {},
  
  actions: {
    async findCurrentUser() {
      try {
        const { data } = await usersAPI.getCurrentUser()

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const { id, name, account, password, tel, address, role } = data

        this.setCurrentUser({ id, name, account, password, tel, address, role })

      } catch (error) {
        console.log(error.message)
        this.revokeAuthentication()
        return false
      }
    },

    setCurrentUser(currentUser) {
      this.currentUser = {
        ...this.currentUser,
        ...currentUser
      }
      this.isAuthenticated = true
      console.log(this.isAuthenticated);
      this.token = localStorage.getItem('token')
    },

    revokeAuthentication() {
      this.currentUser = {}
      this.isAuthenticated = false
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})