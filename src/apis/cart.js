import { apiHelper } from './../utils/helper'

export default {
  getCart () {
    return apiHelper.get('/carts')
  },

  postCart() {
    return apiHelper.post('/carts')
  }
}