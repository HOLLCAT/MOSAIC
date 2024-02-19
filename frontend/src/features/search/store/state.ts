import type { StateType } from '../utils/types';

const state = (): StateType => ({
    fileredResults: null,
    OriginalResults: null,
    filters: null,
    filteredSamples: null,
});
export default state;
