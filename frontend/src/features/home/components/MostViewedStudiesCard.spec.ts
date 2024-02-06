import { mount, RouterLinkStub } from '@vue/test-utils';
import MostViewedStudiesCard from './MostViewedStudiesCard.vue';
import { expect, describe, it } from 'vitest';
const numberOfStudiesDisplayed = 3;

const wrapperFunction = () =>
    mount(MostViewedStudiesCard, {
        global: {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        },
    });

describe('MostViewedStudiesCard.vue', () => {
    it('should render', () => {
        const wrapper = wrapperFunction();
        expect(wrapper.exists()).toBe(true);
    });

    it('should render heading', () => {
        const wrapper = wrapperFunction();
        expect(wrapper.find('h1').text()).toBe('Most Viewed Studies');
    });

    it('should display the most viewed studies correctly', async () => {
        const wrapper = wrapperFunction();
        await wrapper.vm.$nextTick();

        const displayedStudies = wrapper.findAll('[testid="study"]');
        expect(displayedStudies.length).toBe(numberOfStudiesDisplayed);

        const studyViews = wrapper.findAll('p');
        var views = [];
        var lastView = Number.MAX_SAFE_INTEGER;
        studyViews.forEach((study) => {
            var viewCount = parseInt(study.text().split(' ')[1]);
            expect(viewCount).toBeLessThanOrEqual(lastView);
            lastView = viewCount;
            views.push(study.text().split(' ')[1]);
        });
    });
});
