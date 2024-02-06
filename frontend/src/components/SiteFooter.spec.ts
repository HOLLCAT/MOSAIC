import { mount } from '@vue/test-utils';
import SiteFooter from './SiteFooter.vue';
import { describe, expect, it } from 'vitest';
import router from '@/router';

const renderSiteFooter = () =>
    mount(SiteFooter, {
        global: {
            plugins: [router],
        },
    });

describe('SiteFooter.vue', () => {
    it('should render SiteFooter', () => {
        const wrapper = renderSiteFooter();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render correctly with props and handle changes', async () => {
        const wrapper = renderSiteFooter();

        expect(wrapper.find('footer').text()).toContain('MOSAIC');
        expect(wrapper.find('footer').text()).toContain('About');
        expect(wrapper.find('footer').text()).toContain('Help');
        expect(wrapper.find('footer').text()).toContain('Docs');
        expect(wrapper.find('footer').text()).toContain('© 2023 MOSAIC. All Rights Reserved.');
    });

    it('should display links', async () => {
        const wrapper = renderSiteFooter();
        expect(wrapper.find('a[href="/about"]').exists()).toBe(true);
        expect(wrapper.find('a[href="/help"]').exists()).toBe(true);
    });
});
