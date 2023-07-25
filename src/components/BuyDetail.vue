<template>
  <table class="table table-bordered">
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
       <tr v-if="orders.length === 0">
        <td colspan="4" class="text-center">沒有任何訂單</td>
      </tr>

      <template v-for="order in orders">
        <tr
          v-for="(orderDetail, index) in order.OrderDetails"
          :key="orderDetail.id"
          :class="{ 'border-bottom': index === order.OrderDetails.length - 1 }"
        >
          <th v-if="index === 0" :rowspan="order.OrderDetails.length" scope="row">
            {{ order.id }}
          </th>
          <td>{{ orderDetail.Product.name }}</td>
          <td>{{ orderDetail.price }}</td>
          <td>{{ orderDetail.quantity }}</td>
          <td v-if="index === order.OrderDetails.length - 1" class="no-top-border" :rowspan="order.OrderDetails.length">{{ order.totalPrice }}</td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-left">所有訂單總和：</td>
        <td>{{ totalOrderPrice }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import userAPI from './../apis/user'
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

    const totalOrderPrice = computed(() => {
      return orders.value.reduce((sum, order) => sum + order.totalPrice, 0);
    });

    onMounted(fetchOrders)

    return {
      orders,
      totalOrderPrice
    }
  }
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 2px solid black;
}
.no-top-border {
  border-top: none !important;
}

</style>

