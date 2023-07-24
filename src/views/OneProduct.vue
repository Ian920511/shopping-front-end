<template>
  <div class="container py-5">
    <ProductDetail :initial-product="product" />
    <hr>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router';
import productAPI from './../apis/product'
import { Toast } from '@/utils/helper';
import ProductDetail from './../components/ProductDetail.vue'

export default {
  components: {
    ProductDetail
  },
  setup() {
    const product = ref ({
      id: -1,
      name: '',
      categoryName: '',
      image: '',
      price: -1,
      description: '',
    })

    const route  = useRoute()

    const fetchProduct = async (productId) => {
      try {
        const { data } = await productAPI.getProduct({ productId })

        const { id, name, image, Category, description, price, stock } = data

        product.value = {
          id, name, image, categoryName: Category ? Category.name : '未分類', description, price, stock
        }
        
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        })
      }
    }

    onMounted(() => {
      const { id } = route.params

      fetchProduct(id)
    })

    watch(route, (to) => {
      const { id } = to.params

      fetchProduct(id)
    })

    return {
      product
    }


  },
}
</script>