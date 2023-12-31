import style from './style';
import {TouchableOpacity, View} from 'react-native';
import {Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useState} from 'react';
import NewSubscriptionForm from '../new-subscription-form';
import {Overlay} from '@rneui/themed';
import {Subscription} from '../../shared/types/subscription';
import GenericOverlay from '../generic-overlay';

interface FooterProps {
  addSubscription: (subscription: Subscription) => void;
}

export default function Footer(props: FooterProps) {
  const [isNewFormDisplayed, setNewFormDisplayStatus] = useState(false);
  return (
    <View style={style.footer}>
      <TouchableOpacity style={style.footerButtonDefault}>
        <Feather name="settings" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={style.footerButtonDefault}>
        <Feather name="filter" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={style.footerButtonDefault}>
        <MaterialCommunityIcons name="sort" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.addNewButton}
        onPress={() => setNewFormDisplayStatus(prevState => !prevState)}
      >
        <Ionicons name="create-outline" size={40} color="black" />
      </TouchableOpacity>
      <GenericOverlay
        isVisible={isNewFormDisplayed}
        onClose={() => setNewFormDisplayStatus(prevState => !prevState)}
      >
        {isNewFormDisplayed && (
          <NewSubscriptionForm
            addSubscription={props.addSubscription}
            onSubmit={() => setNewFormDisplayStatus(false)}
          />
        )}
      </GenericOverlay>
    </View>
  );
}
