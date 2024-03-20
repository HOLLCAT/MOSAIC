import { mount } from '@vue/test-utils';
import EditStudy from './EditStudy.vue';
import { expect, describe, it, vi } from 'vitest';
import UploadButton from '@/components/Buttons/UploadButton.vue';
import { createPinia } from 'pinia';

vi.mock('@/stores/dashboardStore', () => ({
    useDashboardStore: vi.fn(() => ({
        uploadFile: vi.fn().mockResolvedValue(true),
    })),
}));

const renderEditStudy = () => {
    return mount(EditStudy, {
        props: {
            study: {
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
                        File: false,
                    },
                ],
                pending: true,
                isPublished: false,
                isOwner: true,
                audit: null,
            },
            editable: true,
        },
        global: {
            plugins: [createPinia()],
            provide: { isDev: true },
        },
    });
};

describe('EditStudy.vue', () => {
    it('should render', () => {
        const wrapper = renderEditStudy();
        expect(wrapper.exists()).toBe(true);
    });

    it('should display the correct columns', () => {
        const wrapper = renderEditStudy();
        const headers = wrapper.findAll('th');
        expect(headers.length).toBe(15);
        expect(wrapper.text()).toContain('fastq.gz');
    });

    it('should accept correct file upload', async () => {
        const wrapper = renderEditStudy();
        expect(wrapper.findComponent(UploadButton).exists()).toBe(true);
        await wrapper.findComponent(UploadButton).vm.$emit('fileUploaded', new File([], 'test.fastq.gz'));
        expect(wrapper.emitted()['showToast']).not.toBeTruthy();
    });

    it('should emit error for incorrect file upload', async () => {
        const wrapper = renderEditStudy();
        expect(wrapper.findComponent(UploadButton).exists()).toBe(true);
        await wrapper.findComponent(UploadButton).vm.$emit('fileUploaded', new File([], 'test.fastq.txt'));
        // @ts-ignore
        expect(wrapper.emitted()['showToast'][0][0]).toBe('File must be a .fastq.gz file');
    });
});
