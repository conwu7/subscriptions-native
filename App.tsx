import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StatusBar as SB, StyleSheet} from 'react-native';
import Dashboard from './src/components/dashboard';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Dashboard />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? SB.currentHeight : 0,
  },
});
