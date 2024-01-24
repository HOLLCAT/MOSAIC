<template>
    <div v-if="columns">
    <div class="flex justify-center items-center mt-8 ml-4">
        <button ref="buttonRef" @click="handleClick" 
        class="text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 bg-purple hover:bg-slate-500 focus:outline-none">
            {{ show ? 'Hide' : 'Show' }} Samples
        </button>
    </div>
    <div v-if="show" class="relative overflow-x-auto mt-10">
        <table class="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead class="text-xs uppercase bg-purple text-gray-300">
                <tr>
                    <th v-for="col in columns" :key="col" scope="col" class="px-6 py-3">
                        {{ formatColumnName(col) }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row[0]" class="border-b bg-gray-800 border-gray-700">
                    <td v-for="value in row" :key="value" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const store = useStore()
const show = ref<boolean>(true)
const buttonRef = ref<HTMLElement | null>(null)

const columns = computed(() => {
    return store.getters['study/getSamplesColumns']
})

const rows = computed(() => {
    return store.getters['study/getSamplesRows']
})

const formatColumnName = (column: string) => 
    column.replace(/([A-Z])/g, ' $1').trim()

const handleClick= (event: MouseEvent) => {
    event.preventDefault()
    buttonRef.value?.blur()
    show.value = !show.value
}
</script>