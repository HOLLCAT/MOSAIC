import { mount } from '@vue/test-utils';
import PendingStudiesTab from './PendingStudiesTab.vue';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useDashboardStore } from '@/stores/dashboardStore';
import { ref } from 'vue';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { routes } from '@/router';

const renderPendingStudiesTab = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    const dashboardStore = useDashboardStore(pinia);
    dashboardStore.getPendingStudies = vi.fn();
    // @ts-ignore
    dashboardStore.pendingStudies = ref([
        {
            accession_id: '123',
            created_date: '2022-04-21',
            title: 'Sample Title 1',
            description: 'Sample description 1',
            authors: ['Author 1', 'Author 2'],
            samples: [],
        },
        {
            accession_id: '124',
            created_date: '2021-11-05',
            title: 'Sample Title 2',
            description:
                'VeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDescVeryLongDesc',
            authors: ['Author 3', 'Author 4'],
            samples: [],
        },
    ]);

    return mount(PendingStudiesTab, {
        global: {
            plugins: [pinia, router],
            provide: { isDev: true },
        },
    });
};

let router: Router;
describe('PendingStudiesTab.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderPendingStudiesTab();
        expect(wrapper.exists()).toBe(true);
    });

    it('displays study count and search bar', () => {
        const wrapper = renderPendingStudiesTab();

        expect(wrapper.find('form')).toBeTruthy();
        expect(wrapper.text()).toContain('Pending Studies(2)');
    });

    it('displays correct study information', () => {
        const wrapper = renderPendingStudiesTab();

        expect(wrapper.text()).toContain('Sample Title 1');
        expect(wrapper.text()).toContain('Sample description 1');
        expect(wrapper.text()).toContain('Sample Title 2');
        expect(wrapper.text()).toContain('VeryLong...');
    });

    it('displays edit button for each study', () => {
        const wrapper = renderPendingStudiesTab();

        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(5);
        expect(buttons[2].text()).toContain('Edit');
        expect(buttons[4].text()).toContain('Edit');
    });
});
