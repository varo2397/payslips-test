export const getFileExtension = (uri: string, fallback: string = 'pdf'): string => {
  const lastSegment = uri.split('?')[0];
  const extension = lastSegment.split('.').pop();
  return extension ? extension.toLowerCase() : fallback;
};
