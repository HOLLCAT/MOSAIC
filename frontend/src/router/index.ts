import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import SearchPage from '@/pages/SearchPage.vue';

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