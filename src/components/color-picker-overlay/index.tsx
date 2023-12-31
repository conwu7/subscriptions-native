import {ColorPicker} from 'react-native-color-picker';
import Slider, {SliderProps} from '@react-native-community/slider';
import GenericOverlay from '../generic-overlay';
import style from './style';
import React from 'react';

interface ColorPickerOverlayProps {
  color: string;
  handleSelectColor: (color: string) => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function ColorPickerOverlay(props: ColorPickerOverlayProps) {
  return (
    <GenericOverlay isVisible={props.isVisible} onClose={props.onClose}>
      <ColorPicker
        oldColor={props.color}
        sliderComponent={Slider as unknown as React.Component<SliderProps>}
        onColorSelected={color => props.handleSelectColor(color)}
        style={style.colorPicker}
      />
    </GenericOverlay>
  );
}
