<template>
    <button type="button" @click="handleClick"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center text-xs">
        <MagnifyingGlassIcon class="w-6 h-6 text-gray-600 mr-3" />
        <span>Back To Studies</span>
    </button>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { defineEmits } from 'vue';

const emit = defineEmits(['back-to-studies-clicked']);

const handleClick = () => {
    emit('back-to-studies-clicked');
};
</script>