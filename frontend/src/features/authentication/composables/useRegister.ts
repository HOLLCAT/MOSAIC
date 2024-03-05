import { ref } from 'vue';
import { validateFullName, validateEmail, validatePassword, validateConfirmPassword } from '../utils/Validation';
import { useAuthStore } from '@/stores/authStore';

export function useRegister() {
  const fullName = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  const fullNameError = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const confirmPasswordError = ref<string>('');

  const authStore = useAuthStore();

  const submitForm = () => {
    fullNameError.value = validateFullName(fullName.value);
    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);

    if (passwordError.value) return;
    confirmPasswordError.value = validateConfirmPassword(confirmPassword.value, password.value);

    if (!fullNameError.value && !emailError.value && !passwordError.value && !confirmPasswordError.value) {
      const form = {
        name: fullName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      };

      authStore.register(form);
    };
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
