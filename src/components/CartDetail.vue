<template>
  <table class="table table-bordered">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">商品名稱</th>
        <th scope="col">商品價格</th>
        <th scope="col">數量</th>
        <th scope="col" width="300">總價</th> 
      </tr>
    </thead>
    <tbody>
      <tr v-if="cart && cart.CartProducts && cart.CartProducts.length === 0">
        <td colspan="4" class="text-center">購物車是空的</td>
      </tr>

      <template v-for="(cartProduct) in cart.CartProducts" :key="cartProduct.id">
        <tr>
          <th scope="row">{{ cartProduct.Product.id }}</th>
          <td>{{ cartProduct.Product.name }}</td>
          <td>{{ cartProduct.Product.price }}</td>
          <td>
            <button @click="decreaseQuantity(cartProduct)">-</button>
            {{ cartProduct.quantity }}
            <button @click="increaseQuantity(cartProduct)">+</button>
          </td>
          <td>
            {{ cartProduct.Product.price * cartProduct.quantity }}
            <button @click="removeFromCart(cartProduct.Product.id)">刪除</button>
          </td>
          
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-left">購物車總和：</td>
        <td>{{ totalPrice }}</td>
      </tr>
    </tfoot>
  </table>
  <button @click="postOrder">下單</button>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import cartAPI from './../apis/cart'
import orderAPI from './../apis/order'
import { Toast } from '@/utils/helper'

export default {
  setup() {
    const cart = ref({
      CartProducts: []
    })

    const fetchCart = async () => {
      try {
        const { data } = await cartAPI.getCart()
        console.log(data)
        cart.value = data.cart
      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'無法取得購物車資訊，請稍後再試'
        })
      }
    }


    const increaseQuantity = async (product) => {
      product.quantity++;
      await updateCartProduct(product);
    }

    const decreaseQuantity = async (product) => {
      if (product.quantity > 1) {
        product.quantity--;
        await updateCartProduct(product);
      }
    }

    const updateCartProduct = async (product) => {
      try {
        await cartAPI.updateCart({ productId: product.Product.id, quantity: product.quantity });
        fetchCart()

      } catch (error) {
        Toast.fire({
          icon:'error',
          title:'更新購物車時出錯，請稍後再試'
        })
      }
    }

    const removeFromCart = async (productId) => {
      try {
        await cartAPI.deleteCartProduct({ productId });
        fetchCart();
        Toast.fire({
          icon: 'success',
          title: '商品已從購物車中移除'
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '刪除商品時出錯，請稍後再試'
        });
      }
    }

    const postOrder = async () => {
      try {
        await orderAPI.postOrders();
        cart.value = {}; 
        Toast.fire({
          icon: 'success',
          title: '下單成功'
        });
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '下單時出錯，請稍後再試'
        });
      }
    }

    const totalPrice = computed(() => {
      if (!cart.value.CartProducts) {
        return 0;
      }
      return cart.value.CartProducts.reduce((sum, product) => sum + product.Product.price * product.quantity, 0);
    }) 

    onMounted(async () => {
      cart.value = { CartProducts: [] }; 
      await fetchCart();
    })

    return {
      cart,
      totalPrice,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      postOrder
    }
  }
}
</script>

<style scoped>
.no-top-border {
  border-top: none !important;
}
</style>