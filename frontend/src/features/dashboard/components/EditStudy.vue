<template>
    <h1 v-if="editable" class="font-semibold text-lg my-2 ml-4 border-t-2 mt-2"> Update Samples</h1>
    <div class="relative overflow-x-auto mt-4 rounded-md mx-6">
        <table class="w-full text-sm text-left rtl:text-right text-gray-900/80 rounded-lg">
            <thead class="text-xs uppercase bg-gray-500/70">
                <tr>
                    <th scope="col" class="px-6 py-3" v-for="(value, key) in study.samples[0]" :key="key">
                        <div v-if="!nonDisplayFields.includes(key.toString())" class="text-center">
                            {{ key }}
                        </div>
                    </th>
                    <th>fastq.gz</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sample, index) in study.samples" :key="index" class="border-b bg-gray-200 border-gray-300">
                    <td v-for="(value, key) in sample" :key="key">
                        <div v-if="!nonDisplayFields.includes(key.toString())" class="px-6 py-4 text-center">
                            <input v-if="!nonEditableFields.includes(key.toString()) && editable" type="text"
                                v-model="sample[key]" class="bg-slate-100 rounded-lg" />
                            <p v-else class="font-medium"> {{ sample[key] }}</p>
                        </div>
                    </td>
                    <td v-if="loadingIndices.find(item => item.index == index)"
                        class="flex justify-center items-center px-6 py-4">
                        <UploadProgressButton :fileSizeMB="250" />
                    </td>
                    <td v-else-if="!study.samples[index].File" class="px-6 py-4 flex justify-center items-center">
                        <UploadButton @file-uploaded="file => handleFile(file, index, study.samples)" />
                    </td>
                    <td v-else class="flex justify-center items-center px-6 py-4">
                        <CheckCircleIcon aria-hidden="true" class="w-8 h-8 text-green-500" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <form v-if="editable" class="flex justify-center mt-3 text-gray-900/80" @submit.prevent="updateStudy">
        <div class="flex items-center bg-gray-200 w-[800px] py-3 px-2 rounded-lg">
            <label for="update" class="flex text-gray-900/80 text-base font-medium mr-2 pb-1">
                Reason for change
            </label>
            <input id="update" type="text" v-model="description"
                class="bg-slate-100 w-2/3 rounded-lg border-2 border-gray-400 p-2 focus:ring mr-1" required />
            <button type="submit"
                class="bg-purple hover:bg-purpleHover text-white font-semibold py-2 px-3 rounded-lg ml-auto">
                Update
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import UploadButton from '@/components/Buttons/UploadButton.vue';
import type { DashboardStudyType, loadingUploadType } from '../utils/types';
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { useDashboardStore } from '@/stores/dashboardStore';
import UploadProgressButton from './UploadProgressButton.vue';
import { useUploadStudyStore } from '@/stores/uploadStudyStore';

const dashboardStore = useDashboardStore();
const uploadStudyStore = useUploadStudyStore();
const emit = defineEmits(['upload-done', 'showToast']);

const props = defineProps<{
    study: DashboardStudyType,
    editable: Boolean,
}>();

const nonEditableFields = ['Sample_ID', 'Sample_Project', 'fastq', 'Sample'];

const nonDisplayFields = ['File']
const loadingIndices = ref<loadingUploadType[]>([]);

const description = ref("");

const handleFile = async (file: File | null, index: number, samples: any) => {
    if (!file) {
        return;
    }
    if (!file.name.endsWith(".fastq.gz")) {
        emit("showToast", "File must be a .fastq.gz file");
        return;
    }
    const loadingFile: loadingUploadType = {
        index: index,
        fileSize: file.size / 1024 / 1024,
    }
    loadingIndices.value.push(loadingFile);
    const data = {
        accession_id: samples[index].Sample_Project,
        sample_id: samples[index].Sample_ID,
        file: file,
    }
    const response = await dashboardStore.uploadFile(data);
    if (response === 200) {
        samples[index].File = true;
    }
    else { emit("showToast", "Error in upload"); }
    loadingIndices.value = loadingIndices.value.filter(item => item.index !== index);
};

const updateStudy = () => {
    const sampleWithoutFile = props.study.samples.map(sample => {
        const { File, ...sampleWithoutFile } = sample;
        return sampleWithoutFile;
    });
    console.log(sampleWithoutFile);
    const data = {
        updated_study: {
            title: props.study.title,
            authors: props.study.authors,
            description: props.study.description,
            samples: sampleWithoutFile,
        },
        audit: {
            description: description.value,
        },
    }
    uploadStudyStore.updateStudy(data, props.study.accession_id).then((res) => {
        if (res === true) {
            dashboardStore.fetchAudits(props.study.accession_id, false);
            description.value = "";
            emit("upload-done");
        }
    })
};


</script>