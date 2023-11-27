import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/features/home/index.vue';
import AboutPage from '@/features/about/index.vue';
import SearchPage from '@/features/search/index.vue';
import Authentication from '@/features/authentication/index.vue';
import StudyPage from '@/features/study/index.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/search/:query', component: SearchPage },
  { path: '/auth/:mode', component:  Authentication},
  { path: '/study/:id', component: StudyPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'active-link'

});

export default router;