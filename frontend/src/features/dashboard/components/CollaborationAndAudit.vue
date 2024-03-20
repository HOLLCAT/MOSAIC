<template>
    <div class="flex flex-col justify-center mt-4">
        <div class="flex items-center">
            <h2 class=" text-lg mb-2 font-semibold ml-4">Colloborators</h2>
            <button class="flex items-center text-purple hover:underline ml-2"
                @click="() => showAddColloborator = !showAddColloborator">
                <div v-if="!showAddColloborator">
                    <PlusCircleIcon class="h-6 w-6" />
                    <span class="sr-only">Add Colloborator</span>
                </div>
                <div v-else>
                    <XCircleIcon class="h-6 w-6" />
                    <span class="sr-only">Close</span>
                </div>
            </button>
        </div>
        <div class="w-[800px] ml-6">
            <Collaboration :isPending="isPending" :study="study" />
            <form v-if="showAddColloborator" @submit.prevent="handleSubmit"
                class="flex items-center mt-4 text-gray-900/80 p-4 rounded-lg border border-gray-300 bg-gray-200/90">
                <div class="flex flex-col w-full">
                    <div class="flex items-center w-full mb-3">
                        <label for="email" class="block text mr-[35px]">Email</label>
                        <input type="email" id="email" v-model="formEmail"
                            class="bg-slate-100 w-2/3 rounded-lg border-2 border-gray-400 p-2 focus:ring" required />
                    </div>
                    <div class="flex items-center w-full">
                        <label for="position" class="block text mr-4">Position</label>
                        <input type="text" id="position" v-model="formPosition"
                            class="bg-slate-100  w-2/3 rounded-lg border-2 border-gray-400 p-2 focus:ring" required />
                    </div>
                    <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
                </div>
                <button class="bg-purple text-white rounded-lg px-8 py-2 whitespace-nowrap">Add
                    Collaborator</button>
            </form>
        </div>
        <h2 class=" text-lg mt-4 mb-2 font-semibold ml-4">Audits</h2>
        <div class="w-full">
            <div class=" mx-6">
                <TableComponent v-if="study.audit" :items="study.audit" />
            </div>
        </div>
        <div class="flex justify-center items-center my-3">
            <button class="flex flex-col items-center text-purple hover:underline" @click="emits('clicked')">
                <ChevronUpIcon class="h-6 w-6" />
                <span class="text-purple-500 text-base font-semibold">Show Less</span>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import { PlusCircleIcon, XCircleIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";
import { onBeforeMount, ref } from "vue";
import { useDashboardStore } from "@/stores/dashboardStore";
import type { DashboardStudyType } from "../utils/types";
import Collaboration from "./Collaboration.vue";

const props = defineProps<{ study: DashboardStudyType, isPending: boolean }>();

const dashboardStore = useDashboardStore();

const emits = defineEmits<{ clicked: [] }>();

onBeforeMount(() => {
    dashboardStore.fetchColloborators(props.study.accession_id, props.isPending);
    dashboardStore.fetchAudits(props.study.accession_id, props.isPending);
});

const showAddColloborator = ref(false);
const formEmail = ref("");
const formPosition = ref("");

const errorMessage = ref("");

const handleSubmit = () => {
    const data = {
        accession_id: props.study.accession_id,
        email: formEmail.value,
        position: formPosition.value,
    };
    dashboardStore.addCollaborator(data, props.isPending).then((res) => {
        if (res === true) {
            formEmail.value = "";
            formPosition.value = "";
            showAddColloborator.value = false;
        } else {
            errorMessage.value = res;
        }
    });
};

const removeCollaborator = (email: string) => {
    dashboardStore.removeCollaborator(props.study.accession_id, email, props.isPending);
};
</script>