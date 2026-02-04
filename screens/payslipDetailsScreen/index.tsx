import { Button } from '@components/button';
import { StatusModal, StatusModalType } from '@components/statusModal';
import { usePayslips } from '@context/PayslipsContext';
import type { RootStackParamList } from '@navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { assetService } from '@services/asset';
import { fileSystemService } from '@services/fileSystem';
import { payslipDownloadService } from '@services/payslipDownload';
import { formatDate } from '@utils/formatDate';
import { useEffect, useState } from 'react';
import { Image, Modal, Platform, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';

import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'PayslipDetails'>;

export function PayslipDetailsScreen({ route }: Props) {
  const { id } = route.params;
  const { getById } = usePayslips();
  const payslip = getById(id);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<StatusModalType>('loading');
  const [modalMessage, setModalMessage] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [hasSavedFile, setHasSavedFile] = useState(false);

  const updateSavedFileStatus = () => {
    if (!payslip) {
      setHasSavedFile(false);
      return;
    }

    const extension = payslip.fileType === 'image' ? 'jpg' : 'pdf';
    const savedFileName = `${payslip.id}_payslip.${extension}`;
    const savedFileUri = `${fileSystemService.getDocumentDirectory()}${savedFileName}`;
    setHasSavedFile(fileSystemService.fileExists(savedFileUri));
  };

  useEffect(() => {
    updateSavedFileStatus();
  }, [payslip]);

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

      updateSavedFileStatus();

      setModalType('success');
      const location =
        Platform.OS === 'ios'
          ? `Find it in Files app:\nOn My iPhone → payslips`
          : `File saved in the apps documents`;
      setModalMessage(`Payslip saved successfully!\n\nFile: ${savedFileName}\n\n${location}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to download payslip. Please try again.';
      setModalType('error');
      setModalMessage(errorMessage);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setPreviewUri(null);
  };

  const handlePreview = async () => {
    if (!payslip) return;

    try {
      setModalType('loading');
      setModalMessage('Preparing preview...');
      setModalVisible(true);

      const extension = payslip.fileType === 'image' ? 'jpg' : 'pdf';
      const savedFileName = `${payslip.id}_payslip.${extension}`;
      const savedFileUri = `${fileSystemService.getDocumentDirectory()}${savedFileName}`;

      if (fileSystemService.fileExists(savedFileUri)) {
        setPreviewUri(savedFileUri);
      } else {
        const localUri = await assetService.loadAsset(payslip.file);
        setPreviewUri(localUri);
      }
      setModalVisible(false);
      setPreviewVisible(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to preview payslip. Please try again.';
      setModalType('error');
      setModalMessage(errorMessage);
    }
  };

  if (!payslip) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Payslip not found</Text>
      </View>
    );
  }

  const formattedFromDate = formatDate(payslip.fromDate);
  const formattedToDate = formatDate(payslip.toDate);

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

      {hasSavedFile && <Button title="Preview Payslip" onPress={handlePreview} />}

      <Modal
        visible={previewVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClosePreview}
      >
        <View style={styles.previewOverlay}>
          <View style={styles.previewContainer}>
            {payslip.fileType === 'image' && previewUri && (
              <Image source={{ uri: previewUri }} style={styles.previewImage} />
            )}
            {payslip.fileType === 'pdf' && previewUri && (
              <Pdf source={{ uri: previewUri }} style={styles.previewPdf} />
            )}
            <Button title="Close Preview" onPress={handleClosePreview} />
          </View>
        </View>
      </Modal>

      <StatusModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </View>
  );
}
