<template>
  <form class="mr-2 lg:mx-auto max-w-3xl w-full" @submit="handleSubmit">
    <label for="default-search" class="mb-2 text-sm font-medium sr-only text-white">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <MagnifyingGlassIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 ps-10 text-sm border-2 rounded-lg bg-gray-200 border-gray-600 placeholder-black text-black focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search Studies ..."
        v-model="search"
        ref="searchInput" />
      <button
        type="submit"
        class="hidden md:block text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-purpleHover hover:bg-purple focus:ring-blue-950">
        Search
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

  const emit = defineEmits(['search-value']);
  const search = ref("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    emit('search-value', search.value);
  };
</script>
