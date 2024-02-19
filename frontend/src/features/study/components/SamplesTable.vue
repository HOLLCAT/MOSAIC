<template>
    <div v-if="samples">
        <div class="flex justify-center items-center mt-8 ml-4">
            <button ref="buttonRef" @click="handleClick"
                class="text-white focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2 bg-purple hover:bg-slate-500 focus:outline-none">
                {{ show ? 'Hide' : 'Show' }} Samples
            </button>
        </div>
        <div v-if="show" class="relative overflow-x-auto mt-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead class="text-xs uppercase bg-purple text-gray-300">
                    <tr>
                        <th v-for="(_, key) in samples[0]" :key="key" scope="col" class="px-6 py-3">
                            {{ key }}
                        </th>
                        <th scope="col" class="px-6 py-3">Fastq.gz</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sample in samples" :key="sample.Sample_ID" class="border-b bg-gray-800 border-gray-700">
                        <td v-for="(value, _) in sample" :key="value"
                            class="px-6 py-4 font-medium text-center whitespace-nowrap text-white">
                            {{ value }}
                        </td>
                        <td class="px-6 py-4 font-medium text-center whitespace-nowrap text-white">
                            <DownloadButton mood="dark" @download="downloadFile(sample.Sample_Project, sample.Sample_ID)" />
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
import DownloadButton from '@/components/Buttons/DownloadButton.vue';
import { downloadFile } from "@/features/search/utils/downloadFile";
import { ref } from 'vue';
import type { SampleResponseType } from '@/features/search/utils/types';

const store = useStore()
const show = ref<boolean>(true)
const buttonRef = ref<HTMLElement | null>(null)

const samples = computed<SampleResponseType[]>(() => store.getters['study/getSamples']);


const formatColumnName = (column: string) =>
    column.replace(/([A-Z])/g, ' $1').trim()

const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    buttonRef.value?.blur()
    show.value = !show.value
}
defineExpose({ formatColumnName })
</script>