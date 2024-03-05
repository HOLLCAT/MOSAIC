import { mount } from '@vue/test-utils';
import StudyDetails from './StudyDetails.vue';
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useUploadStudyStore } from '@/stores/uploadStudyStore';
import router from '@/router';

const renderStudyDetails = () => {
    const pinia = createTestingPinia({ createSpy: vi.fn() });
    const uploadStore = useUploadStudyStore(pinia);
    uploadStore.setStudyDetails = vi.fn();
    return mount(StudyDetails, {
        global: {
            plugins: [pinia, router],
            provide: { isDev: true },
        },
    });
};

describe('StudyDetails.vue', () => {
    it('should render StudyDetails', () => {
        const wrapper = renderStudyDetails();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render text correctly', () => {
        const wrapper = renderStudyDetails();
        const form = wrapper.find('form');

        expect(form.text()).toContain('Study Title');
        expect(form.text()).toContain('Study Description');
        expect(form.text()).toContain('Author 1');
        expect(form.text()).toContain('Upload Metadata');

        const buttons = wrapper.findAll('button');
        expect(buttons[buttons.length - 1].text()).toBe('Next');
    });

    it('should submit correctly when button pressed', async () => {
        const wrapper = renderStudyDetails();
        const form = wrapper.find('form');

        const push = vi.spyOn(wrapper.vm, 'submitForm');
        expect(push).not.toHaveBeenCalled();
        await form.trigger('submit');
        expect(push).toHaveBeenCalled();
    });

    it('should add author correctly when button pressed', async () => {
        const wrapper = renderStudyDetails();
        const form = wrapper.find('form');
        const buttons = wrapper.findAll('button');

        expect(form.text()).toContain('Author 1');
        expect(form.text()).not.toContain('Author 2');

        await buttons[0].trigger('click');

        expect(form.text()).toContain('Author 1');
        expect(form.text()).toContain('Author 2');
        expect(form.text()).not.toContain('Author 3');

        await buttons[0].trigger('click');
        await buttons[0].trigger('click');

        expect(form.text()).toContain('Author 1');
        expect(form.text()).toContain('Author 2');
        expect(form.text()).toContain('Author 3');
        expect(form.text()).toContain('Author 4');
        expect(form.text()).not.toContain('Author 5');
    });

    it('should remove author correctly when button pressed', async () => {
        const wrapper = renderStudyDetails();
        const form = wrapper.find('form');
        let buttons = wrapper.findAll('button');

        expect(form.text()).toContain('Author 1');
        expect(form.text()).not.toContain('Author 2');

        await buttons[0].trigger('click');
        await buttons[0].trigger('click');
        await buttons[0].trigger('click');

        expect(form.text()).toContain('Author 1');
        expect(form.text()).toContain('Author 2');
        expect(form.text()).toContain('Author 3');
        expect(form.text()).toContain('Author 4');
        expect(form.text()).not.toContain('Author 5');

        buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(6);
        await buttons[1].trigger('click');
        buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(5);

        expect(form.text()).toContain('Author 1');
        expect(form.text()).toContain('Author 2');
        expect(form.text()).toContain('Author 3');
        expect(form.text()).not.toContain('Author 4');
        expect(form.text()).not.toContain('Author 5');

        await buttons[1].trigger('click');
        await buttons[1].trigger('click');

        expect(form.text()).toContain('Author 1');
        expect(form.text()).not.toContain('Author 2');
    });

    it('should submit form when provided with correct values', async () => {
        const wrapper = renderStudyDetails();

        const form = wrapper.find('form');
        const textAreas = form.findAll('textarea');
        const authorInputs = form.findAll('input');
        expect(form.findAll('p').length).toBe(0);
        await textAreas[0].setValue('Study Title');
        await textAreas[1].setValue('Study Description');
        await authorInputs[0].setValue('Author 1');

        const inputFile = wrapper.find<HTMLInputElement>('input[type="file"]');

        const fileMock = new File(['(file content)'], 'sample.txt', {
            type: 'text/plain',
        });

        expect(inputFile.exists()).toBe(true);

        Object.defineProperty(inputFile.element, 'files', {
            value: [fileMock],
            writable: false,
        });

        await inputFile.trigger('change');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(0);
    });

    it('should submit form when provided with correct .json file', async () => {
        const wrapper = renderStudyDetails();

        const form = wrapper.find('form');
        expect(form.findAll('p').length).toBe(0);

        const inputFile = wrapper.find<HTMLInputElement>('input[type="file"]');

        const fileMock = new File(['(file content)'], 'sample.json', {
            type: 'application/json',
        });

        expect(inputFile.exists()).toBe(true);

        Object.defineProperty(inputFile.element, 'files', {
            value: [fileMock],
            writable: false,
        });
        await inputFile.trigger('change');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(3);
        expect(form.text()).not.toContain('Please upload a valid metadata file, e.g. .json, .txt, .csv');
    });

    it('should submit form when provided with correct .csv file', async () => {
        const wrapper = renderStudyDetails();

        const form = wrapper.find('form');
        expect(form.findAll('p').length).toBe(0);

        const inputFile = wrapper.find<HTMLInputElement>('input[type="file"]');

        const fileMock = new File(['(file content)'], 'sample.csv', {
            type: 'text/csv',
        });

        expect(inputFile.exists()).toBe(true);

        Object.defineProperty(inputFile.element, 'files', {
            value: [fileMock],
            writable: false,
        });

        await inputFile.trigger('change');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(3);
        expect(form.text()).not.toContain('Please upload a valid metadata file, e.g. .json, .txt, .csv');
    });

    it('should not submit form when provided with incorrect values', async () => {
        const wrapper = renderStudyDetails();

        const form = wrapper.find('form');
        const textAreas = form.findAll('textarea');
        const authorInputs = form.findAll('input');
        expect(form.findAll('p').length).toBe(0);
        await textAreas[0].setValue('');
        await textAreas[1].setValue('');
        await authorInputs[0].setValue('ab');

        const inputFile = wrapper.find<HTMLInputElement>('input[type="file"]');

        const fileMock = new File(['(file content)'], 'sample.gif', {
            type: 'image/gif',
        });

        expect(inputFile.exists()).toBe(true);

        Object.defineProperty(inputFile.element, 'files', {
            value: [fileMock],
            writable: false,
        });

        await inputFile.trigger('change');

        await form.trigger('submit');

        expect(form.findAll('p').length).toBe(3);
        expect(form.text()).toContain('Study title is required');
        expect(form.text()).toContain('Study description is required');
        expect(form.text()).toContain("Author's name must be at least 3 characters.");
        expect(form.text()).toContain('Please upload a valid metadata file, e.g. .json, .txt, .csv');
    });
});
