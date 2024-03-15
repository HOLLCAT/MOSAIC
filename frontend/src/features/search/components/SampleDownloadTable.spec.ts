import { mount } from '@vue/test-utils';
import SampleDownloadTable from './SampleDownloadTable.vue';
import { expect, it, describe } from 'vitest';
import type { StudyType } from '@/utils/types';

const data: StudyType = {
    accession_id: 'MOSAIC-0003',
    created_date: '18 January 2024',
    title: 'Sample Study',
    description: 'Description of the sample study',
    authors: ['Author 1', 'Author 2'],
    samples: [
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
        },
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
        },
    ],
};

describe('SampleDownloadTable.vue', () => {
    it('should render', () => {
        const wrapper = mount(SampleDownloadTable, {
            props: { samplesAsStudies: [data] },
        });
        expect(wrapper.exists()).toBe(true);
    });

    it('should render correct headings', () => {
        const wrapper = mount(SampleDownloadTable, {
            props: { samplesAsStudies: [data] },
        });
        const headings = wrapper.findAll('th');
        expect(headings[0].text()).toBe('Study_ID');
        expect(headings[1].text()).toBe('Sample_ID');
        expect(headings[2].text()).toBe('Organism');
        expect(headings[3].text()).toBe('Tissue');
        expect(headings[4].text()).toBe('fastq.gz');
    });

    it('should render correct table data', () => {
        const wrapper = mount(SampleDownloadTable, {
            props: { samplesAsStudies: [data] },
        });
        const tableData = wrapper.findAll('td');
        expect(tableData[0].text()).toBe('Project_1');
        expect(tableData[1].text()).toBe('TxtSample_1');
        expect(tableData[2].text()).toBe('Homo sapiens');
        expect(tableData[3].text()).toBe('Liver');
        expect(tableData[4].html()).toContain('button');
    });
});
