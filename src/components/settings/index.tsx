import {Alert, TouchableOpacity, View} from 'react-native';
import DefaultText from '../default-text';
import style from './style';
import * as FileSystem from 'expo-file-system';
import {toStandardDateFormat} from '../../shared/dates';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import {isValidSubscription} from '../../shared/subscriptions';
import {Subscription} from '../../shared/types/subscription';

interface SettingsProps {
  onClose: () => void;
}
export default function Settings(props: SettingsProps) {
  const getSubscriptions = async () => {
    const list = await AsyncStorage.getItem('subscriptionList');
    if (!list) {
      return [];
    }

    return JSON.parse(list) as Subscription[];
  };
  const saveBackupFile = async () => {
    const jsonFileUri =
      FileSystem.documentDirectory + `subscriptions-${toStandardDateFormat()}.json`;

    const data = await getSubscriptions();
    if (data.length < 1) {
      Alert.alert('No subscriptions to backup');
      return;
    }
    await FileSystem.writeAsStringAsync(jsonFileUri, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(jsonFileUri, {
        mimeType: 'application/json',
      });
    }
    Alert.alert('Backup created');
  };

  const restoreFromBackup = async () => {
    try {
      // Open the document picker and get the file
      const file = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (file.canceled) {
        return;
      }

      const asset = file.assets[0];
      // Read the file
      const fileContent = await FileSystem.readAsStringAsync(asset.uri);

      // Try to parse the file content as JSON
      const backedUpList = JSON.parse(fileContent) as Subscription[];

      if (!isValidSubscription(backedUpList[0])) {
        Alert.alert('Invalid backup file');
        return;
      }

      const currentList = await getSubscriptions();

      const currentListSet = new Set(currentList.map(item => item.id));
      const filteredBackupList = backedUpList.filter(sub => !currentListSet.has(sub.id));

      await AsyncStorage.setItem(
        'subscriptionList',
        JSON.stringify(currentList.concat(filteredBackupList))
      );

      Alert.alert('Backup restored');
      props.onClose();
    } catch (error) {
      console.error('Failed to read or parse file:', error);
    }
  };

  return (
    <View style={style.settingsContainer}>
      <DefaultText weight={700} styles={[style.title]}>
        Settings
      </DefaultText>
      <TouchableOpacity style={style.backupButton} onPress={saveBackupFile}>
        <DefaultText styles={[style.backupButtonText]}>Create new backup</DefaultText>
      </TouchableOpacity>
      <TouchableOpacity style={style.backupButton} onPress={restoreFromBackup}>
        <DefaultText styles={[style.backupButtonText]}>Restore from file</DefaultText>
      </TouchableOpacity>
    </View>
  );
}
