<template>
    <form class="mx-auto w-[380px]" @submit="handleSubmit">
        <input class="w-full p-1 rounded-lg bg-slate-100 placeholder:font-bold placeholder-" type="text" placeholder="Search..." v-model="search" ref="searchInput" />
    </form>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'SearchBar',
    setup() {
        const search = ref<string>('');
        const router = useRouter();
        const searchInput = ref<HTMLInputElement | null>(null);

        const handleSubmit = () => {
            if (!search.value) {
                event?.preventDefault();
                return;
            }
            
            router.options.history?.push(`/search/${search.value}`);
            search.value = '';
            searchInput.value?.blur();
        };

        return { search, handleSubmit, searchInput };
    },
};
</script>
  