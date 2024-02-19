<template>
    <div class="mb-10">
        <label :for="inputId" class="block mb-2 text-sm text-gray-600 dark:text-gray-200 text-center">{{ label }}</label>
        <input :id="inputId" type="file" :value="value" @input="handleFileChange"
            class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
        <div>
            <p v-if="error" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['label', 'inputId', 'type', 'placeholder', 'value', 'error']);
const emit = defineEmits();

const handleFileChange = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    emit('update:value', file);
};
</script>