import { ref } from 'vue';
import { validateStudyTitle, validateStudyDesc, validateAuthors, validateStudyMetadata } from '../utils/Validation';
import { useUploadStore } from './useUploadStore';

export const useUpload = () => {
  const store = useUploadStore();

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
    console.log('submit form');
    studyTitleError.value = validateStudyTitle(studyTitle.value);
    studyDescError.value = validateStudyDesc(studyDesc.value);
    authorsError.value = validateAuthors(authors.value);
    metadataError.value = validateStudyMetadata(metadata.value);

    if (!studyTitleError.value && !studyDescError.value && authorsError.value.filter((author) => author !== '').length === 0) {
      console.log('Form Submitted');
      store.commit('upload/setStudyDetails', {
        title: studyTitle.value,
        description: studyDesc.value,
        authors: authors.value,
        metadata_type: metadata.value?.name.split('.').pop(),
        metadata: metadata.value
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
