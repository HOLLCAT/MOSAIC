<template>
  <div class="lg:hidden sm:max-w-xl ml-auto">
    <button class="text-white w-10 h-10 focus:outline-none" @click="emit('menu-open')">
      <span class="sr-only">Open main menu</span>
      <Bars3BottomRightIcon class="w-full h-full" aria-hidden="true" />
    </button>
  </div>
</template>
<script setup lang="ts">
  import { Bars3BottomRightIcon } from "@heroicons/vue/24/outline";
  const emit = defineEmits(["menu-open"]);
</script>
