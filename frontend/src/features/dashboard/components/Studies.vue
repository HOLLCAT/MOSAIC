<template>
  <ul>
    <li v-for="(item, index) in studies" :key="item.accession_id"
      class="mb-3 bg-slate-50 border-2 border-gray-400/20 p-2 rounded-xl">
      <StudyItem :item="item" />

      <div class="flex justify-end">
        <button v-if="item.isPublished === false" @click="handlePublish(item.accession_id)"
          class="font-semibold bg-purple text-white rounded-2xl px-10 py-2 hover:bg-purpleHover mr-2">
          Publish
        </button>
        <div class="flex justify-end">
          <button v-if="currentEditing !== index" @click="editStudy(index)"
            class="font-semibold bg-purple text-white rounded-2xl px-10 py-2 hover:bg-purpleHover">Edit</button>
        </div>
      </div>

      <EditStudy @show-toast="handleShowToast" v-if="currentEditing === index" :study=item :editable=true
        @upload-done="resetEditing" />

      <div class="flex justify-end">
        <button v-if="currentEditing === index" @click="resetEditing"
          class="font-bold bg-purple text-white rounded-xl px-4 py-2 hover:bg-blue-500 active:bg-red mt-2">Close</button>
      </div>

    </li>
  </ul>
</template>

<script setup lang="ts">
import StudyItem from './StudyItem.vue';
import EditStudy from './EditStudy.vue';
import type { DashboardStudyType } from '../utils/types';
import { useDashboardStore } from '@/stores/dashboardStore';
import { ref } from 'vue';

defineProps<{ studies: DashboardStudyType[] }>()

const dashboardStore = useDashboardStore();

const handlePublish = (accession_id: string) => {
  dashboardStore.publishStudy(accession_id);
}

const errorMessage = ref("")
const showToast = ref(false);

const handleShowToast = (message: string) => {
  errorMessage.value = message;
  showToast.value = true;
};

const currentEditing = ref(null);

const editStudy = (index: any) => {
  currentEditing.value = index;
};

const resetEditing = () => {
  currentEditing.value = null;
};

</script>