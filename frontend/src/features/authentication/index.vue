<template>
    <div v-if="showToasts" class="mx-auto md:pr-20">
        <DangerToast @closeToast="handleClose" :message="errorMessages" />
    </div>
    <LoginPage @showToast="handleShowToast" v-if="mode === 'login'" />
    <RegisterPage @showToast="handleShowToast" v-else-if="mode === 'register'" />
</template>

<script setup lang="ts">
import { computed, onUpdated, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import DangerToast from '@/components/toasts/DangerToast.vue';

const route = useRoute();
const router = useRouter();
const mode = computed(() => route.params.mode ? route.params.mode as string : '');
const errorMessages = ref('');
const showToasts = ref(false);

const redirectToHome = () => {
    if (!['login', 'register'].includes(mode.value)) {
        router.push('/');
    }
};

const handleClose = () => showToasts.value = false;

const handleShowToast = (message: string) => {
    errorMessages.value = message;
    showToasts.value = true;
    setTimeout(() => {
        showToasts.value = false;
    }, 3000);
};

onBeforeMount(() => {
    redirectToHome();
})
onUpdated(redirectToHome);
</script>
