import { type SearchItemType, type SampleType } from '@/utils/dummyDataNew'

export const state = () => ({
    study: {} as SearchItemType | null,
    samples: [] as SampleType[] | null,   
})