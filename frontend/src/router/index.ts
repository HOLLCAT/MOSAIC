import { createRouter, createWebHistory } from 'vue-router';
import ParentVue from './parent.vue';
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
    {
        path: '/search/:query',
        component: ParentVue,
        children: [
            { path: '', component: SearchPage, name: 'search' },
        ],
    },
    { path: '/auth/:mode', component: Authentication, name: 'auth' },
    { path: '/study/:id', component: StudyPage, name: 'study' },
    { path: '/upload', component: UploadPage, name: 'upload', meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/', name: 'default' },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'active-link',
});

router.beforeEach(async (to, from, next) => {
    let isLoggedIn = store.getters['auth/isLoggedIn'];

    if (store.getters['auth/isRefreshingToken']) {
        // Wait for the refresh token request to complete
        await new Promise(resolve => {
            const unwatch = store.watch(
                (state, getters) => getters['auth/isRefreshingToken'],
                (isRefreshing) => {
                    if (!isRefreshing) 
                    {
                        isLoggedIn = store.getters['auth/isLoggedIn'];
                        unwatch();
                        resolve(null);
                    }
                }
            );
        });
    }

    if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
        next({ name: 'auth', params: { mode: 'login' } });
    } else if (to.name === 'auth' && isLoggedIn) {
        next({ name: 'home' });
    } else if (to.name === 'download-samples' && from.name !== 'search') {
        next({ name: 'search', params: { query: from.params.query } });
    } else {
        next();
    }
});

export default router;
