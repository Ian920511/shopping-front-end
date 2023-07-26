<template>
  <NavTabs />
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ product.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ product.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block" 
        :src="product.image"
        style="width: 250px;margin-bottom: 25px;"
      >
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong class="h4 d-inline-block mr-2">Price:</strong>
            <span class="h2">{{ product.price }}</span>
          </li>
          <li>
            <strong class="h4 d-inline-block mr-2">Stock:</strong>
            <span class="h2">{{ product.stock }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ product.description }}</p>

      <div class="mb-3">
        <button @click="decreaseQuantity">-</button>
        <input 
          type="number" 
          v-model="quantity" 
          min="1" 
          :max="product.stock" 
          @input="checkStock"
        >
        <button @click="increaseQuantity">+</button>
      </div>

      <button
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.prevent.stop='addToCart(product.id)'
      >
        加到購物車
      </button>
    </div>
  </div>
</template>

<script>
  import { reactive, watch, ref } from 'vue'
  import { Toast } from './../utils/helper'
  import cartAPI from './../apis/cart'
  import NavTabs from './../components/NavTabs.vue'

  export default {
  name: 'ProductDetail',
  components: {
    NavTabs,
  },
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const product = reactive({ ...props.initialProduct })
    const quantity = ref(1)

    const decreaseQuantity = () => {
        if(quantity.value > 1) quantity.value--
      }

    const increaseQuantity = () => {
        if(quantity.value < product.stock) quantity.value++
      }
    const checkStock = () => {
        if (quantity.value > product.stock) {
          Toast.fire({
            icon: 'warning',
            title: '所選數量超過庫存！'
          })
          quantity.value = product.stock
        }
      }

    watch(() => props.initialProduct, (newValue) => {
      console.log("initialProduct updated:", newValue);
      Object.assign(product, newValue)
    })

    const addToCart = async (productId) => {
      console.log(quantity.value)


      if (quantity.value > product.stock) {
          Toast.fire({
            icon:'warning',
            title:'庫存不足！'
          })
          return
        }
      try {
        const { data } = await cartAPI.getCart()
        const existItem = data.cart.CartProducts.find(item => item.productId === productId)

        if (existItem) {
          quantity.value += existItem.quantity
          await cartAPI.updateCart({ productId, quantity: quantity.value })
        } else {
          await cartAPI.postCart({ productId, quantity: quantity.value })
        }

        Toast.fire({
          icon:'success',
          title: '成功加入購物車'
        })


      } catch (error) {
        console.log(error)
        Toast.fire({
          icon:'error',
          title: '暫時無法加入購物車，請稍後再試'
        })
      }
    }

    return {
      product,
      quantity,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      checkStock
    }
  }
}

</script>