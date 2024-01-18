export const validateStudyTitle = (title: string) => {
  if (!title) {
    return 'Study title is required';
  }
  return '';
};

export const validateStudyDesc = (desc: string) => {
  if (!desc) {
    return 'Study description is required';
  }
  return '';
};

export const validateAuthors = (authors: string[]) => {
  const authorsError: string[] = [];

  for (const author of authors) {
    if (author.length < 3) {
      authorsError.push('Author\'s name must be at least 3 characters.');
    }
    else {
      authorsError.push('');
    }
  }

  return authorsError;

};

export const validateStudyData = (data: string) => {
  if (!data) {
    return 'Please upload study data';
  }
  return '';
};

export const validateStudyMetadata = (metadata: File | null) => {
  if (!metadata) {
    return 'Please upload study metadata';
  }

  if (!metadata.name.endsWith('.json') && !metadata.name.endsWith('.txt') && !metadata.name.endsWith('.csv')) {
    return 'Please upload a valid metadata file, e.g. .json, .txt, .csv';
  }

  return '';
};