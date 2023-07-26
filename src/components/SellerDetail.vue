<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          商品名稱
        </th>
        <th scope="col">
          商品價格
        </th>
        <th scope="col">
          數量
        </th>
        <th
          scope="col"
          width="300"
        >
          總價
        </th>
      </tr>
    </thead>
    <tbody>
       <tr v-if="!orders.length | orders.length === 0">
        <td colspan="4" class="text-center">沒有任何訂單</td>
      </tr>
      <tr
        v-else
        v-for="order in orders"
        :key="order.id"
      >
        <th scope="row">
          {{ order.id }}
        </th>
        <td>{{ order.Product.name }}</td>
        <td>{{ order.price }}</td>
        <td>{{ order.quantity }}</td>
        <td>{{ order.Order.totalPrice }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, onMounted } from 'vue'
import userAPI from '../apis/user'
import { Toast } from '@/utils/helper'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const orders = ref([])
    const route = useRoute()

    const fetchOrders = async () => {
      const userId = route.params.userId
      try {
        const { data } = await userAPI.getUserOrders({ userId })

        orders.value = data
        
      } catch (error) {
        Toast.fire({
          icon:'error',
          title: '暫時無法獲得商家商品資訊，請稍後再試'
        })
      }
    }

    onMounted(fetchOrders)

    return {
      orders,
    }
  }
}
</script>