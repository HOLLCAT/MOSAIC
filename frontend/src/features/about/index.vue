<template>
    <div class="justify-center items-center w-full mt-[-60px] p-12.5 flex flex-col min-h-screen">
        <div class="flex flex-col items-center w-4/5 h-auto rounded-3xl bg-purple justify-center">
            <h1 class="text-4xl text-white mt-10 font-semibold pt-10">About</h1>
            <p class="text-2xl text-white mt-10 text-center px-40 py-20 text-justify">
                MOSAIC (Mouse Model Open-Source Information and Archive Center) 
                is a repository designed to streamline data sharing and integration within the National Mouse Genetics Network. 
                This network collaborates across various labs and research institutes, employing mouse models to study diseases like cancer and diabetes.
                MOSAIC addresses the challenge of diverse data formats and distinct lab procedures by offering a unified data portal. 
                This platform enables scientists to submit their research data, which undergoes a quality control process before being shared. 
                The portal caters to a variety different types of data, including sequence, image, and behavioural data. 
            </p>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
    }
});
</script>