import { ref } from 'vue';
import { validateFullName, validateEmail, validatePassword, validateConfirmPassword } from '../utils/Validation';

export function useRegister() {
  const fullName = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  const fullNameError = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const confirmPasswordError = ref<string>('');

  const submitForm = () => {
    fullNameError.value = validateFullName(fullName.value);
    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);

    if (passwordError.value) return;
    confirmPasswordError.value = validateConfirmPassword(confirmPassword.value, password.value);
  };

  return {
    fullName,
    email,
    password,
    confirmPassword,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    submitForm
  };
}
