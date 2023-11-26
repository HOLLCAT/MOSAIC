import { validateEmail, validatePassword } from '../utils/Validation';
import { ref } from 'vue';
export const useLogin = () => {

  const email = ref<string>('');
  const password = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');

  const submitForm = () => {
    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    submitForm
  };
};