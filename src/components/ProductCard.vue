<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top img-fluid"
        :src="product.image"
        alt="Product image"
      >
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'product', params: { id: product.id }}">
            {{ product.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{ product.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ product.description }}
        </p>
        <h4 class="mt-2">
          <strong>價格:</strong> ${{ product.price }}
        </h4>
        <p>剩餘數量: {{product.stock}}</p>
        <button
            @click.prevent.stop='addToCart(product.id)'
            type="button"
            class="btn btn-primary"
        >
          加入購物車
        </button>
      </div>
    </div>
  </div>
</template> 

<script>
import { ref, toRefs, watch } from 'vue'
import { Toast } from './../utils/helper'
import cartAPI from './../apis/cart'

export default {
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // 使用 toRefs 將 props 轉化為響應式的物件
    const { initialProduct } = toRefs(props)

    // 使用 ref 創建一個新的響應式參考
    const product = ref(initialProduct.value)

    const addToCart = async (productId) => {
 
      try {
        await cartAPI.postCart({ productId, quantity: 1})
        
        Toast.fire({
          icon:'success',
          title: '成功加入購物車'
        })

      } catch (error) {
        Toast.fire({
          icon:'error',
          title: '暫時無法加入購物車，請稍後再試'
        })
      }
    }

     watch(initialProduct, (newValue) => {
      product.value = newValue
    })

    return {
      product,
      addToCart,
    }
  }
}
</script>