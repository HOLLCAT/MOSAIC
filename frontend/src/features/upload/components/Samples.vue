<template>
    <div v-if="result.loading || !result.content">
        loading ...
    </div>
    <TransitionRoot v-else :show="true" appear enter="transition ease-in-out duration-200 transform"
        enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0" leave-to="translate-x-full">
        <div class="relative overflow-x-auto mt-4">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead v-if="samples"
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3" v-for="(value, key) in samples[0]" :key="key">
                            {{ key }}
                        </th>
                        <th scope="col" class="px-6 py-3">fastq</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(sample, index) in samples" :key="index" class="border-b bg-gray-800 border-gray-700">
                        <td class="px-6 py-4" v-for="(value, key) in sample" :key="key">
                            <input type="text" v-model="sample[key]" class="bg-gray-800 rounded-lg" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4 flex justify-center mx-4">
            <button @click="handleUpload" type="submit"
                class="w-full bg-white hover:bg-purple-700 text-gray-950 font-bold py-2 px-4 rounded">Upload</button>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { TransitionRoot } from '@headlessui/vue';
import type { UploadStateType } from '../utils/types';
import { useRouter } from 'vue-router';


const emits = defineEmits<{ showToast: [payload: string] }>()
const store = useStore();
const router = useRouter();
const result = computed<UploadStateType["samples"]>(() => store.getters["upload/getStudySamples"]);
const samples = computed(() => result.value?.content);


onBeforeMount(() => {
    const data = computed(() => store.getters["upload/getStudyMetadata"]);
    store.dispatch("upload/uploadMetadata", {
        metadata_type: data.value.file_type,
        metadata: data.value.metadata,
    });
});


const handleUpload = () => {
    const studyDetails = computed(() => store.getters["upload/getAllStudyData"]);
    const data = {
        ...studyDetails.value,
        samples: samples.value,
    }
    store.dispatch("upload/uploadStudy", data).then(() => {
        router.push({ name: "dashboard", query: { tab: "PendingStudies" } });
    })
};
</script>
