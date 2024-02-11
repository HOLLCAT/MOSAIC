import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/features/home/index.vue';
import AboutPage from '@/features/about/index.vue';
import HelpPage from '@/features/help/index.vue';
import SearchPage from '@/features/search/index.vue';
import Authentication from '@/features/authentication/index.vue';
import StudyPage from '@/features/study/index.vue';
import UploadPage from '@/features/upload/index.vue';

import { store } from '@/store';

export const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/about', component: AboutPage, name: 'about' },
  { path: '/help', component: HelpPage, name: 'help' },
  { path: '/search/:query', component: SearchPage, name: 'search' },
  { path: '/auth/:mode', component: Authentication, name: 'auth' },
  { path: '/study/:id', component: StudyPage, name: 'study' },
  { path: '/upload', component: UploadPage, name: 'upload', meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/', name: 'default' }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link'

});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/isLoggedIn']

  if ((to.matched.some(record => record.meta.requiresAuth)) && !isLoggedIn) {
    next({ name: 'auth', params: { mode: 'login' } });
  } else if ((to.name === 'auth') && isLoggedIn) {
    next({ name: 'home' });
  } else {
    next()
  }
});

export default router;