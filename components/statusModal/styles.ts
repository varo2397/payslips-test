import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 8,
  },
  errorIcon: {
    fontSize: 48,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  successIcon: {
    fontSize: 48,
    color: '#10b981',
    fontWeight: 'bold',
  },
});
