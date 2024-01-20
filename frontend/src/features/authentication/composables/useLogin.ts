import { validateEmail, validatePassword } from '../utils/Validation';
import { ref, computed, onMounted, onUpdated } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import qs from 'qs';
export const useLogin = () => {

  const email = ref<string>('');
  const password = ref<string>('');
  const emailError = ref<string>('');
  const passwordError = ref<string>('');
  const user = computed(() => store.getters['auth/getUser']);
  const router = useRouter();
  const store = useStore();

  onMounted(() => {
    if (user.value) {
      const router = useRouter();
      router.push('/');
    }
  });

  onUpdated(() => {
    const user = computed(() => store.getters['auth/getUser']);
    if (user.value) {
      router.push('/');
    }
  });

  const submitForm = () => {
    emailError.value = validateEmail(email.value);
    passwordError.value = validatePassword(password.value);

    if (emailError.value) {
      return;
    }
    const form = qs.stringify({
      username: email.value,
      password: password.value
    });

    store.dispatch('auth/login', form).then(() => {
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