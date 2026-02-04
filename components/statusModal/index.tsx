import { Modal, View, Text, ActivityIndicator } from 'react-native';
import { Button } from '@components/button';
import { styles } from './styles';

export type StatusModalType = 'loading' | 'error' | 'success';

export type StatusModalProps = {
  visible: boolean;
  type: StatusModalType;
  message?: string;
  onClose?: () => void;
};

export function StatusModal({ visible, type, message, onClose }: StatusModalProps) {
  const isLoading = type === 'loading';
  const isError = type === 'error';
  const isSuccess = type === 'success';

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {isLoading && (
            <>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.message}>{message || 'Loading...'}</Text>
            </>
          )}

          {isError && (
            <>
              <Text style={styles.errorIcon}>✕</Text>
              <Text style={styles.title}>Error</Text>
              <Text style={styles.message}>{message || 'Something went wrong'}</Text>
              <Button title="Close" onPress={onClose} variant="error" />
            </>
          )}

          {isSuccess && (
            <>
              <Text style={styles.successIcon}>✓</Text>
              <Text style={styles.title}>Success</Text>
              <Text style={styles.message}>{message || 'Operation completed successfully'}</Text>
              <Button title="Close" onPress={onClose} variant="success" />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}
