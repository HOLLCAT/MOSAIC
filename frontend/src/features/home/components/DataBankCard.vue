
<template>
    <div class="justify-center items-center w-full mt-[-40px] p-12.5 flex flex-col min-h-screen">
        <div class="flex flex-col items-center w-3/5 min-h-1/2 my-5 rounded-3xl bg-purple justify-center">
            <h1 class="text-4xl text-white mt-10 font-semibold">Databank</h1>
            <div class="flex justify-between text-white text-xl mt-10 px-10 w-full mb-10 font-medium">
                <div class="flex flex-col items-center justify-center w-1/3">
                    <span>Projects</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none">
                        <path d="M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M33 29V43" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26 36H33H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M30 4V14H40" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>123</span>
                </div>
                <div class="flex flex-col items-center justify-center w-1/3">
                    <span>Files</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none">
                        <path d="M39 4H11C9.89543 4 9 4.89543 9 6V42C9 43.1046 9.89543 44 11 44H39C40.1046 44 41 43.1046 41 42V6C41 4.89543 40.1046 4 39 4Z" 
                        fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 30L31 30" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 36H24" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <rect x="17" y="12" width="14" height="10" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>456</span>
                </div>
                <div class="flex flex-col items-center justify-center w-1/3">
                    <span>Genes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0002 45C27.2208 45 32.7276 40.8 32.7276 24C32.7276 7.2 27.2208 3 24.0002 
                        3C20.7797 3 15.2729 7.48302 15.2729 24C15.2729 40.517 20.7797 45 24.0002 45Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.10515 35.0001C6.71545 37.8124 13.2479 40.4211 28.364 31.6211C43.48 22.8211 44.5057 15.8124 42.8954 
                        13.0001C41.2851 10.1878 34.4981 7.72728 19.6367 16.3791C4.77521 25.0308 3.49489 32.1878 5.10515 35.0001Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.10506 13.0001C3.4948 15.8124 4.52046 22.8211 19.6366 31.6211C34.7527 40.4211 41.285 37.8124 42.8953 35.0001C44.5056 32.1878 43.2253 25.0308 
                        28.3638 16.3791C13.5024 7.72728 6.71537 10.1878 5.10506 13.0001Z" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>789</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center w-3/5 mt-10 rounded-3xl bg-purple justify-center box-border">
            <h1 class="text-4xl text-white mt-6 font-semibold">Most Viewed Studies</h1>
            <div class="w-full p-4">
                <div class="bg-white rounded-lg p-4 mb-3" v-for="(study, index) in studies" :key="index">
                    <RouterLink :to="`/study/${study.accession}`" class="text-xl text-black">
                        {{ study.title }}
                    </RouterLink>
                    <p class="text-lg text-gray-700">Views: {{ study.releaseViews }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { data } from '@/utils/dummyDataNew';

export default defineComponent({
    name: 'DataBankCard',
    setup() {
        const studies = ref(data);

        const getMostViewedStudies = () => {
            const sortedData = [...data].sort((a, b) => 
                (b.releaseViews ? parseInt(b.releaseViews) : 0) - (a.releaseViews ? parseInt(a.releaseViews) : 0)
            );
            studies.value = sortedData.slice(0, 3);
        }

        onMounted(() => {
            getMostViewedStudies();
        });

        return {
            studies
        };
    }
});
</script>