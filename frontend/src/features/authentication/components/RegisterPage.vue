<template>
    <div class="flex items-center justify-center min-h-[82vh] bg-neutral-300">
      <div class="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-purple lg:max-w-screen-2xl lg:h-full">
        <div class="hidden bg-cover lg:block lg:w-1/2" style="background-image: url('https://www.cancerresearchuk.org/sites/default/files/styles/cruk_no_style/public/large-18.-cruk-beatson-institute.jpg?itok=ksPme3eA');"></div>
        
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2 lg:h-[60vh]">
          <h2 class="text-2xl font-bold text-center text-gray-700 dark:text-white">Create an Account</h2>
          
          <form @submit.prevent="submitForm" novalidate class="mt-6">

            <Inputfeild label="Full Name" inputId="fullName" type="text" placeholder="John Doe" :value="fullName" @update:value="fullName = $event" :error="fullNameError" />

            <div class="lg:mt-[40px] mt-4">
              <Inputfeild label="Email Address" inputId="email" type="email" placeholder="example@domain.com" :value="email" @update:value="email = $event" :error="emailError" />
            </div>
  
            <div class="lg:mt-[40px] mt-4">
              <Inputfeild label="Password" inputId="password" type="password" placeholder="********" :value="password" @update:value="password = $event" :error="passwordError" />
            </div>
  
            <div class="lg:mt-[40px] mt-4">
              <Inputfeild label="Confirm Password" inputId="confirmPassword" type="password" placeholder="********" :value="confirmPassword" @update:value="confirmPassword = $event" :error="confirmPasswordError" />
            </div>
  
            <div class="lg:mt-[80px] my-6">
              <button
                class="w-full px-4 py-2 lg:p-4 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-purpleHover focus:outline-none focus:bg-gray-600"
                type="submit">
                Register
              </button>
            </div>
          </form>
          <div class="flex items-center justify-between mt-4 lg:mt-[50px]">
              <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                <router-link to="/auth/login" class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or Login</router-link>
              <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
            </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
import Inputfeild from './Inputfeild.vue';
import { useRegister } from '../composables/useRegister';

const {
    fullName,
    email,
    password,
    confirmPassword,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    submitForm
    
} = useRegister();
    
</script>
  