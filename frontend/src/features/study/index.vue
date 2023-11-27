<template>
    <div class="mx-auto max-w-screen-2xl min-h-[81vh] p-3 ">
        <h1 class="text-xl md:text-3xl text-slate-600 font-semibold text-left mt-4 mb-2">
            RNA-seq in HAP1 tRNA gene locus deleted clones and control clones
        </h1>
        <h3 class="text-base md:text-lg pl-4">
           {{ getNames(study.authors) }}
        </h3>
        <div class="md:flex items-center justify-center font-semibold my-11 text-sm md:text-[17px]">
            <h3>Accession: <span class="text-gray-600">{{study.accession}}</span></h3>
            <h3 class="md:mx-8">Study type:  <span class="text-gray-600">{{ study.studyType }}</span></h3>
            <h3>Organism: <span class="text-gray-600">{{ study.organism }}</span></h3>
        </div>
        <div class="my-6 md:ml-4">
            <h2 class="font-semibold text-lg md:text-3xl text-slate-600 mb-2">Description</h2>
            <p class="ml-2 max-w-5xl text-sm md:text-[17px]">
                {{ study.description }}
            </p>
        </div>
        <div class="md:flex justify-around first:mb-2 mt-10">
            <SamplesCard />
            <AssaysDataCard />
        </div>
        <SamplesTable />
    </div>
</template>

<script setup lang="ts">
import SamplesCard from './components/SampleCard.vue';
import AssaysDataCard from './components/AssaysDataCard.vue';
import SamplesTable from './components/SamplesTable.vue';
import { setupStudy } from './composables/setupStudy';

const { study, getNames } = setupStudy();
</script>./composables/useStudy