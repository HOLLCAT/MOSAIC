<template>
    <div v-if="result?.loading || !result?.content">
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
import { TransitionRoot } from '@headlessui/vue';
import { useUploadStudyStore } from '@/stores/uploadStudyStore';
import { storeToRefs } from 'pinia';


const emits = defineEmits<{ showToast: [payload: string] }>()

const uploadStore = useUploadStudyStore();
const { samples: result } = storeToRefs(uploadStore);
const samples = computed(() => result.value?.content);


onBeforeMount(() => {
    uploadStore.uploadMetadata();
});


const handleUpload = () => {
    if (samples.value)
        uploadStore.uploadStudy(samples.value)
};
</script>
@/stores/uploadStudyStore