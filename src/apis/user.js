import { apiHelper } from "@/utils/helper"

export default {
  getCurrentUser(){
    return apiHelper.get('/get_current_user')
  },

  getUserProduct ({ userId }) {
    return apiHelper.get(`/users/${userId}/products`)
  },

  getUserProfile ({ userId }) {
    return apiHelper.get(`/users/${userId}/profile`)
  },
  getUserOrders ({ userId }) {
    return apiHelper.get(`/users/${userId}/orders`)
  },
  updateUser({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },

}


