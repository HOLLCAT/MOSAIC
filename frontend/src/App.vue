<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <RouterView />
    <SiteFooter v-if="shouldRenderFooter" />
  </div>
</template>
<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import NavBar from "@/components/Navbar/NavBar.vue";
  import SiteFooter from "./components/SiteFooter.vue";

  const route = useRoute();
  const pagesWithoutFooter = ["auth", "upload"];

  const shouldRenderFooter = computed(() => {
    return !pagesWithoutFooter.includes((route.name as string) || "");
  });
</script>
