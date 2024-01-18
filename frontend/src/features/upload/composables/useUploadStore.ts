import { useStore } from 'vuex'
import type { UploadStateType } from '../utils/types'

export const useUploadStore = () => {
    const store = useStore<UploadStateType>()
    return store
}