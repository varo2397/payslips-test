import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  previewImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  previewPdf: {
    width: '100%',
    height: 400,
  },
});
