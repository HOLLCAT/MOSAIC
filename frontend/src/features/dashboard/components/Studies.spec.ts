import { mount } from '@vue/test-utils';
import Studies from './Studies.vue';
import { expect, describe, it, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory, type Router } from 'vue-router';
import { routes } from '@/router';

const renderStudies = () => {
    return mount(Studies, {
        props: {
            searchResults: [
                {
                    accession_id: 'MOSAIC-0003',
                    created_date: '18 January 2024',
                    title: 'Sample Study',
                    owner_id: 'owner',
                    description: 'Description of the sample study',
                    authors: ['Author 1', 'Author 2'],
                    samples: [
                        // @ts-ignore
                        {
                            Sample: 'VR_1',
                            Sample_ID: 'TxtSample_1',
                            SampleGroup: 'Group_1',
                            Sample_Project: 'Project_1',
                            Description: 'Human Sample',
                            Organism: 'Homo sapiens',
                            Tissue: 'Liver',
                            Sex: 'Female',
                            Cell_Line: 'HeLa',
                            Mouse_Model: 'N/A',
                            Biomaterial_Provider: 'Provider A',
                            Date_Sample_Prep: '2024-01-10',
                            Biological_Repeat: '1',
                            File: false,
                        }, // @ts-ignore
                        {
                            Sample: 'VR_2',
                            Sample_ID: 'TxtSample_2',
                            SampleGroup: 'Group_2',
                            Sample_Project: 'Project_1',
                            Description: 'Human Sample',
                            Organism: 'Homo sapiens',
                            Tissue: 'Brain',
                            Sex: 'Male',
                            Cell_Line: 'HeLa',
                            Mouse_Model: 'N/A',
                            Biomaterial_Provider: 'Provider B',
                            Date_Sample_Prep: '2020-04-16',
                            Biological_Repeat: '1',
                            File: true,
                        },
                    ],
                    pending: false,
                },
                {
                    accession_id: 'MOSAIC-0004',
                    created_date: '18 January 2024',
                    title: 'Sample Study',
                    owner_id: 'owner',
                    description: 'Description of the sample study',
                    authors: ['Author 1', 'Author 2'],
                    samples: [
                        // @ts-ignore
                        {
                            Sample: 'VR_1',
                            Sample_ID: 'TxtSample_1',
                            SampleGroup: 'Group_1',
                            Sample_Project: 'Project_1',
                            Description: 'Human Sample',
                            Organism: 'Homo sapiens',
                            Tissue: 'Liver',
                            Sex: 'Female',
                            Cell_Line: 'HeLa',
                            Mouse_Model: 'N/A',
                            Biomaterial_Provider: 'Provider A',
                            Date_Sample_Prep: '2024-01-10',
                            Biological_Repeat: '1',
                            File: false,
                        }, // @ts-ignore
                        {
                            Sample: 'VR_2',
                            Sample_ID: 'TxtSample_2',
                            SampleGroup: 'Group_2',
                            Sample_Project: 'Project_1',
                            Description: 'Human Sample',
                            Organism: 'Homo sapiens',
                            Tissue: 'Brain',
                            Sex: 'Male',
                            Cell_Line: 'HeLa',
                            Mouse_Model: 'N/A',
                            Biomaterial_Provider: 'Provider B',
                            Date_Sample_Prep: '2020-04-16',
                            Biological_Repeat: '1',
                            File: true,
                        },
                    ],
                    pending: false,
                },
            ],
        },
        global: {
            plugins: [router, createPinia()],
        },
    });
};

let router: Router;
describe('Studies.vue', () => {
    beforeEach(() => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        });
    });

    it('should render', () => {
        const wrapper = renderStudies();
        expect(wrapper.exists()).toBe(true);
    });

    it('should display the correct studies', () => {
        const wrapper = renderStudies();
        expect(wrapper.findAll('li').length).toBe(2);
        expect(wrapper.text()).toContain('Sample Study');
        expect(wrapper.text()).toContain('Description of the sample study');
    });
});
