<template>
    <button type="button" @click="handleClick"
        :class="'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center text-xs ' + props.class">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <slot><span>Download Options</span></slot>
    </button>
</template>
<script setup lang="ts">
const props = defineProps<{ class?: string }>();
const emit = defineEmits(["download-clicked"]);

const handleClick = () => {
    emit('download-clicked');
};
</script>