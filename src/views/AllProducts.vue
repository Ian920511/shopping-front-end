<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->

    <div class="row">
      <product-card 
        v-for="product in products"
        :key="product.id"
        :initial-product="product"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import NavTabs from './../components/NavTabs.vue'
import ProductCard from '@/components/ProductCard.vue';
import ProductsAPI from './../apis/product'
import { Toast } from '@/utils/helper';
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AllProducts',
  components: {
    NavTabs,
    ProductCard
  },
  setup() {
    const products = ref([])
    const categories = ref([])
    const categoryId = ref(-1)
    const currentPage = ref(1)
    const totalPage = ref([])
    const previousPage = ref(-1)
    const nextPage = ref(-1)

    const route = useRoute()

    const fetchProducts = async ({ queryPage, queryCategoryId }) => {
      try {
        const response = await ProductsAPI.getProducts({
          page: queryPage,
          categoryId: queryCategoryId
        })

        const { products: proData, categories: catData , categoryId: catId, currentPage: page, totalPage: tPage, previousPage: prePage, nextPage: nexPage } = response.data

        products.value = proData
        categories.value = catData
        categoryId.value = catId
        currentPage.value = page
        totalPage.value = tPage
        previousPage.value = prePage
        nextPage.value = nexPage
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法獲得商品資訊，請稍後再試'
        })
      }
    }

    onMounted(() => {
      const { page = '', categoryId: catId = ''} = route.query

      fetchProducts({ queryPage: page, queryCategoryId: catId })
    })

    watch(() => route.query, (newQuery) => {
      const { page = '', categoryId: catId = ''} = newQuery

      fetchProducts({ queryPage: page, queryCategoryId: catId })
    })

    return {
      products,
      categories,
      categoryId,
      currentPage,
      totalPage,
      previousPage,
      nextPage,
      fetchProducts,
    }
  }
})
</script>