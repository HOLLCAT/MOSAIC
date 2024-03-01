<template>
  <div class="text-purple container mx-auto mt-4 mb-1 p-4 pb-2 shadow-xl rounded-xl bg-white">
    <div class="flex justify-between items-center border-b-2 border-black p-2">
      <h1 class="font-bold text-lg">Personal Details</h1>
    </div>
    <div class="bg-white rounded-lg p-4 space-y-3">
      <div class="text-gray-700">
          <span class="font-medium">Name:</span> {{ user?.name }}
      </div>
      <div class="text-gray-700">
          <span class="font-medium">Email Address:</span> {{ user?.email }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrentUser } from '@/composables/useCurrentUser';
const { user } = useCurrentUser();
</script>