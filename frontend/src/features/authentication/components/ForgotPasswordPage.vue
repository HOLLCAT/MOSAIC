<template>
    <div class="flex items-center justify-center min-h-screen bg-navy-800">
      <div class="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-sky-700 lg:max-w-4xl">
        <div class="hidden bg-cover lg:block lg:w-1/2" style="background-image: url('https://www.cancerresearchuk.org/sites/default/files/styles/cruk_no_style/public/large-18.-cruk-beatson-institute.jpg?itok=ksPme3eA');"></div>
        
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h2 class="text-2xl font-bold text-center text-gray-700 dark:text-white">Forgot Your Password?</h2>
          <p class="mt-2 text-sm text-center text-gray-600 dark:text-gray-200">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
          
          <form @submit.prevent="submitForm" novalidate class="mt-6">
            <div>
              <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200" for="email">Email Address</label>
              <input id="email" v-model.trim="email" @input="validateEmail"
                type="email" placeholder="example@domain.com"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"/>
              <p v-if="emailError" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ emailError }}</p>
            </div>
  
            <div class="mt-6">
              <button
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="submit">
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang = "ts">
  export default {
    data() {
      return {
        email: '',
        emailError: '',
      };
    },
    methods: {
      submitForm() {
        const isEmailValid = this.validateEmail();
        
        if (isEmailValid) {
          console.log('Email is valid. Sending reset link...');
        }
      },
      validateEmail() {
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        this.emailError = pattern.test(this.email) ? '' : 'Please enter a valid email address.';
        return !this.emailError;
      },
    },
  };
  </script>
  