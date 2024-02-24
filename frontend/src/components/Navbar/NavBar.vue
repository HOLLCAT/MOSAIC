<template>
  <MobileSideMenu :isOpen="isOpen" @menu-close="handleMenuClose" />
  <nav class="flex bg-purple border-gray-700 h-[80px]">
    <div class="max-w-[1800px] mx-auto flex items-center px-1 md:px-6 w-full">
      <router-link to="/"
        class="text-xl lg:text-3xl font-semibold whitespace-nowrap text-white mr-[20px]">MOSAIC</router-link>
      <div class="hidden lg:flex lg:mr-4">
        <router-link to="/" :class="activeClass('/')">
          <span :class="navBarComponents">Home</span>
        </router-link>
        <router-link to="/about" :class="activeClass('/about') + ' mx-1'">
          <span :class="navBarComponents">About</span>
        </router-link>
        <router-link to="/help" :class="activeClass('/help')">
          <span :class="navBarComponents">Help</span>
        </router-link>
      </div>
      <SearchBar />
      <div v-if="!user" class="hidden lg:flex ml-2">
        <router-link to="/auth/login" :class="activeClass('/auth/login')">
          <span :class="navBarComponents">Login</span>
        </router-link>
        <router-link to="/auth/register" :class="activeClass('/auth/register')">
          <span :class="navBarComponents">Register</span>
        </router-link>
      </div>
      <div v-else class="hidden lg:flex ml-2">
        <router-link to="/upload" :class="activeClass('/upload')">
          <span :class="navBarComponents">Upload</span>
        </router-link>
        <button @click="handleLogout" class="p-6 border-t-4 border-transparent hover:bg-slate-600 cursor-pointer">
          <span :class="navBarComponents">Logout</span>
        </button>
      </div>
      <HamburgerMenu @menu-open="handleMenuOpen" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SearchBar from "./SearchBar.vue";
import HamburgerMenu from "./HamburgerMenu.vue";
import MobileSideMenu from "./MobileSideMenu.vue";
import { useCurrentUser } from "@/composables/useCurrentUser";
import { ref } from "vue";

const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const { user, store } = useCurrentUser();

const handleMenuOpen = () => (isOpen.value = true);
const handleMenuClose = () => (isOpen.value = false);


const navBarComponents = "text-white text-xl font-medium";
const activeClass = (path: string) => {
  return route.path === path
    ? "bg-slate-600 p-6 border-t-4 cursor-pointer"
    : "p-6 border-t-4 border-transparent hover:bg-slate-600 cursor-pointer";
};

const handleLogout = () => {
  store.dispatch("auth/logout");
  router.push('/');
};

defineExpose({ handleMenuOpen, handleMenuClose, handleLogout, activeClass, navBarComponents, isOpen });
</script>
