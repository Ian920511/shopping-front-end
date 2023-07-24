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
          <a href="#">
            {{ product.name }}
          </a>
        </p>
        <span class="badge badge-secondary">{{ product.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ product.description }}
        </p>
        <h4 class="mt-2">
          <strong>價格:</strong> ${{ product.price }}
        </h4>
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
import { ref, toRefs } from 'vue'

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

    const addToCart = (productId) => {
      console.log(productId)
    }

    return {
      product,
      addToCart,
    }
  }
}
</script>