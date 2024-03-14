<template>
  <ul>
    <li v-for="(item, index) in searchResults" :key="item.accession_id" class="mb-3">
      <RouterLink :to="`/study/${item.accession_id}`">
        <p class="font-bold">{{ item.title.length > 140 ? item.description.slice(0, 140) + "..." : item.title }}</p>
      </RouterLink>
      {{ item.description.length > 140 ? item.description.slice(0, 140) + "..." : item.description }}
      <div v-if="showToast && currentEditing === index" class="flex justify-center">
        <DangerToast :message="errorMessage" @close-toast="handleClose" />
      </div>
      <div class="flex justify-end">
        <button v-if="currentEditing !== index" @click="editStudy(index)"
          class="font-bold bg-purple text-white rounded-xl px-4 py-2 hover:bg-blue-500 active:bg-red">Edit</button>
      </div>

      <EditStudy @show-toast="handleShowToast" v-if="currentEditing === index" :searchResult=item
        @upload-done="resetEditing" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditStudy from './EditStudy.vue';
import type { SearchResultType } from '../utils/types';
import DangerToast from '@/components/toasts/DangerToast.vue';

const errorMessage = ref("")
const showToast = ref(false);

const handleShowToast = (message: string) => {
  errorMessage.value = message;
  showToast.value = true;
};

const handleClose = () => showToast.value = false;

defineProps<{ searchResults: SearchResultType[] }>()

const currentEditing = ref(null);

const editStudy = (index: any) => {
  currentEditing.value = index;
};

const resetEditing = () => {
  currentEditing.value = null;
};

</script>