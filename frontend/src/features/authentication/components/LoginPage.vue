<template>
    <div class="flex items-center justify-center min-h-[82vh] bg-neutral-300">
      <div class="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-sky-700 lg:max-w-screen-2xl lg:h-full">
        <div class="hidden bg-cover lg:block lg:w-1/2" style="background-image: url('https://www.cancerresearchuk.org/sites/default/files/styles/cruk_no_style/public/large-18.-cruk-beatson-institute.jpg?itok=ksPme3eA');"></div>
  
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2 bg-purple lg:h-[60vh]">
          <div class="flex justify-center mx-auto">
            <img class="w-auto h-30 sm:h-32" src="@/features/authentication/images/MOSAIC.png" alt="">
          </div>
  
          <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>
  
          <a href="#" class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-purpleHover">
            <div class="px-4 py-2">
              <img class="w-auto h-10 sm:h-20" src="@/features/authentication/images/UofG.png" alt="UofG Logo">
            </div>
            <span class="w-5/6 px-4 py-3 font-bold text-center">Sign in with UofG SSO</span>
          </a>
  
          <div class="flex items-center justify-between my-[55px]">
            <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            <a class="text-xs text-center text-gray-500 uppercase dark:text-gray-400">or login with email</a>
            <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
  
          <form @submit.prevent="submitForm" novalidate class="mb-[55px]">
           
            <div class="mt-4">
              <inputfeild label="Email Address" inputId="LoggingEmailAddress" type="email" placeholder="Enter your email" :value="email" @update:value="email = $event" :error="emailError" />
            </div>

            <div class="mt-4">
              <inputfeild label="Password" inputId="loggingPassword" type="password" placeholder="Enter your password" :value="password" @update:value="password = $event" :error="passwordError" />    
            </div>
  
            <div class="mt-6">
              <button
                class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>
  
          <div class="flex items-center justify-between mt-[10px]">
            <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
              <router-link to="/auth/register" class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</router-link>
            <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import Inputfeild from './Inputfeild.vue';
  import { useLogin } from '../composables/useLogin';

  const {
     email,
      password,
      emailError,
      passwordError,
      submitForm
      
  } = useLogin();

</script>
  