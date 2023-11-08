import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/features/home/index.vue';
import AboutPage from '@/features/about/index.vue';
import SearchPage from '@/features/search/index.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/search/:query', component: SearchPage }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link'

});

export default router;