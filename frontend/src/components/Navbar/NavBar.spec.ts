import { mount } from '@vue/test-utils';
import NavBar from './NavBar.vue';
import { nextTick } from 'vue';
import { it, expect, describe, vi } from 'vitest';
import router from '@/router';
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/authStore';

const renderNavBar = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    return mount(NavBar, {
        global: {
            plugins: [router, pinia],
            provide: { isDev: true },
        },
    });
};

describe('NavBar.vue', () => {
    it('should render NavBar correctly', async () => {
        const wrapper = renderNavBar();
        expect(wrapper.find('a[href="/"]').text()).toBe('MOSAIC');
    });

    it('should have handleMenuOpen and handleMenuClose working correctly', async () => {
        const wrapper = renderNavBar();
        wrapper.vm.handleMenuOpen();
        await nextTick();
        expect(wrapper.vm.isOpen).toBe(true);
        wrapper.vm.handleMenuClose();
        await nextTick();
        expect(wrapper.vm.isOpen).toBe(false);
    });

    it('should have activeClass returning correct classes', () => {
        const wrapper = renderNavBar();
        expect(wrapper.vm.activeClass('/')).toBe('bg-slate-600 p-6 border-t-4 cursor-pointer');
        expect(wrapper.vm.activeClass('/other')).toBe(
            'p-6 border-t-4 border-transparent hover:bg-slate-600 cursor-pointer'
        );
    });

    it('should have handleLogout working correctly', async () => {
        const wrapper = renderNavBar();
        const authStore = useAuthStore();
        const logoutSpy = vi.spyOn(authStore, 'logout');
        expect(logoutSpy).not.toHaveBeenCalled();
        await wrapper.vm.handleLogout();
        expect(logoutSpy).toHaveBeenCalled();
    });

    it('should render correct links when user is null', () => {
        const wrapper = renderNavBar();

        expect(wrapper.find('a[href="/auth/login"]').exists()).toBe(true);
        expect(wrapper.find('a[href="/auth/register"]').exists()).toBe(true);
        expect(wrapper.find('a[href="/upload"]').exists()).toBe(false);
    });

    it('should render correct links when user is not null', async () => {
        const wrapper = renderNavBar();
        const authStore = useAuthStore();
        authStore.$state.user = { name: 'test', email: 'test@gmail.com', access_token: ' ' };
        await nextTick();

        expect(wrapper.find('a[href="/auth/login"]').exists()).toBe(false);
        expect(wrapper.find('a[href="/auth/register"]').exists()).toBe(false);

        expect(wrapper.find('a[href="/upload"]').exists()).toBe(true);
        expect(wrapper.find('button').exists()).toBe(true);
    });
});
