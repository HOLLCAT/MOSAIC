<template>
    <div class="flex flex-col items-center rounded-3xl bg-purple mb-5 mt-10 justify-between">
        <h1 class="text-base text-white mt-6 font-semibold xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
            Databank
        </h1>
        <div
            class="text-xsm flex justify-between text-white text-1xl mt-6 sm:mt-10 px-4 sm:px-10 w-full mb-6 font-medium xs:text-xs sm:text-base md:text-lg lg:text-1xl xl:text-2xl">
            <div class="flex flex-col items-center justify-center w-1/3">
                <span testid="title">Projects</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30%" height="30%" viewBox="0 0 48 48" fill="none">
                    <path d="M40 23V14L31 4H10C8.89543 4 8 4.89543 8 6V42C8 43.1046 8.89543 44 10 44H22" stroke="#333"
                        stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M33 29V43" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M26 36H33H40" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M30 4V14H40" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                <span>{{ homeValues.projects }}</span>
            </div>
            <div class="flex flex-col items-center justify-center w-1/3">
                <span testid="title">Files</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30%" height="30%" viewBox="0 0 48 48" fill="none">
                    <path
                        d="M39 4H11C9.89543 4 9 4.89543 9 6V42C9 43.1046 9.89543 44 11 44H39C40.1046 44 41 43.1046 41 42V6C41 4.89543 40.1046 4 39 4Z"
                        fill="none" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17 30L31 30" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M17 36H24" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <rect x="17" y="12" width="14" height="10" fill="none" stroke="#333" stroke-width="4"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{{ homeValues.files }}</span>
            </div>
            <div class="flex flex-col items-center justify-center w-1/3">
                <span testid="title">Genes</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30%" height="30%" viewBox="0 0 48 48" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.0002 45C27.2208 45 32.7276 40.8 32.7276 24C32.7276 7.2 27.2208 3 24.0002 
                        3C20.7797 3 15.2729 7.48302 15.2729 24C15.2729 40.517 20.7797 45 24.0002 45Z" stroke="#333"
                        stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M5.10515 35.0001C6.71545 37.8124 13.2479 40.4211 28.364 31.6211C43.48 22.8211 44.5057 15.8124 42.8954 
                        13.0001C41.2851 10.1878 34.4981 7.72728 19.6367 16.3791C4.77521 25.0308 3.49489 32.1878 5.10515 35.0001Z" stroke="#333" stroke-width="4"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.10506 13.0001C3.4948 15.8124 4.52046 22.8211 19.6366 31.6211C34.7527 40.4211 41.285 37.8124 42.8953 35.0001C44.5056 32.1878 43.2253 25.0308 
                        28.3638 16.3791C13.5024 7.72728 6.71537 10.1878 5.10506 13.0001Z" stroke="#333"
                        stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>{{ homeValues.genes }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { get } from '@/utils/axiosWrapper'


type HomeValues = {
    projects: number,
    files: number,
    genes: number,

}
const homeValues = ref<HomeValues>({
    projects: 0,
    files: 0,
    genes: 0,
})

onBeforeMount(async () => {
    try {
        const url = import.meta.env.VITE_API_URL
        const response = await get<HomeValues>(url)
        if (response.error) throw response.error
        if (!response.data) return

        homeValues.value = response.data
    } catch (error) {
        console.log(error)
    }

})
</script>