<template>
    <div class="items-center w-full p-4 sm:p-12.5 flex flex-col flex-shrink h-auto min-h-screen justify-center items-center">
        <DatabankCard />     
        <MostViewedStudiesCard />    
    </div> 
</template>
  
<script setup lang="ts">
import DatabankCard from './components/DatabankCard.vue'
import MostViewedStudiesCard from './components/MostViewedStudiesCard.vue'
</script>