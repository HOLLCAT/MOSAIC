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
        class="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search Studies ..."
        required
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
  import { useRouter } from "vue-router";
  import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

  const search = ref("");
  const router = useRouter();
  const searchInput = ref<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    if (!search.value) {
      event?.preventDefault();
      return;
    }

    router.push(`/search/${search.value}`);
    search.value = "";
    searchInput.value?.blur();
  };
</script>
