<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="product.name"
        type="text"
        class="form-control"
        name="name"
        placeholder="Enter name"
        required
      >
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select
        id="categoryId"
        class="form-control"
        name="categoryId"
        v-model="product.categoryId"
        required
      >
        <option
          value=""
          selected
          disabled
        >
          --請選擇--
        </option>
        <option 
          v-for="category in categories"
          :key="category.id"
          :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="price">Price</label>
      <input
        id="price"
        v-model="product.price"
        type="number"
        class="form-control"
        placeholder="Enter price"
        name="price"
      >
    </div>

    <div class="form-group">
      <label for="stock">Stock</label>
      <input
        id="stock"
        v-model="product.stock"
        type="number"
        class="form-control"
        placeholder="Enter stock"
        name="stock"
      >
    </div>

    <div class="form-label-group mb-3">
        <label for="role">Status</label>
        <select id="status" name="status" class="form-control" v-model="product.status" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        class="form-control"
        rows="3"
        name="description"
        v-model="product.description"
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="product.image"
        :src="product.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      >

      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      >
    </div>

    <button
      type="submit"
      class="btn btn-primary"
    >
      送出
    </button>
  </form>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import categoryAPI from './../apis/category'
import { Toast } from '@/utils/helper'

export default {
  props: {
    initialProduct: {
      type: Object,
      default: () => ({
        name: '',
        categoryId: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        status: '',
      })
    }
  },
  setup( props, { emit }) {
    // const product = ref({
    //   name: '',
    //   categoryId: '',
    //   tel: '',
    //   address: '',
    //   description: '',
    //   image: '',
    //   price: 0,
    //   stock: 0,
    //   status: '',
    // })

    const product = ref({ ...props.initialProduct })
    
    const categories = ref([])

    const fetchCategories = async () => {
      try {
        const { data } = await categoryAPI.getCategories()

        categories.value = data
      } catch (error) {
          Toast.fire({
            icon:'error',
            title: '無法獲得分類標籤，請稍後再試'
          })
        }
    }
    
    const handleFileChange =  (e) => {
      const files = e.target.files
      
      if (files.length === 0) {
        product.value.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])

        product.value.image = imageURL
      }
    }

    const handleSubmit = (e) => {
      const form = e.target
      const formData = new FormData(form)

      emit('after-submit', formData)
    }

    watch(() => props.initialProduct, (newVal) => {
      product.value = { ...newVal }
    }, { deep: true })
    

    onMounted(() => {
      fetchCategories()
    })


    return {
      product,
      categories,
      handleFileChange,
      handleSubmit
    }
  }
}
</script>