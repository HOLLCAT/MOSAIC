<template>
    <form class="mt-4 border rounded-s-lg ">
        <h3 class="sr-only">Categories</h3>
        <ul role="list" class="px-2 py-3 font-medium text-gray-900">
          <li>
            <a href="#" class="block px-2">Filter</a>
          </li>
        </ul>
        <FilterComponent name="Year" />
    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FilterComponent from '@/components/FilterComponent.vue';

export default defineComponent({
  name: 'SearchFilter',
  components: {
    FilterComponent,
  },
});
</script>