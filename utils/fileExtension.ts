export const getFileExtension = (uri: string, fallback: string = 'pdf'): string => {
  const lastSegment = uri.split('?')[0];
  const fileName = lastSegment.split('/').pop() || '';

  if (!fileName.includes('.')) {
    return fallback;
  }

  const extension = fileName.split('.').pop();
  return extension ? extension.toLowerCase() : fallback;
};
