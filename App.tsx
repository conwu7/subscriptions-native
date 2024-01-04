import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StatusBar as SB, StyleSheet} from 'react-native';
import Dashboard from './src/components/dashboard';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

SplashScreen.preventAutoHideAsync();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Dashboard />
      <StatusBar style="dark" />
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
