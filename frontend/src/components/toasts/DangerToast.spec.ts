import { mount } from '@vue/test-utils';
import DangerToast from './DangerToast.vue';
import { describe, expect, it } from 'vitest';

const wrapperFunction = () =>
    mount(DangerToast, {
        props: {
            message: 'This is an error message',
        },
    });

describe('DangerToast.vue', () => {
    it('should render', () => {
        const wrapper = wrapperFunction();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render error messages correctly', () => {
        const wrapper = wrapperFunction();
        expect(wrapper.text()).toContain('This is an error message');
    });

    it('should emit when close button pressed', async () => {
        const wrapper = wrapperFunction();

        expect(wrapper.emitted()).not.toHaveProperty('closeToast');

        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('closeToast');
    });
});
