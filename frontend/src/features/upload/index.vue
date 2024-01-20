<template>
    <div class="flex flex-col items-center justify-center bg-navy-800 flex-grow">
        <DangerToast v-if="showToast" :message="errorMessage" @close-toast="handleClose" />
        <div class="flex w-full max-w-md m-4 lg:mx-auto overflow-hidden rounded-lg shadow-lg bg-purple lg:max-w-5xl">
            <div class="w-full px-6 py-8 md:px-8">
                <h2 class="text-2xl font-bold text-center text-white">Upload Study</h2>
                <StudyDetails v-if="showDetails" @details-submitted="handleDetailsSubmitted" />
                <Samples @show-toast="handleShowToast" v-if="!showDetails" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StudyDetails from './components/StudyDetails.vue';
import DangerToast from '@/components/toasts/DangerToast.vue';
import Samples from './components/Samples.vue';
import { useCurrentUser } from '@/composables/useCurrentUser';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const errorMessage = ref("")
const showToast = ref(false);
const showDetails = ref(true);

onBeforeMount(() => {
    const {user} = useCurrentUser();
    const router = useRouter();
    if (!user.value) {
        router.push('/');
    }
})
const handleShowToast = (message: string) => {
    errorMessage.value = message;
    showToast.value = true;
};
const handleClose = () => showToast.value = false;
const handleDetailsSubmitted = () => showDetails.value = false;
</script>