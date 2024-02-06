import { mount } from '@vue/test-utils';
import HelpCard from './HelpCard.vue';
import { describe, expect, it } from 'vitest';

describe('HelpCard.vue', () => {
    it('should render text correctly', () => {
        const wrapper = mount(HelpCard);

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find('h1').text()).toBe('Help');
        expect(wrapper.find('h2').text()).toBe('Need any help?');
        expect(wrapper.find('p').text()).toBe('Feel free to contact us');
    });
});
