import { mount } from '@vue/test-utils';
import SearchResultsItem from './SearchResultsItem.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';

const renderSearchResultsItem = () =>
    mount(SearchResultsItem, {
        props: {
            searchResults: [
                {
                    accession_id: '123',
                    created_date: '2022-04-21',
                    title: 'Sample Title',
                    description: 'Sample description',
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
            ],
        },
        global: {
            plugins: [router],
        },
    });

let router: Router;
describe('SearchResultsItem.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderSearchResultsItem();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render study links correctly', () => {
        const wrapper = renderSearchResultsItem();
        expect(wrapper.find('a[href="/study/123"]').exists()).toBe(true);
        expect(wrapper.find('a[href="/study/124"]').exists()).toBe(true);
    });

    it('should render text correctly', () => {
        const wrapper = renderSearchResultsItem();

        const listItems = wrapper.findAll('li');
        expect(listItems[0].text()).toContain('123');
        expect(listItems[0].text()).toContain('21-4-2022');
        expect(listItems[0].text()).toContain('Sample Title');
        expect(listItems[0].text()).toContain('Sample description');
        expect(listItems[0].text()).not.toContain('...');

        expect(listItems[1].text()).toContain('124');
        expect(listItems[1].text()).toContain('5-11-2021');
        expect(listItems[1].text()).toContain('Sample Title 2');
        expect(listItems[1].text()).toContain('VeryLong...');
        expect(wrapper.findAll('h4')[1].text().length).toBe(143);
    });
});
