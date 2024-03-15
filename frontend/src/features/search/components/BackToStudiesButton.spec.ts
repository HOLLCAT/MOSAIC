import { mount } from '@vue/test-utils';
import BackToStudiesButton from './BackToStudiesButton.vue';
import { expect, it, describe } from 'vitest';

describe('BackToStudiesButton.vue', () => {
    it('emits back to studies event when button is clicked', async () => {
        const wrapper = mount(BackToStudiesButton);
        expect(wrapper.emitted()).not.toHaveProperty('back-to-studies-clicked');
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('back-to-studies-clicked');
    });
});
