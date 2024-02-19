<template>
  <div class="rounded-lg overflow-hidden flex flex-col w-full">
    <table class="text-sm text-gray-400">
      <thead class="text-xs uppercase bg-purple text-gray-300">
        <tr>
          <th class="px-6 py-3 w-1/5">Study_ID</th>
          <th class="px-6 py-3 w-1/5">Sample_ID</th>
          <th class="px-6 py-3 w-1/5">Organism</th>
          <th class="px-6 py-3 w-1/5">Tissue</th>
          <th class="px-6 py-3 w-1/5">fastq.gz</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="study in samplesAsStudies" class="bg-gray-300 border-b border-gray-600/20">
          <td class="px-6 py-4 font-medium whitespace-nowrap text-black text-center w-1/5">
            {{ study.samples[0].Sample_Project }}
          </td>
          <td class="px-6 py-4 font-medium whitespace-nowrap text-black text-center w-1/5">
            {{ study.samples[0].Sample_ID }}
          </td>
          <td class="px-6 py-4 font-medium whitespace-nowrap text-black text-center w-1/5">
            {{ study.samples[0].Organism }}
          </td>
          <td class="px-6 py-4 font-medium whitespace-nowrap text-black text-center w-1/5">
            {{ study.samples[0].Tissue }}
          </td>
          <td class="px-6 py-4 font-medium whitespace-nowrap text-black flex justify-center w-full">
            <DownloadButton mood="light" @download="downloadFile(study.samples[0].Sample_Project, study.samples[0].Sample_ID)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import DownloadButton from '@/components/Buttons/DownloadButton.vue';
import { downloadFile } from '../utils/downloadFile';
import type { SearchResultType } from '../utils/types';
defineProps<{ samplesAsStudies: SearchResultType[] }>();

</script>