<template>
    <div class="relative overflow-x-auto mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-400 rounded-lg">
            <thead class="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="(value, key) in searchResult.samples[0]" :key="key">
                        <div v-if="!nonDisplayFields.includes(key.toString())" class="text-center">
                            {{ key }}
                        </div>
                    </th>
                    <th>fastq.gz</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sample, index) in searchResult.samples" :key="index"
                    class="border-b bg-gray-800 border-gray-700">
                    <td v-for="(value, key) in sample" :key="key">
                        <div v-if="!nonDisplayFields.includes(key.toString())" class="px-6 py-4 text-center">
                            <p class="font-medium"> {{ sample[key] }}</p>
                        </div>
                    </td>
                    <td v-if="!searchResult.samples[index].File" class="px-6 py-4 flex justify-center items-center">
                        <UploadButton @file-uploaded="file => handleFile(file, index, searchResult.samples)" />
                    </td>
                    <td v-else class="flex justify-center items-center px-6 py-4">
                        <CheckCircleIcon aria-hidden="true" class="w-8 h-8 text-green-500" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr class="m-3">
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import UploadButton from '@/components/Buttons/UploadButton.vue';
import type { SearchResultType } from '../utils/types';
import { useStore } from 'vuex';
import { CheckCircleIcon } from "@heroicons/vue/24/outline";

const store = useStore();
const emit = defineEmits(['upload-done', 'showToast']);

defineProps<{
    searchResult: SearchResultType,
}>();

const nonDisplayFields = ['File']

const handleFile = (file: File | null, index: number, samples: any) => {
    if (!file) {
        return;
    }
    if (!file.name.endsWith(".fastq.gz")) {
        emit("showToast", "File must be a .fastq.gz file");
        return;
    }
    samples[index].File = true;
    const data = {
        accession_id: samples[index].Sample_Project,
        sample_id: samples[index].Sample_ID,
        file: file,
    }
    store.dispatch("dashboard/uploadFile", data);
};

</script>