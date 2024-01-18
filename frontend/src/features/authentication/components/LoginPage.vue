<template>
  <div class="flex items-center justify-center bg-navy-800 flex-grow">
    <div class="flex w-full max-w-md lg:mx-auto overflow-hidden m-4 rounded-lg shadow-lg lg:max-w-5xl">
      <div class="hidden bg-cover bg-right lg:block lg:w-1/2" style="background-image: url('https://www.cancerresearchuk.org/sites/default/files/styles/cruk_no_style/public/large-18.-cruk-beatson-institute.jpg?itok=ksPme3eA');"></div>

      <div class="w-full px-6 py-8 md:px-8 lg:w-1/2 bg-white dark:bg-purple h-auto">
        <div class="flex justify-center mx-auto">
          <h1 class="text-gray-700 dark:text-white font-semibold text-5xl"> MOSAIC </h1>
        </div>

        <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        <a href="#" class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-purpleHover">
          <div class="px-4 py-2">
            <img class="w-auto h-10 xs:h-20" src="@/features/authentication/images/UofG.png" alt="UofG Logo">
          </div>
          <h1 class="w-5/6 py-3 font-bold pl-[18%]">Sign in with UofG SSO</h1>
        </a>

        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          <a class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or login with email</a>
          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form @submit.prevent="submitForm" novalidate>
         
          <div class="h-28 mt-4">
            <Inputfield label="Email Address" inputId="LoggingEmailAddress" type="email" placeholder="Enter your email" :value="email" @update:value="email = $event" :error="emailError" />
          </div>

          <div class="h-28">
            <Inputfield label="Password" inputId="loggingPassword" type="password" placeholder="Enter your password" :value="password" @update:value="password = $event" :error="passwordError" />    
          </div>

          <div class="mt-3">
            <button
              class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-purpleHover focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Sign In
            </button>
          </div>

        </form>

        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
            <router-link to="/auth/register" class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</router-link>
          <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputfield from '@/components/InputFields/Inputfield.vue';;
import { useLogin } from '../composables/useLogin';

const {
   email,
    password,
    emailError,
    passwordError,
    submitForm
    
} = useLogin();

</script>
