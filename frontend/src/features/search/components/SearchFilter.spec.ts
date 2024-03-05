import { mount } from '@vue/test-utils';
import SearchFilter from './SearchFilter.vue';
import { describe, it, expect, vi } from 'vitest';
import { DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { createTestingPinia } from '@pinia/testing';

const renderSearchFilter = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    return mount(SearchFilter, {
        props: {
            filters: [
                {
                    id: '1',
                    name: 'Filter 1',
                    options: [
                        { value: 'option1', label: 'Option 1', checked: false },
                        { value: 'option2', label: 'Option 2', checked: false },
                    ],
                    filterFunc: vi.fn(),
                },
                {
                    id: '2',
                    name: 'Filter 2',
                    options: [
                        { value: 1, label: 'Choice 1', checked: false },
                        { value: 2, label: 'Choice 2', checked: false },
                    ],
                    filterFunc: vi.fn(),
                },
            ],
            isOpen: true,
        },
        global: {
            plugins: [pinia],
            provide: { isDev: true },
        },
    });
}

describe('SearchFilter.vue', () => {
    it('should render', () => {
        const wrapper = renderSearchFilter();
        expect(wrapper.exists()).toBe(true);
    });

    it('should have disclosureButton rendering and functioning correctly', async () => {
        const wrapper = renderSearchFilter();

        const disclosureButtons = wrapper.findAllComponents(DisclosureButton);
        expect(disclosureButtons[0].exists()).toBe(true);
        expect(disclosureButtons[1].exists()).toBe(true);

        const disclosurePanels = wrapper.findAllComponents(DisclosurePanel);
        expect(disclosurePanels[0].isVisible()).toBe(false);
        expect(disclosurePanels[1].isVisible()).toBe(false);

        await disclosureButtons[0].trigger('click');

        expect(disclosurePanels[0].isVisible()).toBe(true);
        expect(disclosurePanels[1].isVisible()).toBe(false);

        await disclosureButtons[1].trigger('click');

        expect(disclosurePanels[0].isVisible()).toBe(true);
        expect(disclosurePanels[1].isVisible()).toBe(true);

        await disclosureButtons[0].trigger('click');

        expect(disclosurePanels[0].isVisible()).toBe(false);
        expect(disclosurePanels[1].isVisible()).toBe(true);

        await disclosureButtons[1].trigger('click');

        expect(disclosurePanels[0].isVisible()).toBe(false);
        expect(disclosurePanels[1].isVisible()).toBe(false);
    });

    it('should render text correctly', async () => {
        const wrapper = renderSearchFilter();

        expect(wrapper.findAll('h3')[0].text()).toContain('Filter 1');
        expect(wrapper.findAll('h3')[1].text()).toContain('Filter 2');
        expect(wrapper.findAll('label').length).toBe(0);

        await wrapper.findAllComponents(DisclosureButton)[0].trigger('click');
        await wrapper.findAllComponents(DisclosureButton)[1].trigger('click');

        expect(wrapper.findAll('label').length).toBe(4);
        expect(wrapper.findAll('label')[0].text()).toContain('Option 1');
        expect(wrapper.findAll('label')[1].text()).toContain('Option 2');
        expect(wrapper.findAll('label')[2].text()).toContain('Choice 1');
        expect(wrapper.findAll('label')[3].text()).toContain('Choice 2');

        await wrapper.findAllComponents(DisclosureButton)[0].trigger('click');
        expect(wrapper.findAll('label').length).toBe(2);
        expect(wrapper.findAll('label')[0].text()).toContain('Choice 1');
        expect(wrapper.findAll('label')[1].text()).toContain('Choice 2');
    });
});
