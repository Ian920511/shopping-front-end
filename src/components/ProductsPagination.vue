<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li 
        v-show="previousPage"
        :class="['page-item', { disabled: currentPage === 1 }]">
        <router-link
          class="page-link"
          aria-label="Previous"
          :to="{ name: 'products', query: { categoryId, page: previousPage, keyword, min, max }}"
        >
          <span aria-hidden="true">&laquo;</span>
        </router-link>
      </li>

      <li v-for="page in totalPage" :key="page" :class="['page-item', { active: activePage === page}]">
        <router-link
          class="page-link"
          :to="{ name: 'products', query: { categoryId, page}}"
        >
          {{ page }}
        </router-link>
      </li>
      

      <li 
        v-show="nextPage"
        :class="['page-item', { disabled: currentPage === totalPage.length }]">
        <router-link
          class="page-link"
          aria-label="Next"
          :to="{ name: 'products', query: { categoryId, page: nextPage, keyword, min, max }}"
        >
          <span aria-hidden="true">&raquo;</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent, watch, ref } from 'vue';
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'ProductsPagination',
  props: {
    categoryId: {
      type: [String, Number],
      default: ''
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Array,
      required: true
    },
    previousPage: {
      type: Number,
      required: true
    },
    nextPage: {
      type: Number,
      required: true
    },
    keyword: {
     type: String,
     default: ''
   },
   min: {
     type: [Number, String],
     default: 0
   },
   max: {
     type: [Number, String],
     default: 0
   }
  },
  setup() {
    const route = useRoute();

    const activePage = ref(parseInt(route.query.page || '1'));

    watch(() => route.query.page, (newVal) => {
        activePage.value = parseInt(newVal || '1')
    });

   

    return {
      activePage,
    };
}
});
</script>