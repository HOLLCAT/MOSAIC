import { mount } from '@vue/test-utils';
import Samples from './Samples.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { createStore } from 'vuex';
import actions from '../store/actions';

const mockStore = createStore({
    modules: {
        upload: {
            namespaced: true,
            getters: {
                getStudySamples: () => ({
                    loading: false,
                    content: [
                        { SampleGroup: 'Group_1', Description: 'Human Sample', fastq: 'fastq_1' },
                        { SampleGroup: 'Group_2', Description: 'Mouse Sample', fastq: 'fastq_2' },
                        { SampleGroup: 'Group_3', Description: 'Mouse Sample', fastq: 'fastq_3' },
                    ],
                }),
                getStudyMetadata: () => ({
                    file_type: 'mocked_file_type',
                    metadata: {},
                }),
            },
            actions: actions,
        },
    },
});

const renderSamples = () =>
    mount(Samples, {
        global: {
            plugins: [router, mockStore],
        },
    });

let router: Router;
describe('Samples.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderSamples();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render metadata text correctly', () => {
        const wrapper = renderSamples();
        const thead = wrapper.find('thead');
        const inputFields = wrapper.findAll('input');
        
        expect(thead.text()).toContain('SampleGroup');
        expect(thead.text()).toContain('Description');
        expect(thead.text()).toContain('fastq');

        expect(inputFields.length).toBe(9);

        expect(inputFields[0].element.value).toBe('Group_1');
        expect(inputFields[1].element.value).toBe('Human Sample');
        expect(inputFields[2].element.value).toBe('fastq_1');

        expect(inputFields[3].element.value).toBe('Group_2');
        expect(inputFields[4].element.value).toBe('Mouse Sample');
        expect(inputFields[5].element.value).toBe('fastq_2');
        
        expect(inputFields[6].element.value).toBe('Group_3');
        expect(inputFields[7].element.value).toBe('Mouse Sample');
        expect(inputFields[8].element.value).toBe('fastq_3');
    });
});
