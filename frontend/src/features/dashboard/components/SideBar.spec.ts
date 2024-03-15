import { mount } from '@vue/test-utils';
import SideBar from './SideBar.vue';
import { expect, describe, it } from 'vitest';
import { DashboardTabs } from '../utils/Enums';

describe('SideBar.vue', () => {
    it('activates the correct tab and emits the event when clicked', async () => {
        const wrapper = mount(SideBar, {
            props: {
                activeTab: DashboardTabs.Details,
            },
        });

        expect(wrapper.findAll('a')[0].classes()).toContain('bg-slate-100');
        expect(wrapper.findAll('a')[1].classes()).not.toContain('bg-slate-100');
        expect(wrapper.findAll('a')[2].classes()).not.toContain('bg-slate-100');

        await wrapper.findAll('a')[1].trigger('click');
        expect(wrapper.findAll('a')[0].classes()).not.toContain('bg-slate-100');
        expect(wrapper.findAll('a')[1].classes()).toContain('bg-slate-100');
        expect(wrapper.findAll('a')[2].classes()).not.toContain('bg-slate-100');

        expect(wrapper.emitted()['update:activeTab']).toBeTruthy();
        expect(wrapper.emitted()['update:activeTab'][0]).toEqual([DashboardTabs.Studies]);

        await wrapper.findAll('a')[2].trigger('click');
        expect(wrapper.findAll('a')[0].classes()).not.toContain('bg-slate-100');
        expect(wrapper.findAll('a')[1].classes()).not.toContain('bg-slate-100');
        expect(wrapper.findAll('a')[2].classes()).toContain('bg-slate-100');

        expect(wrapper.emitted()['update:activeTab']).toBeTruthy();
        expect(wrapper.emitted()['update:activeTab'][1]).toEqual([DashboardTabs.PendingStudies]);

        await wrapper.findAll('a')[0].trigger('click');
        expect(wrapper.findAll('a')[0].classes()).toContain('bg-slate-100');
        expect(wrapper.findAll('a')[1].classes()).not.toContain('bg-slate-100');
        expect(wrapper.findAll('a')[2].classes()).not.toContain('bg-slate-100');

        expect(wrapper.emitted()['update:activeTab']).toBeTruthy();
        expect(wrapper.emitted()['update:activeTab'][2]).toEqual([DashboardTabs.Details]);
    });
});
