import { ref } from 'vue';

export function useRegister() {
  const fullName = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  const fullNameError = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const confirmPasswordError = ref<string>('');

 

  return {
    fullName,
    email,
    password,
    confirmPassword,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
  };
}
