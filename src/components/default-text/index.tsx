import {
  useFonts,
  RedHatDisplay_300Light,
  RedHatDisplay_400Regular,
  RedHatDisplay_500Medium,
  RedHatDisplay_600SemiBold,
  RedHatDisplay_700Bold,
  RedHatDisplay_800ExtraBold,
  RedHatDisplay_900Black,
} from '@expo-google-fonts/red-hat-display';
import {Bungee_400Regular} from '@expo-google-fonts/bungee';
import {Text} from 'react-native';
import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {DefaultFonts} from '../../shared/enums';

SplashScreen.preventAutoHideAsync();

interface DefaultTextProps {
  weight?: 300 | 400 | 500 | 600 | 700 | 800 | 900 | 1000;
  styles?: Record<string, string | number>[];
  children?: string | React.JSX.Element;
}

export default function DefaultText(props: DefaultTextProps) {
  const [fontsLoaded] = useFonts({
    RedHatDisplay_300Light,
    RedHatDisplay_400Regular,
    RedHatDisplay_500Medium,
    RedHatDisplay_600SemiBold,
    RedHatDisplay_700Bold,
    RedHatDisplay_800ExtraBold,
    RedHatDisplay_900Black,
    Bungee_400Regular,
  });

  const weightMappings = {
    300: DefaultFonts.light,
    400: DefaultFonts.regular,
    500: DefaultFonts.medium,
    600: DefaultFonts.semiBold,
    700: DefaultFonts.bold,
    800: DefaultFonts.extraBold,
    900: DefaultFonts.black,
    1000: DefaultFonts.title,
  };

  const weight = props.weight ?? 400;

  const style = {fontFamily: weightMappings[weight]};
  const customStyles = props.styles ?? [];

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <Text {...props} style={[style, ...customStyles]}>
      {props.children}
    </Text>
  );
}
