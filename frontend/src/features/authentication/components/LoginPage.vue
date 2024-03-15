<template>
  <div class="flex items-center justify-center bg-navy-800 flex-grow">
    <div class="flex w-full max-w-md lg:mx-auto overflow-hidden m-4 rounded-lg shadow-lg lg:max-w-5xl">
      <div class="hidden bg-cover bg-right lg:block lg:w-1/2">
        <img src="/Beatson.jpg" alt="Beatson" class="object-cover w-full h-full" />
      </div>

      <div class="w-full px-6 py-8 md:px-8 lg:w-1/2 bg-purple h-auto">
        <div class="flex justify-center mx-auto">
          <h1 class="text-white font-semibold text-5xl"> MOSAIC </h1>
        </div>

        <p class="mt-3 text-xl text-center text-gray-200">
          Welcome back!
        </p>

        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b border-gray-400 lg:w-1/4"></span>
          <a class="text-base text-center uppercase text-gray-400">login</a>
          <span class="w-1/5 border-b border-gray-400 lg:w-1/4"></span>
        </div>

        <form @submit.prevent="submitForm" novalidate>

          <div class="h-28 mt-4">
            <Inputfield label="Email Address" inputId="LoggingEmailAddress" type="email" placeholder="Enter your email"
              :value="email" @update:value="email = $event" :error="emailError" />
          </div>

          <div class="h-28">
            <Inputfield label="Password" inputId="loggingPassword" type="password" placeholder="Enter your password"
              :value="password" @update:value="password = $event" :error="passwordError" />
          </div>

          <div class="mt-3">
            <button type="submit"
              class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-purpleHover focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>

        </form>

        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-gray-400 md:w-1/4"></span>
          <router-link to="/auth/register" class="text-xs uppercase text-gray-400 hover:underline">or sign
            up</router-link>
          <span class="w-1/5 border-gray-400 md:w-1/4"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputfield from '@/components/InputFields/Inputfield.vue';
import { validateEmail, validatePassword } from '../utils/Validation';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';

const emits = defineEmits<{
  showToast: [message: string]
}>();

const authStore = useAuthStore();

const email = ref<string>('');
const password = ref<string>('');
const emailError = ref<string>('');
const passwordError = ref<string>('');

const submitForm = () => {
  emailError.value = validateEmail(email.value);
  passwordError.value = validatePassword(password.value);

  if (emailError.value) {
    return;
  }
  const form = {
    email: email.value,
    password: password.value
  };

  authStore.login(form).then((res) => {
    if (res) {
      emits('showToast', res);
    }
  })
};


defineExpose({ submitForm })
</script>
