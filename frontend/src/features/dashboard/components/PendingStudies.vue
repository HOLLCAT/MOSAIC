<template>
  <ul class="divide-y-2">
    <li v-for="(item, index) in searchResults" :key="item.accession_id"
      class="mb-3 bg-slate-50 border-2 border-gray-400/20 px-2.5 py-4 rounded-xl">
      <div v-if="showToast && currentEditing === index" class="flex justify-center">
        <DangerToast :message="errorMessage" @close-toast="handleClose" />
      </div>
      <StudyItem :item="item" />

      <div class="flex justify-end">
        <button v-if="currentEditing !== index" @click="editStudy(index)"
          class="font-semibold bg-purple text-white rounded-2xl px-10 py-2 hover:bg-blue-500 active:bg-red">Edit</button>
      </div>

      <EditStudy @show-toast="handleShowToast" v-if="currentEditing === index" :study=item :editable=false
        @upload-done="resetEditing" />

      <div class="flex justify-end">
        <button v-if="currentEditing === index" @click="resetEditing"
          class="font-bold bg-purple text-white rounded-xl px-4 py-2 hover:bg-blue-500 active:bg-red mt-2">Close</button>
      </div>

    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditStudy from './EditStudy.vue';
import type { DashboardStudyType } from '../utils/types';
import DangerToast from '@/components/toasts/DangerToast.vue';
import StudyItem from './StudyItem.vue';

defineProps<{ searchResults: DashboardStudyType[] }>()

const errorMessage = ref("")
const showToast = ref(false);

const handleShowToast = (message: string) => {
  errorMessage.value = message;
  showToast.value = true;
};

const handleClose = () => showToast.value = false;

const currentEditing = ref(null);

const editStudy = (index: any) => {
  currentEditing.value = index;
};

const resetEditing = () => {
  currentEditing.value = null;
};

</script>