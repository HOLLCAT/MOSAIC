import { validateEmail, validatePassword } from '../utils/Validation';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export const useLogin = () => {

  const email = ref<string>('');
  const password = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const authStore = useAuthStore();

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

    authStore.login(form);
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    submitForm
  };
};