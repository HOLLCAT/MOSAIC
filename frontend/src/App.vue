<template>
 
  <NavBar />
  <router-view/>
  <SiteFooter/>
  
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SiteFooter from "./components/SiteFooter.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    SiteFooter
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Arial', sans-serif;
  background-color: #e9e9e9;
}
</style>
