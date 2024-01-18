<template>
    <div class="mb-10">
        <label :for="inputId" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">{{ label }}</label>
        <textarea :id="inputId" :placeholder="placeholder" :value="value" @input="updateValue" rows="1" ref="textareaRef"
            class="overflow-y-hidden resize-none block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
        <div>
            <p v-if="error" class="mt-2 text-xs text-red-400">{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['label', 'inputId', 'type', 'placeholder', 'value', 'error']);
const emit = defineEmits();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit('update:value', input.value);

    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
    }
};
</script>