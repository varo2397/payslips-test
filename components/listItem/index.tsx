import { Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

export type ListItemProps = {
  id: string;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export function ListItem({ title, subtitle, onPress }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}
