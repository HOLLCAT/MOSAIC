import { mount } from '@vue/test-utils';
import SampleCard from './SampleCard.vue';
import { describe, it, expect } from 'vitest';
import { createPinia } from 'pinia';
import { useStudyStore } from '@/stores/studyStore';

const renderSampleCard = () => {
    const pinia = createPinia();
    const studyStore = useStudyStore(pinia);
    studyStore.$state = {
        study: {
            accession_id: 'MOSAIC-0003',
            created_date: '18 January 2024',
            title: 'Sample Study',
            description: 'Description of the sample study',
            authors: ['Author 1', 'Author 2'],
            samples: [],
        },
    };

    return mount(SampleCard, {
        global: {
            plugins: [pinia],
        },
    });
};

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
