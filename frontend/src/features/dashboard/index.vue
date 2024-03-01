<template>
  <div class="flex bg-purple pt-2">
    <SideBar @update:active-tab="handleTabUpdate" :active-tab="activeTab" />
    <div class="flex w-[83%] bg-slate-100 h-auto p-4 rounded-[30px] mr-5 ">
      <UserDetails v-if="activeTab === DashboardTabs.Details" />
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
import { useRoute, useRouter } from 'vue-router';
import { DashboardTabs } from './utils/Enums'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const tab = computed(() => {
  const tabQuery = route.query.tab;
  if (!tabQuery) return DashboardTabs.Details;
  if (Object.values(DashboardTabs).includes(tabQuery as any)) {
    return tabQuery as DashboardTabs;
  }
  router.push({ query: { tab: DashboardTabs.Details } });
  return DashboardTabs.Details;
});

const activeTab = ref<DashboardTabs>(tab.value as DashboardTabs);

const handleTabUpdate = (tab: DashboardTabs) => {
  activeTab.value = tab
  router.push({ query: { tab: tab } });
}
</script>
