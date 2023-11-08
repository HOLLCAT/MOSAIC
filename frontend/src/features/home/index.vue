<template>
    <DataBankCard />     
</template>
  
<script lang="ts">
import DataBankCard from './components/DataBankCard.vue'
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomePage',
    components: {
    DataBankCard,    
}
});
</script>