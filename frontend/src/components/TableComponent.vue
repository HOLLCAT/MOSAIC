<template>
    <div class="relative overflow-x-auto mt-4 rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-900/80">
            <thead class="text-xs uppercase bg-gray-500/70 rounded-lg">
                <slot name="header">
                    <tr v-if="items">
                        <th scope="col" class="px-6 py-3" v-for="(value, key) in items[0]" :key="key">
                            <div class="text-center">
                                {{ key }}
                            </div>
                        </th>
                    </tr>
                </slot>
            </thead>
            <tbody>
                <slot name="body">
                    <tr v-if="items" v-for="(item, index) in items" :key="index"
                        class="border-b bg-gray-200 border-gray-300">
                        <td v-for="(value, key) in item" :key="key">
                            <div class="px-6 py-4 text-center">
                                <p class="font-medium"> {{ item[key] }}</p>
                            </div>
                        </td>
                    </tr>
                </slot>
            </tbody>
        </table>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    items?: any
}>();
</script>