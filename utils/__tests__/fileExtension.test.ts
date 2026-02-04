import { getFileExtension } from '../fileExtension';

describe('getFileExtension', () => {
  it('returns the file extension', () => {
    expect(getFileExtension('file:///path/to/report.pdf')).toBe('pdf');
  });

  it('handles query strings and upper case extensions', () => {
    expect(getFileExtension('file:///path/to/image.JPG?cache=1')).toBe('jpg');
  });

  it('returns fallback when no extension is found', () => {
    expect(getFileExtension('file:///path/to/file', 'png')).toBe('png');
  });
});
