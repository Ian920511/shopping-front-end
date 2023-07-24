<template>
  <ul class="nav mb-4">
    <li class="nav-item me-3">
      <router-link
        class="nav-link"
        :to="{ name: 'products' }"
      >
        全部
      </router-link>
    </li>

    <li
      v-for="category in categories"
      :key="category.id"
      class="nav-item me-3"
    >
      <router-link
        class="nav-link"
        :to="{ name: 'products', query: { categoryId: category.id } }"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
  import { defineComponent } from 'vue';


  export default defineComponent({
    name: 'ProductNavPills',
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    

  });
</script>
