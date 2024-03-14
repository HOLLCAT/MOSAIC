<template>
    <div class=" relative text-white rounded-full w-fit">
        <svg width="28" height="28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ddd" stroke-width="5" fill="transparent" />
            <circle cx="50" cy="50" r="45" stroke="#4caf50" stroke-width="5" fill="transparent" stroke-dasharray="283"
                :stroke-dashoffset="circleOffset" />
        </svg>
        <!-- Your icon here -->
        <div class=" absolute top-[6px] left-[6px]">
            <ArrowUpTrayIcon class=" w-4 h-4 text-gray-300" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ArrowUpTrayIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{ fileSizeMB: number }>();


const progress = ref(0);


const circleOffset = computed(() => {
    const circumference = 2 * Math.PI * 45;
    return circumference * (1 - progress.value / 100);
});


function simulateUpload(fileSizeMB: number) {
    const uploadSpeed = 20;
    const totalTimeSeconds = fileSizeMB / uploadSpeed;
    const updateInterval = 200;
    const increment = (updateInterval / 1000) / totalTimeSeconds * 100;

    const interval = setInterval(() => {
        if (progress.value > 90) {
            return;
        }
        progress.value += increment;
        if (progress.value >= 100) clearInterval(interval);
    }, updateInterval);
}

onMounted(() => {
    simulateUpload(props.fileSizeMB);
});

</script>
