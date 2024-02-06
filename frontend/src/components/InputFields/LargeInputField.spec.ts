import { mount } from '@vue/test-utils';
import LargeInputField from './LargeInputField.vue';
import { describe, expect, it } from 'vitest';

describe('LargeInputField.vue', () => {
    it('should render', () => {
        const wrapper = mount(LargeInputField);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render correctly with props and handles changes', async () => {
        const props = {
            label: 'Username',
            inputId: 'username',
            placeholder: 'Enter your username',
            value: '',
            error: '',
        };

        const wrapper = mount(LargeInputField, {
            props,
        });

        expect(wrapper.find('label').text()).toBe(props.label);
        expect(wrapper.find('textarea').attributes('id')).toBe(props.inputId);
        expect(wrapper.find('textarea').attributes('placeholder')).toBe(props.placeholder);

        expect(wrapper.find('textarea').element.value).toBe(props.value);
        await wrapper.find('textarea').setValue('test');
        expect(wrapper.emitted('update:value')![0]).toEqual(['test']);
        expect(wrapper.find('textarea').element.value).toBe('test');

        expect(wrapper.find('p').exists()).toBe(false);
        await wrapper.setProps({ error: 'Error Message' });
        expect(wrapper.find('p').text()).toBe('Error Message');
        await wrapper.setProps({ error: '' });
        expect(wrapper.find('p').exists()).toBe(false);
    });
});
