import { mount } from '@vue/test-utils';
import UserDetails from './UserDetails.vue';
import { expect, describe, it, vi } from 'vitest';

vi.mock('@/composables/useCurrentUser', () => {
    return {
        useCurrentUser: vi.fn(() => ({
            user: {
                name: 'John',
                email: 'john@example.com',
            },
        })),
    };
});

describe('UserDetails.vue', () => {
    it('should render', () => {
        const wrapper = mount(UserDetails);
        expect(wrapper.exists()).toBe(true);
    });

    it('displays user information correctly', () => {
        const wrapper = mount(UserDetails);

        expect(wrapper.text()).toContain('Name: John');
        expect(wrapper.text()).toContain('Email Address: john@example.com');
    });
});
