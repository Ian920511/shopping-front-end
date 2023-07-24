<template>
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
            <strong>Price:</strong>
            {{ product.price }}
          </li>
          <li>
            <strong>Stock:</strong>
            {{ product.stock }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ product.description }}</p>

      <button
        type="button"
        class="btn btn-primary btn-border mr-2"
      >
        加到購物車
      </button>
    </div>
  </div>
</template>

<script>
  import { reactive, watch } from 'vue'

  export default {
  name: 'ProductDetail',
  props: {
    initialProduct: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const product = reactive({ ...props.initialProduct })

  watch(() => props.initialProduct, (newValue) => {
    console.log("initialProduct updated:", newValue);
    Object.assign(product, newValue)
  })

    return {
      product,
    }
  }
}

</script>