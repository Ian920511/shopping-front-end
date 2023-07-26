<template>
  <ul class="nav mb-4">
    <li class="nav-item me-3 ">
      <router-link
        class="nav-link"
        :to="generateLink()"
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
        :to="generateLink(category.id)"
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
      },
      keyword: { 
        type: String,
        default: ''
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      }
    },
    setup(props) {
    
    const generateLink = (categoryId = null) => {
      let query = {};

      if (categoryId) {
        query.categoryId = categoryId;
      }

      if (props.keyword) {
        query.keyword = props.keyword;
      }

      if (props.min && props.min !== 0) {
        query.min = props.min;
      }

      if (props.max && props.max !== 0) {
        query.max = props.max;
      }

      return {
        name: 'products',
        query: query
      };
    }
      return {
        generateLink
      }
    }
  });
</script>
