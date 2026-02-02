import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';

import type { RootStackParamList } from '@navigation/types';
import { usePayslips } from '@context/PayslipsContext';
import { payslipDownloadService } from '@services/payslipDownload';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipDetails'>;

export function PayslipDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const { getById } = usePayslips();
  const payslip = getById(id);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!payslip) return;

    try {
      setDownloading(true);

      await payslipDownloadService.downloadPayslip({
        file: payslip.file,
        fileType: payslip.fileType,
        fileName: `${payslip.id}_payslip`,
      });

      Alert.alert('Success', 'Payslip downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to download payslip. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setDownloading(false);
    }
  };

  if (!payslip) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Payslip not found</Text>
      </View>
    );
  }

  const formattedFromDate = format(parseISO(payslip.fromDate), 'yyyy-MM-dd');
  const formattedToDate = format(parseISO(payslip.toDate), 'yyyy-MM-dd');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payslip Details</Text>
      
      <Text style={styles.label}>ID</Text>
      <Text style={styles.value}>{payslip.id}</Text>
      
      <Text style={styles.label}>Period</Text>
      <Text style={styles.value}>
        {formattedFromDate} to {formattedToDate}
      </Text>
      
      <Text style={styles.label}>File Type</Text>
      <Text style={styles.value}>{payslip.fileType.toUpperCase()}</Text>

      <TouchableOpacity
        style={styles.downloadButton}
        onPress={handleDownload}
        disabled={downloading}
      >
        {downloading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.downloadButtonText}>Download Payslip</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
