import { mount } from '@vue/test-utils';
import SamplesTable from './SamplesTable.vue';
import { describe, it, expect, vi } from 'vitest';
import { createStore } from 'vuex';

const data = {
    study: {
        accession_id: 'MOSAIC-0003',
        created_date: '18 January 2024',
        title: 'Sample Study',
        description: 'Description of the sample study',
        authors: ['Author 1', 'Author 2'],
        samples: [
            {
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
                fastq: 'fastq_1',
            },
            {
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
                fastq: 'fastq_2',
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
                    columns: Object.keys(data.study.samples[0]),
                    rows: data.study?.samples.map((sample) => {
                        return Object.values(sample);
                    }),
                };
            },
            getters: {
                getSamplesColumns: (state) => state.columns,
                getSamplesRows: (state) => state.rows,
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
        // @ts-ignore
        const columns = mockStore.state.study.columns;
        // @ts-ignore
        const rows = mockStore.state.study.rows;

        const tableRows = wrapper.findAll('tr');
        expect(tableRows.length).toBe(3);

        const tableHeaders = wrapper.findAll('th');
        const tableData = wrapper.findAll('td');

        tableHeaders.forEach((header, i) => {
            expect(header.text()).toBe(wrapper.vm.formatColumnName(columns[i]));
        });

        tableData.forEach((data, i) => {
            if (i < 12) {
                expect(data.text()).toBe(rows[0][i]);
            } else {
                expect(data.text()).toBe(rows[1][i - 12]);
            }
        });
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
