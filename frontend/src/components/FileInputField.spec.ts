import { mount } from '@vue/test-utils';
import FileInputField from './FileInputField.vue';
import { describe, expect, it, vi } from 'vitest';

const event = {
    target: {
        files: [
            {
                name: 'textfile.txt',
                size: 200,
                type: 'text/txt',
            },
        ],
    },
};

describe('FileInputField.vue', () => {
    it('should render', () => {
        const wrapper = mount(FileInputField);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render correctly with props and handle changes', async () => {
        const props = {
            label: 'File',
            inputId: 'file',
            value: '',
            error: '',
        };

        const wrapper = mount(FileInputField, {
            props,
        });

        expect(wrapper.find('label').text()).toBe(props.label);
        expect(wrapper.find('input').attributes('id')).toBe(props.inputId);

        const spyObject = vi.spyOn(wrapper.vm, 'handleFileChange');

        expect(spyObject).not.toHaveBeenCalled();

        // @ts-ignore
        wrapper.vm.handleFileChange(event);

        expect(spyObject).toHaveBeenCalled();

        expect(wrapper.find('p').exists()).toBe(false);
        await wrapper.setProps({ error: 'Error Message' });
        expect(wrapper.find('p').text()).toBe('Error Message');
        await wrapper.setProps({ error: '' });
        expect(wrapper.find('p').exists()).toBe(false);
    });
});
