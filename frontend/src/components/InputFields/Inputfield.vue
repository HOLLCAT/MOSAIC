<template>
    <div>
        <label :for="inputId" class="block mb-2 text-sm text-gray-200">{{ label }}</label>
        <input :id="inputId" :type="type" :placeholder="placeholder" :value="value" @input="updateValue"
            class="block w-full px-4 py-2 mt-2 border rounded-lg border-gray-600 bg-gray-800 text-gray-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-opacity-40">
        <p v-if="error" class="mt-2 text-xs text-red-400">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">

defineProps(['label', 'inputId', 'type', 'placeholder', 'value', 'error']);
const emit = defineEmits();

const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit('update:value', input.value);
};
</script>