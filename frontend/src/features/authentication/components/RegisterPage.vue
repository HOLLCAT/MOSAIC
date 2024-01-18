<template>
  <div class="flex items-center justify-center bg-navy-800 flex-grow">
    <div class="flex w-full max-w-md m-4 lg:mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-purple lg:max-w-5xl">
      <div class="hidden bg-cover bg-right lg:block lg:w-1/2" style="background-image: url('https://www.cancerresearchuk.org/sites/default/files/styles/cruk_no_style/public/large-18.-cruk-beatson-institute.jpg?itok=ksPme3eA');"></div>
      
      <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <h2 class="text-2xl font-bold text-center text-gray-700 dark:text-white">Create an Account</h2>
        
        <form @submit.prevent="submitForm" novalidate>

          <div class="h-28 mt-6">
            <Inputfield label="Full Name" inputId="fullName" type="text" placeholder="John Doe" :value="fullName" @update:value="fullName = $event" :error="fullNameError" />
          </div>
          
          <div class="h-28">
            <Inputfield label="Email Address" inputId="email" type="email" placeholder="example@domain.com" :value="email" @update:value="email = $event" :error="emailError" />
          </div>

          <div class="h-28">
            <Inputfield label="Password" inputId="password" type="password" placeholder="********" :value="password" @update:value="password = $event" :error="passwordError" />
          </div>

          <div class="h-28">
            <Inputfield label="Confirm Password" inputId="confirmPassword" type="password" placeholder="********" :value="confirmPassword" @update:value="confirmPassword = $event" :error="confirmPasswordError" />
          </div>

            <button
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-purpleHover focus:outline-none focus:bg-gray-600"
              type="submit">
              Register
            </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputfield from '@/components/InputFields/Inputfield.vue';
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
