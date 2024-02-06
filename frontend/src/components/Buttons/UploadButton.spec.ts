import { mount } from '@vue/test-utils';
import UploadButton from './UploadButton.vue';
import { expect, it, describe, vi } from 'vitest';

describe('UploadButton.vue', () => {
    it('should trigger file input click on button click', async () => {
        const wrapper = mount(UploadButton);
        const fileInput = wrapper.find('input[type="file"]');
        const clickSpy = vi.spyOn(fileInput.element as HTMLInputElement, 'click');

        await wrapper.find('button').trigger('click');

        expect(clickSpy).toHaveBeenCalled();
    });

    it('should emit fileUploaded event with uploaded File', async () => {
        const wrapper = mount(UploadButton);
        const inputFile = wrapper.find<HTMLInputElement>('input[type="file"]');

        const fileMock = new File(['(file content)'], 'sample.txt', {
            type: 'text/plain',
        });

        expect(inputFile.exists()).toBe(true);

        Object.defineProperty(inputFile.element, 'files', {
            value: [fileMock],
            writable: false,
        });

        await inputFile.trigger('change');

        expect(wrapper.emitted('fileUploaded')).toBeTruthy();
        // @ts-ignore
        expect(wrapper.emitted('fileUploaded')[0].pop()).toBe(fileMock);
    });
});
