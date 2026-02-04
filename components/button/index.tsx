import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

export type ButtonVariant = 'primary' | 'success' | 'error';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
};

export function Button({ title, onPress, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'success' && styles.buttonSuccess,
        variant === 'error' && styles.buttonError,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
