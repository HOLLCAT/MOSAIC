<template>
    <div class="flex bg-purple pt-2">
        <SideBar @update:active-tab="handleTabUpdate" />
        <div class="flex w-[83%] bg-slate-100 h-auto p-4 rounded-[30px] mr-5 ">
            <UserDetails v-if="activeTab === DashboardTabs.Details"/> 
            <StudiesTab v-if="activeTab === DashboardTabs.Studies" />
            <PendingStudiesTab v-if="activeTab === DashboardTabs.PendingStudies" />
        </div>
    </div>
</template>

<script setup lang="ts">
import SideBar from './components/SideBar.vue'
import StudiesTab from './components/StudiesTab.vue'
import PendingStudiesTab from './components/PendingStudiesTab.vue'
import UserDetails from './components/UserDetails.vue';
import { DashboardTabs } from './utils/Enums'
import { ref } from 'vue'


const activeTab = ref(DashboardTabs.Details)

const handleTabUpdate = (tab: DashboardTabs) => {
    console.log(tab)
    activeTab.value = tab
}
</script>
