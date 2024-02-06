import { mount } from '@vue/test-utils';
import DatabankCard from './DatabankCard.vue';
import { expect, describe, it } from 'vitest';

describe('DatabankCard.vue', () => {
    it('should render', () => {
        const wrapper = mount(DatabankCard);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render heading', () => {
        const wrapper = mount(DatabankCard);
        expect(wrapper.find('h1').text()).toBe('Databank');
    });

    it('should render titles', () => {
        const wrapper = mount(DatabankCard);
        const titles = wrapper.findAll('[testid="title"]');
        expect(titles).toHaveLength(3);

        const correctTitles = ['Projects', 'Files', 'Genes'];
        titles.forEach(function (title, i) {
            expect(title.exists()).toBe(true);
            expect(title.text()).toBe(correctTitles[i]);
        });
    });

    it('should render icons', () => {
        const wrapper = mount(DatabankCard);
        const svgs = wrapper.findAll('svg');
        expect(svgs).toHaveLength(3);

        svgs.forEach((svg) => {
            expect(svg.exists()).toBe(true);
            expect(svg.attributes('fill')).toBe('none');
        });
    });
});
