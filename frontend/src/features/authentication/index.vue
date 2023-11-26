<template>
    <LoginPage v-if="mode === 'login'" />
    <RegisterPage v-else-if="mode === 'register'" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';

const route = useRoute();
const router = useRouter();
const mode =  computed(() => route.params.mode? route.params.mode as string : '');

const redirectToHome = () => {
    console.log(mode);
    if (!['login', 'register'].includes(mode.value)) {
        router.push('/');
    }
};

watch(mode, redirectToHome, { immediate: true });

</script>
