import { mount } from '@vue/test-utils';
import SampleCard from './SampleCard.vue';
import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';

const mockStore = createStore({
    modules: {
        study: {
            namespaced: true,
            state() {
                return {
                    study: {
                        accession_id: 'MOSAIC-0003',
                        created_date: '18 January 2024',
                        title: 'Sample Study',
                        description: 'Description of the sample study',
                        authors: ['Author 1', 'Author 2'],
                        samples: [],
                    },
                };
            },
            getters: {
                getStudy: (state) => state.study,
            },
        },
    },
});

const renderSampleCard = () =>
    mount(SampleCard, {
        global: {
            plugins: [mockStore],
        },
    });

describe('SampleCard.vue', () => {
    it('should render', () => {
        const wrapper = renderSampleCard();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render sample count correctly', () => {
        const wrapper = renderSampleCard();
        expect(wrapper.find('h2').text()).toBe('Samples');
        expect(wrapper.find('h4').text()).toContain('Sample count: 0');
    });
});
