import { ref } from 'vue';
import { validateStudyTitle, validateStudyDesc, validateAuthors, validateStudyMetadata } from '../utils/Validation';
import { useUploadStudyStore } from '@/stores/uploadStudyStore';


export const useUpload = () => {
  const uploadStore = useUploadStudyStore()

  const studyTitle = ref('');
  const studyDesc = ref('');

  const studyTitleError = ref('');
  const studyDescError = ref('');

  const metadata = ref<File | null>(null);
  const metadataError = ref('');

  const authors = ref(['']);
  const authorsError = ref(['']);

  const addAuthorField = () => {
    authors.value.push('');
  };

  const removeAuthorField = (index: number) => {
    const updatedAuthors = [...authors.value];
    updatedAuthors.splice(index, 1);
    authors.value = updatedAuthors;
  };

  const submitForm = (callback: Function) => {
    studyTitleError.value = validateStudyTitle(studyTitle.value);
    studyDescError.value = validateStudyDesc(studyDesc.value);
    authorsError.value = validateAuthors(authors.value);
    metadataError.value = validateStudyMetadata(metadata.value);

    if (!studyTitleError.value && !studyDescError.value && authorsError.value.filter((author) => author !== '').length === 0) {

      uploadStore.setStudyDetails({
        title: studyTitle.value,
        description: studyDesc.value,
        authors: authors.value,
        metadata_type: metadata.value?.name.split('.').pop() as string,
        metadata: metadata.value as File
      });
      callback();
    }
  }


  return {
    studyTitle,
    studyDesc,
    studyTitleError,
    studyDescError,
    authors,
    authorsError,
    metadata,
    metadataError,
    addAuthorField,
    removeAuthorField,
    submitForm
  };
}
