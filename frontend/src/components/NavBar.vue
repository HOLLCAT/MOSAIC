<template>
  <MobileSideMenu :isOpen="isOpen" @menu-close="handleMenuClose" />
  <nav class="flex bg-purple border-gray-700 h-[80px]">
    <div class="max-w-[1800px] mx-auto flex items-center px-1 md:px-6 w-full">
      <router-link to="/" class="text-xl lg:text-3xl font-semibold whitespace-nowrap text-white mr-[20px]"
        >MOSAIC</router-link
      >
      <div class="hidden lg:flex lg:mr-4">
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
      <div class="hidden lg:flex">
        <router-link to="/auth/login" :class="activeClass('/auth/login')">
          <span :class="navBarComponents">Login</span>
        </router-link>
        <router-link to="/auth/register" :class="activeClass('/auth/register')">
          <span :class="navBarComponents">Register</span>
        </router-link>
      </div>
      <HamburgerMenu @menu-open="handleMenuOpen" />
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRoute } from "vue-router";
  import SearchBar from "./SearchBar.vue";
  import HamburgerMenu from "./HamburgerMenu.vue";
  import MobileSideMenu from "./MobileSideMenu.vue";
  import { ref } from "vue";

  const route = useRoute();
  const isOpen = ref(false);

  const handleMenuOpen = () => (isOpen.value = true);
  const handleMenuClose = () => (isOpen.value = false);

  const activeClass = (path: string) => {
    return route.path === path
      ? "bg-slate-600 p-6 border-t-4 cursor-pointer"
      : "p-6 border-t-4 border-transparent hover:bg-slate-600 cursor-pointer";
  };
  const navBarComponents = "text-white text-xl font-medium";
</script>
