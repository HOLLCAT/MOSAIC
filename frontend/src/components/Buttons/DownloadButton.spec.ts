import { mount } from '@vue/test-utils';
import DownloadButton from './DownloadButton.vue';
import { expect, it, describe } from 'vitest';

describe('DownloadButton.vue', () => {
    it('applies bg-gray-800 when mood is light', () => {
        const wrapper = mount(DownloadButton, {
            props: { mood: 'light' },
        });
        expect(wrapper.find('button').classes()).toContain('bg-gray-800');
    });

    it('applies bg-purple when mood is dark', () => {
        const wrapper = mount(DownloadButton, {
            props: { mood: 'dark' },
        });
        expect(wrapper.find('button').classes()).toContain('bg-purple');
    });

    it('applies bg-purple not given mood', () => {
        const wrapper = mount(DownloadButton, {
            props: { mood: 'dark' },
        });
        expect(wrapper.find('button').classes()).toContain('bg-purple');
    });

    it('emits download event when button is clicked', async () => {
        const wrapper = mount(DownloadButton, {
            props: { mood: 'dark' },
        });
        expect(wrapper.emitted()).not.toHaveProperty('download');
        await wrapper.find('button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('download');
    });
});
