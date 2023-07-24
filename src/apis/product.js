import { apiHelper } from './../utils/helper'

export default {
  getProducts ( { page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId})
    console.log(searchParams)
    return apiHelper.get(`/products?${searchParams.toString()}`)
  },
  getProduct({ productId }) {
    return apiHelper.get(`/products/${productId}`)
  },
}