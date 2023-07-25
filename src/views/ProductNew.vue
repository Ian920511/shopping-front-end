<template>
 <div class="container py-5">
    <ProductForm @after-submit="handleAfterSubmit"/>
  </div>
</template>

<script>
import ProductForm from './../components/ProductForm.vue'


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

    return {
      handleAfterSubmit
    }
  }
}
</script>