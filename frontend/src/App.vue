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
  import { useCurrentUser } from "@/composables/useCurrentUser";
  import { injectStore } from "./utils/api";
  import NavBar from "@/components/Navbar/NavBar.vue";
  import SiteFooter from "./components/SiteFooter.vue";
  
  const loading = ref(true);
  const { user, store } = useCurrentUser();
  injectStore(store);
  
  onBeforeMount(() => {
    store.dispatch("auth/refreshToken").then(() => {
      loading.value = false;
    });
  });

  const route = useRoute();
  const pagesWithoutFooter = ["auth", "upload"];
  const shouldRenderFooter = computed(() => {
    return !pagesWithoutFooter.includes((route.name as string) || "");
  });
</script>
