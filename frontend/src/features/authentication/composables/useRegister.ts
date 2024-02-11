import { ref } from 'vue';
import { validateFullName, validateEmail, validatePassword, validateConfirmPassword } from '../utils/Validation';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export function useRegister() {
  const fullName = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');
  const confirmPassword = ref<string>('');
  const fullNameError = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const confirmPasswordError = ref<string>('');

  const router = useRouter();

  const store = useStore();

  const submitForm = () => {
    fullNameError.value = validateFullName(fullName.value);
    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);

    if (passwordError.value) return;
    confirmPasswordError.value = validateConfirmPassword(confirmPassword.value, password.value);

    if (!fullNameError.value && !emailError.value && !passwordError.value && !confirmPasswordError.value) {
      store.dispatch('auth/register', {
        name: fullName.value,
        email: email.value,
        password: password.value,
        confirm_password: confirmPassword.value,
        role: 'user'
      }).then((res) => {
        res && router.push('/');
      });
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
