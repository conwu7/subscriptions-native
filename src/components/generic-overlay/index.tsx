import {Overlay} from '@rneui/themed';
import {View} from 'react-native';
import style from './style';

interface GenericOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  children: any;
  styles?: Record<string, any>[];
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
