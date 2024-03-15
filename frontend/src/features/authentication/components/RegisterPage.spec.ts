import { mount } from '@vue/test-utils';
import RegisterPage from './RegisterPage.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/stores/authStore';

const renderRegisterPage = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    const authStore = useAuthStore(pinia);
    authStore.register = vi.fn().mockResolvedValue(undefined);

    const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    });

    return mount(RegisterPage, {
        global: {
            plugins: [pinia, router],
            provide: { isDev: true },
        },
    });
};

let router;
describe('RegisterPage.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderRegisterPage();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render text correctly', () => {
        const wrapper = renderRegisterPage();

        expect(wrapper.find('h2').text()).toBe('Create an Account');

        expect(wrapper.findAll('label')[0].text()).toBe('Full Name');
        expect(wrapper.findAll('label')[1].text()).toBe('Email Address');
        expect(wrapper.findAll('label')[2].text()).toBe('Password');
        expect(wrapper.findAll('label')[3].text()).toBe('Confirm Password');

        expect(wrapper.find('button').text()).toBe('Register');
    });

    it('should submit the form when provided with correct values', async () => {
        const wrapper = renderRegisterPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');
        await input[0].setValue('test');
        await input[1].setValue('testemail@gmail.com');
        await input[2].setValue('Password123!');
        await input[3].setValue('Password123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(0);
    });

    it('should display errors when input values are invalid', async () => {
        const wrapper = renderRegisterPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');

        await input[0].setValue('');
        await input[1].setValue('');
        await input[2].setValue('');
        await input[3].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(3);
        expect(form.findAll('p')[0].text()).toBe('Full name must be at least 3 characters.');
        expect(form.findAll('p')[1].text()).toBe('Email is required.');
        expect(form.findAll('p')[2].text()).toBe('Password is required.');

        await input[0].setValue('Full Name');
        await input[1].setValue('');
        await input[2].setValue('');
        await input[3].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);
        expect(form.findAll('p')[0].text()).toBe('Email is required.');
        expect(form.findAll('p')[1].text()).toBe('Password is required.');

        await input[0].setValue('Full Name');
        await input[1].setValue('wrongemail');
        await input[2].setValue('');
        await input[3].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(2);
        expect(form.findAll('p')[0].text()).toBe('Invalid email format.');
        expect(form.findAll('p')[1].text()).toBe('Password is required.');

        await input[0].setValue('Full Name');
        await input[1].setValue('correctemail@gmail.com');
        await input[2].setValue('');
        await input[3].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe('Password is required.');

        await input[0].setValue('Full Name');
        await input[1].setValue('correctemail@gmail.com');
        await input[2].setValue('wrongpassword');
        await input[3].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe(
            'Password must be at least 8 characters long and include an uppercase letter and a number.'
        );
    });

    it('should correctly handle invalid confirmed password', async () => {
        const wrapper = renderRegisterPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');

        await input[0].setValue('Full Name');
        await input[1].setValue('correctemail@gmail.com');
        await input[2].setValue('CorrectPassword123!');
        await input[3].setValue('dassd');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe('Confirm password must match password.');

        await input[0].setValue('Full Name');
        await input[1].setValue('correctemail@gmail.com');
        await input[2].setValue('CorrectPassword123!');
        await input[3].setValue('');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(1);
        expect(form.findAll('p')[0].text()).toBe('Confirm password is required.');

        await input[0].setValue('Full Name');
        await input[1].setValue('correctemail@gmail.com');
        await input[2].setValue('CorrectPassword123!');
        await input[3].setValue('CorrectPassword123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(0);
    });

    it('should remove errors when provided with correct input values', async () => {
        const wrapper = renderRegisterPage();

        const form = wrapper.find('form');
        const input = form.findAll('input');
        await input[0].setValue('a');
        await input[1].setValue('wrongemail.com');
        await input[2].setValue('wrongpassword');
        await input[3].setValue('badpassword');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(3);

        await input[0].setValue('test');
        await input[1].setValue('testemail@gmail.com');
        await input[2].setValue('Password123!');
        await input[3].setValue('Password123!');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(0);
    });
});
