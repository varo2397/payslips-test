import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  filterRow: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButtonSpacing: {
    marginRight: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 10,
  },
  itemTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  itemSubtitle: {
    color: '#4b5563',
  },
});
