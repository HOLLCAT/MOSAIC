import { useStudy } from './useStudy';
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, onBeforeMount } from 'vue';
import { useStudyStore } from '@/stores/studyStore';

export const setupStudy = () => {
    const studyStore = useStudyStore();
    const route = useRoute();
    const router = useRouter();

    const studyId = computed(() => route.params.id as string);

    onBeforeMount(() => {
        studyStore.fetchStudy(studyId.value);
    });

    const study = useStudy();

    watch(study, () => {
        if (!study.value) {
            router.push("/");
        }
    })
    const getNames = (names: string[]) => {
        if (names) {
            return names.join(', ');
        }
    }

    return {
        study,
        getNames,
    }
};