import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { format, parseISO } from 'date-fns';

import type { RootStackParamList } from '@navigation/types';
import { usePayslips } from '@context/PayslipsContext';
import { payslipDownloadService } from '@services/payslipDownload';
import { StatusModal, StatusModalType } from '@components/statusModal';
import { Button } from '@components/button';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipDetails'>;

export function PayslipDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const { getById } = usePayslips();
  const payslip = getById(id);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<StatusModalType>('loading');
  const [modalMessage, setModalMessage] = useState('');

  const handleDownload = async () => {
    if (!payslip) return;

    try {
      setModalType('loading');
      setModalMessage('Downloading payslip...');
      setModalVisible(true);

      const savedFileName = await payslipDownloadService.downloadPayslip({
        file: payslip.file,
        fileType: payslip.fileType,
        fileName: `${payslip.id}_payslip`,
      });

      setModalType('success');
      const location = Platform.OS === 'ios' 
        ? `Find it in Files app:\nOn My iPhone → payslips`
        : `Choose a folder (Downloads) in the picker to save it`;
      setModalMessage(`Payslip saved successfully!\n\nFile: ${savedFileName}\n\n${location}`);
    } catch (error) {
      console.error('Download error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to download payslip. Please try again.';
      setModalType('error');
      setModalMessage(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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

      <Button
        title="Download Payslip"
        onPress={handleDownload}
        disabled={modalVisible && modalType === 'loading'}
      />

      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </View>
  );
}
