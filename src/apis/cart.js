import { apiHelper } from './../utils/helper'

export default {
  getCart () {
    return apiHelper.get('/carts')
  },

  postCart({ productId, quantity}) {
    return apiHelper.post('/carts', { productId, quantity })
  },

  updateCart({ productId, quantity }) {
    return apiHelper.put(`/carts/${productId}`, { quantity })
  },

  deleteCartProduct({ productId })  {
    return apiHelper.delete(`/carts/${productId}`)
  },

}