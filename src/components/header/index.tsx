import style from './style';
import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
import DefaultText from '../default-text';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {BillingPeriod} from '../../shared/enums';
import {capitalizeFirstLetter} from '../../shared/utility';
import {formatAmountForDisplay} from '../../shared/amounts';

interface HeaderProps {
  billingPeriod: BillingPeriod;
  switchBillingPeriod: () => void;
  totals: Record<BillingPeriod, number>;
}
export default function Header(props: HeaderProps) {
  return (
    <View style={style.header}>
      <DefaultText styles={[style.titleText]} weight={900}>
        Subscriptions
      </DefaultText>
      <TouchableOpacity style={style.totalPerPeriodArea} onPress={props.switchBillingPeriod}>
        <View style={style.totalPerPeriodTextArea}>
          <DefaultText styles={[style.totalPeriod]} weight={400}>
            {capitalizeFirstLetter(props.billingPeriod)}
          </DefaultText>
          <DefaultText styles={[style.totalAmount]} weight={700}>
            {`$${formatAmountForDisplay(props.totals[props.billingPeriod])}`}
          </DefaultText>
        </View>
        <View style={style.totalPerPeriodIconArea}>
          <MaterialCommunityIcons name="pan-vertical" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
