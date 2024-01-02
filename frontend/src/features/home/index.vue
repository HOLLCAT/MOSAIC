<template>
    <div class="items-center w-full p-4 flex flex-col flex-grow h-auto justify-center">
        <DatabankCard />     
        <MostViewedStudiesCard />    
    </div> 
</template>
  
<script setup lang="ts">
import DatabankCard from './components/DatabankCard.vue'
import MostViewedStudiesCard from './components/MostViewedStudiesCard.vue'
</script>