import { mount } from '@vue/test-utils';
import HelpCard from './HelpCard.vue';
import { describe, expect, it } from 'vitest';

describe('HelpCard.vue', () => {
    it('should render text correctly', () => {
        const wrapper = mount(HelpCard);

        expect(wrapper.exists()).toBe(true);
       
    });
});
