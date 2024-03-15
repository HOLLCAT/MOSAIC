import { mount } from '@vue/test-utils';
import LoginPage from './LoginPage.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/stores/authStore';

const renderLoginPage = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    const authStore = useAuthStore(pinia);
    authStore.login = vi.fn().mockResolvedValue(undefined);
    return mount(LoginPage, {
        global: {
            plugins: [
                createRouter({
                    history: createWebHistory(),
                    routes,
                }),
                pinia,
            ],
            provide: { isDev: true },
        },
    });
};

let router;
describe('LoginPage.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
        setActivePinia(createPinia());
    });

    it('should render', () => {
        const wrapper = renderLoginPage();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render text correctly', () => {
        const wrapper = renderLoginPage();

        expect(wrapper.findAll('h1')[0].text()).toBe('MOSAIC');

        expect(wrapper.find('p').text()).toBe('Welcome back!');

        expect(wrapper.findAll('label')[0].text()).toBe('Email Address');
        expect(wrapper.findAll('label')[1].text()).toBe('Password');

        expect(wrapper.find('button').text()).toBe('Sign In');
    });

    it('should submit the form when provided with correct values', async () => {
        const wrapper = renderLoginPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');
        await input[0].setValue('testemail@gmail.com');
        await input[1].setValue('Password123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(0);
    });

    it('should display errors when input values are invalid', async () => {
        const wrapper = renderLoginPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');

        await input[0].setValue('');
        await input[1].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);
        expect(form.findAll('p')[0].text()).toBe('Email is required.');
        expect(form.findAll('p')[1].text()).toBe('Password is required.');

        await input[0].setValue('wrongemail.com');
        await input[1].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);
        expect(form.findAll('p')[0].text()).toBe('Invalid email format.');
        expect(form.findAll('p')[1].text()).toBe('Password is required.');

        await input[0].setValue('');
        await input[1].setValue('wrongpassword');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);
        expect(form.findAll('p')[0].text()).toBe('Email is required.');
        expect(form.findAll('p')[1].text()).toBe(
            'Password must be at least 8 characters long and include an uppercase letter and a number.'
        );

        await input[0].setValue('wrongemail.com');
        await input[1].setValue('wrongpassword');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);
        expect(form.findAll('p')[0].text()).toBe('Invalid email format.');
        expect(form.findAll('p')[1].text()).toBe(
            'Password must be at least 8 characters long and include an uppercase letter and a number.'
        );

        await input[0].setValue('correctemail@gmail.com');
        await input[1].setValue('wrongpassword');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe(
            'Password must be at least 8 characters long and include an uppercase letter and a number.'
        );

        await input[0].setValue('wrongemail.com');
        await input[1].setValue('CorrectPassword123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe('Invalid email format.');

        await input[0].setValue('correctemail@gmail.com');
        await input[1].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe('Password is required.');

        await input[0].setValue('');
        await input[1].setValue('CorrectPassword123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe('Email is required.');
    });

    it('should remove the errors when provided with correct input values', async () => {
        const wrapper = renderLoginPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');
        await input[0].setValue('wrongemail.com');
        await input[1].setValue('wrongpassword');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);

        await input[0].setValue('testemail@gmail.com');
        await input[1].setValue('Password123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(0);
    });
});
