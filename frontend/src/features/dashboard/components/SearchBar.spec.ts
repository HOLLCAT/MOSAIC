import { mount } from '@vue/test-utils';
import SearchBar from './SearchBar.vue';
import { expect, describe, it } from 'vitest';

describe('SearchBar.vue', () => {
    it('emits the correct search value', async () => {
        const wrapper = mount(SearchBar);

        const input = wrapper.find('input[type="search"]');
        const testValue = 'Study 1';

        await input.setValue(testValue);

        expect(wrapper.emitted()).not.toHaveProperty('search-value');

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.emitted()).toHaveProperty('search-value');

        const events = wrapper.emitted('search-value');
        expect(events).toHaveLength(1);
        if (events) expect(events[0]).toEqual([testValue]);
    });
});
