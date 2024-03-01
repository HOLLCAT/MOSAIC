<template>
    <div class="flex w-[17%] h-screen mt-10">
        <ul class="cursor-pointer ml-2 w-full text-base font-semibold text-white space-y-2">
            <li class="flex text-white">
                <a :class="tabClass(DashboardTabs.Details)" @click="emitTab(DashboardTabs.Details)">
                    Details
                </a>
            </li>
            <li class="flex ">
                <a :class="tabClass(DashboardTabs.Studies)" @click="emitTab(DashboardTabs.Studies)">
                    Studies
                </a>
            </li>
            <li class="flex ">
                <a :class="tabClass(DashboardTabs.PendingStudies)" @click="emitTab(DashboardTabs.PendingStudies)">
                    Pending Studies
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DashboardTabs } from '../utils/Enums';

const activeClass = 'bg-slate-100 w-full p-2 rounded-s-2xl text-black'
const inactiveClass = 'w-full p-2 rounded-2xl hover:bg-gray-500/20'

const emit = defineEmits<{
    (event: 'update:activeTab', value: DashboardTabs): void
}>()
const props = defineProps<{
    activeTab: DashboardTabs
}>()
const activeTab = ref(props.activeTab)

const emitTab = (tab: DashboardTabs) => {
    emit('update:activeTab', tab)
    activeTab.value = tab
}

const tabClass = (tab: DashboardTabs) => {
    return activeTab.value === tab ? activeClass : inactiveClass
}
</script>