<template>
  <div class="container py-5">
    <NavTabs />
    <product-nav-pills 
    :categories="categories" 
    :keyword="keyword"
    :min="min"
    :max="max"
    />

    <div class="search-section my-4 row">
      
      <!-- 名稱查詢 column -->
      <div class="col-md-4 d-flex align-items-center ">
        <label for="nameSearch" class="mr-2">名稱查詢:</label>
        <input 
          id="nameSearch"
          type="text" 
          v-model="keyword" 
          placeholder="Search by product name" 
          class="form-control"
          style="max-width: 60%;"
        />
      </div>


      <div class="col-md-6 d-flex align-items-center">
        <label for="minPrice" class="mr-2" style="min-width: 20%;">金額查詢:</label>
        <div class="price-range d-inline-flex">
          <input 
            id="minPrice"
            type="number" 
            v-model="min" 
            placeholder="Min Price" 
            class="form-control me-2"
            style="max-width: 30%;"
          />
          <span class="mx-3">-</span>
          <input 
            type="number" 
            v-model="max" 
            placeholder="Max Price" 
            class="form-control me-3"
            style="max-width: 30%;"
          />
        </div>
        <button @click="limitSearch" class="btn btn-primary ms-2">Search</button>
      </div>
    </div>

    <div class="row">
      <product-card 
        v-for="product in products"
        :key="product.id"
        :initial-product="product"
      />
    </div>

    <products-pagination 
      :currentPage="currentPage"
      :totalPage="totalPage"
      :categoryId="categoryId"
      :previousPage="previousPage"
      :nextPage="nextPage"
      :keyword="keyword"
      :min="min"
      :max="max"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue'
import NavTabs from './../components/NavTabs.vue'
import ProductCard from '@/components/ProductCard.vue';
import ProductNavPills from '@/components/ProductNavPills.vue';
import ProductsPagination from '@/components/ProductsPagination.vue';
import ProductsAPI from './../apis/product'
import { Toast } from '@/utils/helper';
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
  name: 'AllProducts',
  components: {
    NavTabs,
    ProductCard,
    ProductNavPills,
    ProductsPagination,
  },
  setup() {
    const products = ref([])
    const categories = ref([])
    const categoryId = ref(-1)
    const currentPage = ref(1)
    const totalPage = ref([])
    const previousPage = ref(-1)
    const nextPage = ref(-1)
    const keyword = ref('')
    const min = ref(0)
    const max = ref(0)


    const route = useRoute()
    const router = useRouter()

    const fetchProducts = async ({ queryPage, queryCategoryId }) => {
      try {
        const { keyword: queryKeyword = '', min: queryMin = 0, max: queryMax = 0 } = route.query

        const response = await ProductsAPI.getProducts({
          page: queryPage,
          categoryId: queryCategoryId,
          keyword: queryKeyword,  
          min: queryMin,
          max: queryMax 
        })

        const { products: proData, categories: catData , categoryId: catId, page, totalPage: tPage, prev: prePage, next: nexPage } = response.data

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

    const limitSearch = () => {
      const { page, categoryId: catId } = route.query;

      let queryParams = {
        page: page,
        categoryId: catId,
        keyword: keyword.value,
      };

      if (min.value > 0) queryParams.min = min.value;
      if (max.value > 0) queryParams.max = max.value;

      router.push({
        path: '/products',
        query: queryParams
      })

      console.log("Route pushed with: ", queryParams)
    }

    onMounted(() => {
      const { page = '', categoryId: catId = ''} = route.query

      fetchProducts({ queryPage: page, queryCategoryId: catId })
    })

    watch(() => route.query, (newQuery) => {
      console.log("Route query changed:", newQuery);
      const { page = '', categoryId: catId = ''} = newQuery
      console.log("Route changed to: ", newQuery)

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
      keyword,  
      min,     
      max,      
      limitSearch 
    }
  }
})
</script>