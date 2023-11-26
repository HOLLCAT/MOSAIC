<template>
    <nav class="border-gray-200 bg-gray-50 dark:bg-purple dark:border-gray-700 h-[80px]">
        <div class="max-w-[1800px] mx-auto flex items-center justify-center px-6">
            <router-link to="/" class="hidden md:block text-3xl font-semibold whitespace-nowrap dark:text-white mr-[20px]">MOSAIC</router-link>
            <div class="hidden md:flex">
                <router-link to="/" :class="activeClass('/')">
                    <span :class="navBarComponents">Home</span>
                </router-link>
                <router-link to="/about" :class="activeClass('/about')">
                    <span :class="navBarComponents">About</span>
                </router-link>
                <router-link to="/help" :class="activeClass('/help')">
                    <span :class="navBarComponents">Help</span>
                </router-link>
            </div>
            <SearchBar />
            <div class="hidden md:flex">
                <router-link to="/auth/login" :class="activeClass('/auth/login')">
                    <span :class="navBarComponents">Login</span>
                </router-link>
                <router-link to="/auth/register" :class="activeClass('/auth/register')">
                    <span :class="navBarComponents">Register</span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SearchBar from './SearchBar.vue';

const route = useRoute();

const activeClass = (path: string) => {
    return route.path === path ? 'bg-slate-600 p-6 border-t-4 cursor-pointer' : 'p-6 border-t-4 border-transparent hover:bg-slate-600 cursor-pointer';
};
const navBarComponents = 'text-white text-xl font-medium'
</script>