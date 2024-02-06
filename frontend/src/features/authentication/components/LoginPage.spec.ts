import { mount } from '@vue/test-utils';
import LoginPage from './LoginPage.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { createStore } from 'vuex';

const mockStore = createStore({
    modules: {
        auth: {
            namespaced: true,
            state() {
                return {
                    user: null,
                };
            },
            getters: { getUser: (state) => state.user },
            mutations: {
                setUser(state) {
                    state.user = { name: 'test' };
                },
            },
            actions: { login: vi.fn() },
        },
    },
});

const renderLoginPage = () =>
    mount(LoginPage, {
        global: {
            plugins: [router, mockStore],
        },
    });

let router: Router;
describe('LoginPage.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderLoginPage();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render text correctly', () => {
        const wrapper = renderLoginPage();

        expect(wrapper.findAll('h1')[0].text()).toBe('MOSAIC');

        expect(wrapper.find('p').text()).toBe('Welcome back!');

        expect(wrapper.findAll('h1')[1].text()).toBe('Sign in with UofG SSO');
        expect(wrapper.findAll('a')[1].text()).toBe('or login with email');

        expect(wrapper.findAll('label')[0].text()).toBe('Email Address');
        expect(wrapper.findAll('label')[1].text()).toBe('Password');

        expect(wrapper.find('button').text()).toBe('Sign In');
    });

    it('should have the submit button working correctly', async () => {
        const wrapper = renderLoginPage();
        const form = wrapper.find('form');

        const push = vi.spyOn(wrapper.vm, 'submitForm');
        expect(push).not.toHaveBeenCalled();
        await form.trigger('submit');
        expect(push).toHaveBeenCalled();
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
