import { mount } from '@vue/test-utils';
import Samples from './Samples.vue';
import { routes } from '@/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { useUploadStudyStore } from '@/stores/uploadStudyStore';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';

const studyDetails = {
    content: {
        title: 'Example Study Title',
        description: 'This is a detailed description of the study.',
        authors: ['Author One', 'Author Two'],
        metadata_type: 'Example Metadata Type',
        metadata: new File([''], 'filename'),
    },
    error: '',
};
const samples = {
    content: [
        {
            Sample: 'Sample 1',
            Sample_ID: 'ID_1',
            SampleGroup: 'Group 1',
            Sample_Project: 'Project 1',
            Description: 'This is a sample description.',
            Organism: 'Human',
            Tissue: 'Heart',
            Sex: 'Female',
            Cell_Line: 'N/A',
            Mouse_Model: 'N/A',
            Biomaterial_Provider: 'Provider 1',
            Date_Sample_Prep: '2024-03-01',
            Biological_Repeat: '1',
        },
        {
            Sample: 'Sample 2',
            Sample_ID: 'ID_2',
            SampleGroup: 'Group 2',
            Sample_Project: 'Project 1',
            Description: 'This is a sample description.',
            Organism: 'Mouse',
            Tissue: 'Liver',
            Sex: 'Male',
            Cell_Line: 'N/A',
            Mouse_Model: 'N/A',
            Biomaterial_Provider: 'Provider 2',
            Date_Sample_Prep: '2024-03-01',
            Biological_Repeat: '1',
        },
    ],
    loading: false,
    error: '',
};

const renderSamples = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    const uploadStore = useUploadStudyStore(pinia);
    uploadStore.uploadMetadata = vi.fn();

    return mount(Samples, {
        global: {
            plugins: [
                createRouter({
                    history: createWebHistory(),
                    routes,
                }),
                pinia,
            ],
            provide: { isDev: true },
        },
    });
};

let router;
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

    it('should render metadata text correctly', async () => {
        const wrapper = renderSamples();
        const uploadStore = useUploadStudyStore();
        uploadStore.studyDetails = studyDetails;
        uploadStore.samples = samples;

        await nextTick();

        const thead = wrapper.find('thead');
        const inputFields = wrapper.findAll('input');

        expect(thead.text()).toContain('Sample');
        expect(thead.text()).toContain('Sample_ID');
        expect(thead.text()).toContain('SampleGroup');
        expect(thead.text()).toContain('Sample_Project');
        expect(thead.text()).toContain('Description');
        expect(thead.text()).toContain('Organism');
        expect(thead.text()).toContain('Tissue');
        expect(thead.text()).toContain('Sex');
        expect(thead.text()).toContain('Cell_Line');
        expect(thead.text()).toContain('Mouse_Model');
        expect(thead.text()).toContain('Biomaterial_Provider');
        expect(thead.text()).toContain('Date_Sample_Prep');
        expect(thead.text()).toContain('Biological_Repeat');

        expect(inputFields.length).toBe(26);

        expect(inputFields[0].element.value).toBe('Sample 1');
        expect(inputFields[1].element.value).toBe('ID_1');
        expect(inputFields[2].element.value).toBe('Group 1');
        expect(inputFields[3].element.value).toBe('Project 1');
        expect(inputFields[4].element.value).toBe('This is a sample description.');
        expect(inputFields[5].element.value).toBe('Human');
        expect(inputFields[6].element.value).toBe('Heart');
        expect(inputFields[7].element.value).toBe('Female');
        expect(inputFields[8].element.value).toBe('N/A');
        expect(inputFields[9].element.value).toBe('N/A');
        expect(inputFields[10].element.value).toBe('Provider 1');
        expect(inputFields[11].element.value).toBe('2024-03-01');
        expect(inputFields[12].element.value).toBe('1');

        expect(inputFields[13].element.value).toBe('Sample 2');
        expect(inputFields[14].element.value).toBe('ID_2');
        expect(inputFields[15].element.value).toBe('Group 2');
        expect(inputFields[16].element.value).toBe('Project 1');
        expect(inputFields[17].element.value).toBe('This is a sample description.');
        expect(inputFields[18].element.value).toBe('Mouse');
        expect(inputFields[19].element.value).toBe('Liver');
        expect(inputFields[20].element.value).toBe('Male');
        expect(inputFields[21].element.value).toBe('N/A');
        expect(inputFields[22].element.value).toBe('N/A');
        expect(inputFields[23].element.value).toBe('Provider 2');
        expect(inputFields[24].element.value).toBe('2024-03-01');
        expect(inputFields[25].element.value).toBe('1');
    });
});
