import { mount } from '@vue/test-utils';
import SearchBar from './SearchBar.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';

let router: Router;
describe('SearchBar.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should submit the form and routes to the search page', async () => {
        const wrapper = mount(SearchBar, {
            global: {
                plugins: [router],
            },
        });

        const form = wrapper.find('form');
        const input = form.find('input');
        await input.setValue('test query');

        const push = vi.spyOn(router, 'push');
        await form.trigger('submit');

        expect(push).toHaveBeenCalledWith({ name: 'search', params: { query: 'test query' } });
        expect(input.element.value).toBe('');
    });
});
