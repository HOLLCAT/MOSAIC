<template>
  <div class="flex-1 mx-auto md:mx-2 bg-zinc-200 rounded-lg p-4 my-2 md:my-0">
    <h2 class="text-slate-600 text-lg text-left mb-3 font-semibold">Samples</h2>
    <div class="text-black text-base font-medium ml-2">
      <h4 class="my-1">
        Sample count:
        <span class="font-normal">{{ study?.samples.length }}</span>
      </h4>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useStudy } from "../composables/useStudy";
  const study = useStudy();
</script>
