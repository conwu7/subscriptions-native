import style from './style';
import {Modal, TouchableOpacity, View} from 'react-native';
import {Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useState} from 'react';
import NewSubscriptionForm from '../new-subscription-form';
import {Button, Overlay, Icon} from '@rneui/themed';
import {Subscription} from '../../shared/types/subscription';

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
      <Overlay
        animationType="slide"
        overlayStyle={style.newFormOverlay}
        transparent
        isVisible={isNewFormDisplayed}
        onRequestClose={() => setNewFormDisplayStatus(prevState => !prevState)}
        onBackdropPress={() => setNewFormDisplayStatus(prevState => !prevState)}
      >
        {isNewFormDisplayed && (
          <NewSubscriptionForm
            addSubscription={props.addSubscription}
            onSubmit={() => setNewFormDisplayStatus(false)}
          />
        )}
      </Overlay>
    </View>
  );
}
