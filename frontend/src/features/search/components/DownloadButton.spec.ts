import { mount } from '@vue/test-utils';
import DownloadButton from './DownloadButton.vue';
import { expect, it, describe } from 'vitest';

describe('DownloadButton.vue', () => {
    it('emits download event when button is clicked', async () => {
        const wrapper = mount(DownloadButton);
        expect(wrapper.emitted()).not.toHaveProperty('download-clicked');
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('download-clicked');
    });
});
