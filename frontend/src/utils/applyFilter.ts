import type { FilterType } from '@/features/search/utils/types';

export const applyFilter = (result: any, filter: FilterType) => {
    const filterValues = filter.options.filter((item) => item.checked).map((item) => item.value);
    if (filterValues.length === 0) return true;
    return filter.filterFunc(
        result,
        filterValues.map((item) => String(item))
    );
};