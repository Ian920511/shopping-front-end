<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col">
          Price
        </th>
        <th scope="col">
          Stock
        </th>
        <th scope="col">
          Status
        </th>
        <th
          scope="col"
          width="300"
        >
          操作
        </th>
      </tr>
    </thead>
    <tbody>
       <tr v-if="products.length === 0">
        <td colspan="4" class="text-center">沒有可用的產品</td>
      </tr>
      <tr
        v-for="product in products"
        :key="product.id"
      >
        <th scope="row">
          {{ product.id }}
        </th>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.status }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="`/products/${product.id}`"
            class="btn btn-link"
          >Show</router-link>

          <router-link
            :to="{ name: 'product-edit', params: { id: product.id }}"
            class="btn btn-link"
          >Edit</router-link>

          <button
            type="button"
            class="btn btn-link"
            @click.stop.prevent="deleteProduct(product.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, onMounted } from 'vue'
import userAPI from './../apis/user'
import productAPI from './../apis/product'
import { Toast } from '@/utils/helper'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const products = ref([])
    const route = useRoute()

    const fetchProducts = async () => {
      const userId = route.params.userId
      try {
        const { data } = await userAPI.getUserProduct({ userId })

        products.value = data
        
      } catch (error) {
        Toast.fire({
          icon:'error',
          title: '暫時無法獲得商家商品資訊，請稍後再試'
        })
      }
    }
    
    const deleteProduct  = async (productId) => {
      try {
        const { data } = await productAPI.deleteProduct({ productId })

         if (data.status === 'error') {
          throw new Error(data.message)
        }

        products.value = products.value.filter(
        product => product.id !== productId
      )
        Toast.fire({
          icon: 'success',
          title: '刪除餐廳成功'
        })


      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳，請稍後再試'
        })
      }
    }

    onMounted(fetchProducts)

    return {
      products,
      deleteProduct
    }
  }
}
</script>