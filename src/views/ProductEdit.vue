<template>
  <div class="container py-5">
    <ProductForm @after-submit="handleAfterSubmit" :initial-product="product"/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProductForm from './../components/ProductForm.vue'
import productAPI from '@/apis/product'
import { Toast } from '@/utils/helper'

export default {
  components: {
    ProductForm
  },
  setup() {
    const handleAfterSubmit = (formData) => {

      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }

    const product = ref({
      id: -1,
      name: '',
      categoryId: '',
      description: '',
      image: '',
      price: 0,
      stock: 0,
      status: '',
    })
    
    const router = useRouter()

    const fetchProduct = async (productId) => {
      try {
        const { data } = await productAPI.getProduct({ productId })

        product.value = {
          ...product.value,
          ...data
        }
      } catch (error) {
        Toast.fire({
          icon:'error',
          title: '無法取得商品資訊，請稍後再試'
        })
      }

    }

    onMounted(() => {
      const { id } = router.currentRoute.value.params
      fetchProduct(id)
    })



    return {
      handleAfterSubmit,
      product
    }
  }
}
</script>