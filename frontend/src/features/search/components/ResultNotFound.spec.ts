import { mount } from '@vue/test-utils';
import ResultNotFound from './ResultNotFound.vue';
import { describe, it, expect } from 'vitest';

describe('ResultNotFound.vue', () => {
    it('should render', () => {
        const wrapper = mount(ResultNotFound);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render text correctly', () => {
        const wrapper = mount(ResultNotFound);

        expect(wrapper.findAll('h2')[0].text()).toBe('No results found');

        expect(wrapper.find('p').text()).toBe('Try adjusting your search or filter');
    });
});
