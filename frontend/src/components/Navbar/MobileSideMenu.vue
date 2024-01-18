<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="emit('menu-close')">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="translate-x-full">
          <DialogPanel
            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-purple py-4 pb-12 shadow-xl">
            <div class="flex items-center justify-between px-4 border-b border-gray-300 pb-[11px]">
              <h2 class="text-2xl font-medium text-white">MOSAIC</h2>
              <button
                type="button"
                class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-white"
                @click="emit('menu-close')">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <ul class="space-y-2 px-3 py-4 text-lg font-medium" @click="emit('menu-close')">
              <li>
                <router-link to="/" :class="isActiveLink('/')">
                  <HomeIcon :class="isActiveIcon('/')" aria-hidden="true" />
                  <span class="flex-1 ms-3 whitespace-nowrap">Home</span>
                </router-link>
              </li>
              <li>
                <router-link to="/auth/login" :class="isActiveLink('/auth/login')">
                  <ArrowRightEndOnRectangleIcon :class="isActiveIcon('/auth/login')" aria-hidden="true" />
                  <span class="flex-1 ms-3 whitespace-nowrap">Login</span>
                </router-link>
              </li>
              <li>
                <router-link to="/auth/register" :class="isActiveLink('/auth/register')">
                  <UserPlusIcon :class="isActiveIcon('/auth/register')" aria-hidden="true" />
                  <span class="flex-1 ms-3 whitespace-nowrap">Register</span>
                </router-link>
              </li>
            </ul>
            <ul
              class="pt-4 mt-4 space-y-2 px-3 py-4 text-lg font-medium border-t border-gray-700"
              @click="emit('menu-close')">
              <li>
                <router-link to="/upload" :class="isActiveLink('/upload')">
                  <ArrowDownTrayIcon :class="isActiveIcon('/upload')" aria-hidden="true" />
                  <span class="flex-1 ms-3 whitespace-nowrap">Upload</span>
                </router-link>
              </li>
              <li>
                <router-link to="/about" :class="isActiveLink('/about')">
                  <InformationCircleIcon :class="isActiveIcon('/about')" aria-hidden="true" />
                  <span class="flex-1 ms-3 whitespace-nowrap">About</span>
                </router-link>
              </li>
              <li>
                <router-link to="/help" :class="isActiveLink('/help')">
                  <QuestionMarkCircleIcon :class="isActiveIcon('/help')" aria-hidden="true" />
                  <span class="flex-1 ms-3 whitespace-nowrap">Help</span>
                </router-link>
              </li>
            </ul>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
  import {
    XMarkIcon,
    ArrowRightEndOnRectangleIcon,
    UserPlusIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    InformationCircleIcon,
    ArrowDownTrayIcon,
  } from "@heroicons/vue/24/outline";
  import { ref, watchEffect } from "vue";
  import { useRoute } from "vue-router";

  const emit = defineEmits(["menu-close"]);
  const props = defineProps<{ isOpen: boolean }>();
  const isOpen = ref(props.isOpen);
  const route = useRoute();

  const iconClass = "flex-shrink-0 w-6 h-6 transition duration-75 font-medium group-hover:text-white";
  const routerLinkClass = "flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group";

  const isActiveIcon = (to: string) => {
    if (route.path === to) {
      return iconClass + " text-white";
    }
    return iconClass + " text-gray-400";
  };

  const isActiveLink = (to: string) => {
    if (route.path === to) {
      return routerLinkClass + " bg-gray-700";
    }
    return routerLinkClass;
  };

  watchEffect(() => {
    isOpen.value = props.isOpen;
  });
</script>
