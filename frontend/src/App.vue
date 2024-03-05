<template>
  <div v-if="!loading" class="flex flex-col min-h-screen">
    <NavBar />
    <RouterView />
    <SiteFooter v-if="shouldRenderFooter" />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { injectStore } from "./utils/api";
import NavBar from "@/components/Navbar/NavBar.vue";
import SiteFooter from "./components/SiteFooter.vue";
import { useAuthStore } from "@/stores/authStore";

const loading = ref(true);
const authStore = useAuthStore();

injectStore(authStore);

onBeforeMount(() => {
  authStore.refreshToken().then(() => {
    loading.value = false;
  });
});

const route = useRoute();
const pagesWithoutFooter = ["auth", "upload"];
const shouldRenderFooter = computed(() => {
  return !pagesWithoutFooter.includes((route.name as string) || "");
});
</script>
./stores/authStore