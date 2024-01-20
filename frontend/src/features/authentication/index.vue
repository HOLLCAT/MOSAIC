<template>
    <LoginPage v-if="mode === 'login'" />
    <RegisterPage v-else-if="mode === 'register'" />
</template>

<script setup lang="ts">
import { computed, onUpdated, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentUser } from '@/composables/useCurrentUser';
import { useSetUser } from '@/composables/useSetUser';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';

const route = useRoute();
const router = useRouter();
const mode = computed(() => route.params.mode ? route.params.mode as string : '');
const user = useCurrentUser();
const { setUser } = useSetUser();

const redirectToHome = () => {
    if (!['login', 'register'].includes(mode.value) || user.value) {
        router.push('/');
    }
};
onBeforeMount(() => {
    redirectToHome();
    !user.value && setUser();
})
onUpdated(redirectToHome);
</script>
