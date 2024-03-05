import { mount } from '@vue/test-utils';
import MobileSearchFilter from './MobileSearchFilter.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import router from '@/router';
import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue';
import type { FilterType } from '../utils/types';
import { createTestingPinia } from '@pinia/testing';

const testFilters = [
    {
        id: '1',
        name: 'Year',
        options: [
            { value: '2024', label: '2024', checked: false },
            { value: '2020', label: '2020', checked: false },
        ],
        filterFunc: vi.fn(),
    },
    {
        id: '2',
        name: 'Organism',
        options: [
            { value: 'HomoSapiens', label: 'Homo sapiens', checked: false },
            { value: 'MusMusculus', label: 'Mus musculus', checked: false },
        ],
        filterFunc: vi.fn(),
    },
];

const mountMobileSearchFilter = (props: { filters: FilterType[]; isOpen: boolean }) => {
    const pinia = createTestingPinia({ createSpy: vi.fn() })
    return mount(MobileSearchFilter, {
        attachTo: document.body,
        props: props,
        global: {
            plugins: [pinia, router],
            provide: {isDev: true}
        },
    });
};

describe('MobileSearchFilter.vue', () => {
    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'headlessui-portal-root';
        document.body.appendChild(el);
    });

    afterEach(() => {
        if (document.body) document.body.innerHTML = '';
    });

    it('should render', async () => {
        const wrapper = mountMobileSearchFilter({ filters: testFilters, isOpen: true });
        await wrapper.vm.$nextTick();

        const transitionRoot = wrapper.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        expect(dialogPanel.isVisible()).toBe(true);
        expect(dialogPanel.find('h2').text()).toBe('Filters');
        expect(dialogPanel.find('button').text()).toBe('Close menu');
    });

    it('should emit when close menu button is triggered', async () => {
        const wrapper = mountMobileSearchFilter({ filters: testFilters, isOpen: true });
        await wrapper.vm.$nextTick();

        const transitionRoot = wrapper.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        const button = dialogPanel.find('button');
        expect(wrapper.emitted('filter-close')).not.toBeTruthy();
        await button.trigger('click');
        expect(wrapper.emitted('filter-close')).toBeTruthy();
    });

    it('should have filter button working correctly', async () => {
        const wrapper = mountMobileSearchFilter({ filters: testFilters, isOpen: true });
        await wrapper.vm.$nextTick();

        const transitionRoot = wrapper.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        const buttons = dialogPanel.findAll('button');
        let checkBoxes = dialogPanel.findAll('input');
        expect(buttons.length).toBe(3);
        expect(checkBoxes.length).toBe(0);
        await buttons[1].trigger('click');
        await buttons[2].trigger('click');
        checkBoxes = dialogPanel.findAll('input');
        expect(checkBoxes.length).toBe(4);
        await buttons[1].trigger('click');
        await buttons[2].trigger('click');
        checkBoxes = dialogPanel.findAll('input');
        expect(checkBoxes.length).toBe(0);
    });

    it('should display filter text correctly', async () => {
        const wrapper = mountMobileSearchFilter({ filters: testFilters, isOpen: true });
        await wrapper.vm.$nextTick();

        const transitionRoot = wrapper.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        const buttons = dialogPanel.findAll('button');
        await buttons[1].trigger('click');
        await buttons[2].trigger('click');
        const checkBoxes = dialogPanel.findAll('input');

        const dialogPanelText = dialogPanel.text();
        expect(dialogPanelText).toContain('Year');
        expect(dialogPanelText).toContain('2024');
        expect(dialogPanelText).toContain('2020');
        expect(dialogPanelText).toContain('Organism');
        expect(dialogPanelText).toContain('Homo sapiens');
        expect(dialogPanelText).toContain('Mus musculus');
    });
});
