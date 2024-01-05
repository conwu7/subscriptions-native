import {Overlay} from '@rneui/themed';
import {View} from 'react-native';
import style from './style';
import React from 'react';

interface GenericOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  children: string | number | React.JSX.Element | React.JSX.Element[];
  styles?: Record<string, string | number>[];
}

export default function GenericOverlay(props: GenericOverlayProps) {
  return (
    <Overlay
      animationType="slide"
      transparent
      isVisible={props.isVisible}
      onRequestClose={props.onClose}
      onBackdropPress={props.onClose}
      overlayStyle={[style.overlay, ...(props.styles ?? [])]}
    >
      {props.children ?? <View />}
    </Overlay>
  );
}
