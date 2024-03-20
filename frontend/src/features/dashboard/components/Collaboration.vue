<template>
    <TableComponent>
        <template v-slot:header v-if="study.isOwner && study.collaborators?.length">
            <tr>
                <th v-for="(value, key) in study.collaborators[0]" class="px-6 py-3">
                    <div class="text-center">
                        {{ key }}
                    </div>
                </th>
                <th v-if="study.isOwner && study.collaborators?.length" class=" px-6 py-3">
                    <div class="text-center">
                        Remove Colloborator
                    </div>
                </th>
            </tr>
        </template>
        <template v-slot:body v-if="study.isOwner && study.collaborators?.length">
            <tr v-for="(item, index) in study.collaborators" :key="index" class="border-b bg-gray-200 border-gray-300">
                <td v-for="(value, key) in item" :key="key">
                    <div class="px-6 py-4 text-center">
                        <p class="font-medium"> {{ item[key] }}</p>
                    </div>
                </td>
                <td>
                    <div class="px-6 py-4 text-center">
                        <button @click="() => removeCollaborator(item.email)"
                            class="text-white bg-red-500 rounded-lg px-6 py-2">
                            Remove
                        </button>
                    </div>
                </td>
            </tr>
        </template>
    </TableComponent>
</template>
<script setup lang="ts">
import TableComponent from '@/components/TableComponent.vue';
import { useDashboardStore } from '@/stores/dashboardStore';
import type { DashboardStudyType } from '../utils/types';
const props = defineProps<{ study: DashboardStudyType, isPending: boolean }>();

const dashboardStore = useDashboardStore();
const removeCollaborator = (email: string) => {
    dashboardStore.removeCollaborator(props.study.accession_id, email, props.isPending);
};
</script>