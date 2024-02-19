import { mount } from '@vue/test-utils';
import SamplesTable from './SamplesTable.vue';
import { describe, it, expect } from 'vitest';
import { createStore } from 'vuex';
import type { Samples } from '@/features/upload/utils/types';

const data = {
    study: {
        accession_id: 'MOSAIC-0003',
        created_date: '18 January 2024',
        title: 'Sample Study',
        description: 'Description of the sample study',
        authors: ['Author 1', 'Author 2'],
        samples: [
            {
                Sample: "VR_1",
                Sample_ID: 'TxtSample_1',
                SampleGroup: 'Group_1',
                Description: 'Human Sample',
                Organism: 'Homo sapiens',
                Tissue: 'Liver',
                Sex: 'Female',
                Cell_Line: 'HeLa',
                Mouse_Model: 'N/A',
                Biomaterial_Provider: 'Provider A',
                Date_Sample_Prep: '2024-01-10',
                Biological_Repeat: '1',
                file: 'fastq_1',
            },
            {
                Sample: "VR_2",
                Sample_ID: 'TxtSample_2',
                SampleGroup: 'Group_2',
                Description: 'Human Sample',
                Organism: 'Homo sapiens',
                Tissue: 'Brain',
                Sex: 'Male',
                Cell_Line: 'HeLa',
                Mouse_Model: 'N/A',
                Biomaterial_Provider: 'Provider B',
                Date_Sample_Prep: '2020-04-16',
                Biological_Repeat: '1',
                file: 'fastq_2',
            },
        ],
    },
};

const mockStore = createStore({
    modules: {
        study: {
            namespaced: true,
            state() {
                return {
                    samples: data.study.samples
                };
            },
            getters: {
                getSamplesColumns: (state) => state.columns,
                getSamples: (state) => {
                    return state.samples.map((sample: Samples) => {
                        const { file, ...rest } = sample;
                        return rest;
                    });
                },
            },
        },
    },
});

const renderSamplesTable = () =>
    mount(SamplesTable, {
        global: {
            plugins: [mockStore],
        },
    });

describe('SamplesTable.vue', () => {
    it('should render', () => {
        const wrapper = renderSamplesTable();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render sample data correctly', () => {
        const wrapper = renderSamplesTable();

        const samples = mockStore.getters['study/getSamples'] as Samples[];
        const columns = Object.keys(samples[0]).concat(['Fastq.gz']);

        const tableRows = wrapper.findAll('tr');
        expect(tableRows.length).toBe(3);

        const tableHeaderElements = wrapper.findAll('th');
        const tableHeadersText = tableHeaderElements.map((header) => header.text());
        expect(tableHeadersText).toEqual(columns);

        const tableData = wrapper.findAll('tr.border-b.bg-gray-800.border-gray-700');
        const tableDataText = tableData.map((data) => Array.from(data.element.childNodes).map(child => child.textContent).filter(text => text !== '') );
        
        expect(tableDataText).toEqual(samples.map(sample => Object.values(sample)));
        
    });

    it('should have the table button working correctly', async () => {
        const wrapper = renderSamplesTable();

        expect(wrapper.find('table').exists()).toBe(true);
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('table').exists()).toBe(false);
        await wrapper.find('button').trigger('click');
        expect(wrapper.find('table').exists()).toBe(true);
    });
});
