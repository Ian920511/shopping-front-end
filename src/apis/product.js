import { apiHelper } from './../utils/helper'

export default {
  getProducts ( { page, categoryId, keyword, min, max}) {
    const searchParams = new URLSearchParams({ page, categoryId })
    if (keyword) searchParams.append("keyword", keyword);
    if (min) searchParams.append("min", min);
    if (max) searchParams.append("max", max);
    
    return apiHelper.get(`/products?${searchParams.toString()}`)
  },
  getProduct({ productId }) {
    return apiHelper.get(`/products/${productId}`)
  },

  deleteProduct({ productId }) {
    return apiHelper.delete(`/products/${productId}`)
  },

  updateProduct({ productId, formData }) {
    return apiHelper.put(`/products/${productId}`, formData)
  }
}