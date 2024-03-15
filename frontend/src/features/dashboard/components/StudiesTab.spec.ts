import { mount } from '@vue/test-utils';
import StudiesTab from './StudiesTab.vue';
import { expect, describe, it, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useDashboardStore } from '@/stores/dashboardStore';
import { ref } from 'vue';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { routes } from '@/router';

const renderStudiesTab = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    const dashboardStore = useDashboardStore(pinia);
    dashboardStore.getStudies = vi.fn();
    // @ts-ignore
    dashboardStore.studies = ref([
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

    return mount(StudiesTab, {
        global: {
            plugins: [pinia, router],
            provide: { isDev: true },
        },
    });
};

let router: Router;
describe('StudiesTab.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderStudiesTab();
        expect(wrapper.exists()).toBe(true);
    });

    it('displays study count and search bar', () => {
        const wrapper = renderStudiesTab();

        expect(wrapper.find('form')).toBeTruthy();
        expect(wrapper.text()).toContain('Published Studies(2)');
    });

    it('displays correct study information', () => {
        const wrapper = renderStudiesTab();

        expect(wrapper.text()).toContain('Sample Title 1');
        expect(wrapper.text()).toContain('Sample description 1');
        expect(wrapper.text()).toContain('Sample Title 2');
        expect(wrapper.text()).toContain('VeryLong...');
    });
});
