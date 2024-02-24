import { mount } from '@vue/test-utils';
import MobileSideMenu from './MobileSideMenu.vue';
import { routes } from '@/router';
import { it, expect, beforeEach, afterEach, describe } from 'vitest';
import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue';
import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

const mountMobileSideMenu = (props: { isOpen: boolean }) => {
    return mount(MobileSideMenu, {
        attachTo: document.body,
        props: props,
        global: {
            plugins: [router],
        },
    });
};

describe('MobileSideMenu.vue', () => {
    beforeEach(() => {
        const el = document.createElement('div');
        el.id = 'headlessui-portal-root';
        document.body.appendChild(el);
    });

    afterEach(() => {
        if (document.body) document.body.innerHTML = '';
    });

    it('should render correctly when open', async () => {
        const parent = mountMobileSideMenu({ isOpen: true });
        await parent.vm.$nextTick();

        const transitionRoot = await parent.getComponent(TransitionRoot);
        const modal = await transitionRoot.getComponent(Dialog);
        const dialogPanel = await modal.getComponent(DialogPanel);

        expect(dialogPanel.isVisible()).toBe(true);
        expect(dialogPanel.find('h2').text()).toBe('MOSAIC');
    });

    it('should have active link styled correctly ', async () => {
        await router.push('/');
        const parent = mountMobileSideMenu({ isOpen: true });
        await router.isReady();

        const transitionRoot = parent.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        const activeLink = dialogPanel.find('.bg-gray-700');

        expect(activeLink).toBeTruthy();
        expect(activeLink.text()).toBe('Home');
    });

    it('should emit menu-close event when clicking close button', async () => {
        const parent = mountMobileSideMenu({ isOpen: true });
        await parent.vm.$nextTick();

        const transitionRoot = parent.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        const closeButton = dialogPanel.find('button');

        await closeButton.trigger('click');
        expect(parent.emitted('menu-close')).toBeTruthy();
    });

    it('should emit menu-close event when clicking a link ', async () => {
        const parent = mountMobileSideMenu({ isOpen: true });
        await parent.vm.$nextTick();

        const transitionRoot = parent.getComponent(TransitionRoot);
        const modal = transitionRoot.getComponent(Dialog);
        const dialogPanel = modal.getComponent(DialogPanel);

        const link = dialogPanel.find('a');
        await link.trigger('click');

        expect(parent.emitted('menu-close')).toBeTruthy();
    });
});
