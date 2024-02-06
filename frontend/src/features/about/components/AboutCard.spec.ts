import { mount } from '@vue/test-utils';
import AboutCard from './AboutCard.vue';
import { describe, expect, it } from 'vitest';

describe('AboutCard.vue', () => {
    it('should render correctly', () => {
        const wrapper = mount(AboutCard);
        expect(wrapper.find('h1').text()).toBe('About');
        expect(wrapper.find('p').text()).toContain('MOSAIC (Mouse Model Open-Source Information and Archive Center)');
        expect(wrapper.find('p').text()).toContain('and behavioural data.');
    });
});
