import { defineStore } from "pinia";
import { computed, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { get } from "@/utils/axiosWrapper";
import type { StudyType } from "@/utils/types";


export const useStudyStore = defineStore("study", () => {
  const router = useRouter();
  const isDev = inject<boolean>("isDev")!;

  const study = ref<StudyType | null>(null);

  const getSamples = computed(() => study.value?.samples);

  async function fetchStudy(accession: string) {
    try {
      const url = import.meta.env.VITE_STUDY_URL + `/${accession}`;
      const response = await get<StudyType>(url);
      if (response.error) throw response.error;

      study.value = response.data;
      return true;
    } catch (error) {
      if (isDev) console.log(error);
      router.push("/");
    }
  }
  return {
    study,
    getSamples,
    fetchStudy,
  };
});