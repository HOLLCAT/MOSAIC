import { validateEmail, validatePassword } from '../utils/Validation';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export const useLogin = () => {

  const email = ref<string>('');
  const password = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const router = useRouter();
  const store = useStore();

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

    store.dispatch('auth/login', form).then((res) => {
      if (res)
        router.push('/');
    });
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    submitForm
  };
};