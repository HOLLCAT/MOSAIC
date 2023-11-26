<template>
    <div>
        <label :for="inputId" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">{{ label }}</label>
        <input :id="inputId" :type="type" :placeholder="placeholder" :value="value" @input="updateValue"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring focus:ring-opacity-40">
        <p v-if="error" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    props: {
        label: {
            type: String as PropType<string>,
            required: true
        },
        inputId: {
            type: String as PropType<string>,
            required: true
        },
        type: {
            type: String as PropType<string>,
            required: true
        },
        placeholder: {
            type: String as PropType<string>,
            required: true
        },
        value: {
            type: String as PropType<string>,
            required: true
        },
        error: {
            type: String as PropType<string>,
            required: false
        }
    },
    emits: ['update:value'],
    setup(props, { emit }) {
        const updateValue = (event: Event) => {
            const input = event.target as HTMLInputElement;
            emit('update:value', input.value);
        };

        return { updateValue };
    }
});
</script>
