<template>
    <input @change="handleChange" ref="fileUpload" type="file" class="hidden" />
    <button type="button" @click="handleClick"
        class="text-white rounded-full p-2 bg-gray-900/50 w-8 h-8 focus:outline-none">
        <ArrowUpTrayIcon aria-hidden="true" />
    </button>
</template>
<script setup lang="ts">
import { ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const fileUpload = ref<HTMLInputElement | null>(null);
const emit = defineEmits<{ fileUploaded: [payload: File | null] }>()

const handleClick = () => fileUpload.value?.click()

const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
        emit("fileUploaded", files[0]);
    }
};
</script>