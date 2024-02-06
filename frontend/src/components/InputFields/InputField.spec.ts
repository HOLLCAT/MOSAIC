import { mount } from '@vue/test-utils';
import InputField from './Inputfield.vue';
import { describe, expect, it } from 'vitest';

describe('InputField.vue', () => {
    it('should render', () => {
        const wrapper = mount(InputField);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render correctly with props and handles changes', async () => {
        const props = {
            label: 'Username',
            inputId: 'username',
            type: 'text',
            placeholder: 'Enter your username',
            value: '',
            error: '',
        };

        const wrapper = mount(InputField, {
            props,
        });

        expect(wrapper.find('label').text()).toBe(props.label);
        expect(wrapper.find('input').attributes('id')).toBe(props.inputId);
        expect(wrapper.find('input').attributes('type')).toBe(props.type);
        expect(wrapper.find('input').attributes('placeholder')).toBe(props.placeholder);

        expect(wrapper.find('input').element.value).toBe(props.value);
        await wrapper.find('input').setValue('test');
        expect(wrapper.emitted('update:value')![0]).toEqual(['test']);
        expect(wrapper.find('input').element.value).toBe('test');

        expect(wrapper.find('p').exists()).toBe(false);
        await wrapper.setProps({ error: 'Error Message' });
        expect(wrapper.find('p').text()).toBe('Error Message');
        await wrapper.setProps({ error: '' });
        expect(wrapper.find('p').exists()).toBe(false);
    });
});
