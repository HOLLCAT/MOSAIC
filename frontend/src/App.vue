<template>

  <NavBar />
  <RouterView />
  <SiteFooter/>

</template>
<script setup lang="ts">
  import {RouterView } from 'vue-router'
  import NavBar from "@/components/NavBar.vue";
  import SiteFooter from "./components/SiteFooter.vue";
</script>