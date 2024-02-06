import { mount } from '@vue/test-utils';
import HamburgerMenu from './HamburgerMenu.vue';
import { expect, describe, it } from 'vitest';

describe('HamburgerMenu.vue', () => {
    it('should render', () => {
        const wrapper = mount(HamburgerMenu);
        expect(wrapper.exists()).toBe(true);
    });

    it('should emit "menu-open" event when button is clicked', async () => {
        const wrapper = mount(HamburgerMenu);

        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted()).toHaveProperty('menu-open');
    });
});
