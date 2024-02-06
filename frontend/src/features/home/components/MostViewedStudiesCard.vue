
<template>
        <div class="flex flex-col items-center rounded-3xl bg-purple mb-10 mt-5 justify-between">
            <h1 class="text-base text-white mt-6 font-semibold xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">Most Viewed Studies</h1>
            <div class="w-full p-4">
                <div testid="study" class="bg-white rounded-lg p-4 mb-3" v-for="(study, index) in studies" :key="index">
                    <RouterLink :to="`/study/${study.accession}`" class="text-xs text-gray-700 xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-ms text-black">
                        {{ study.title }}
                    </RouterLink>
                    <p class="text-xs text-gray-700 xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-ms">Views: {{ study.releaseViews }}</p>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { data } from '@/utils/dummyDataNew';
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
</script>