import style from './style';
import {TouchableOpacity, View} from 'react-native';
import {Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useState} from 'react';
import NewSubscriptionForm from '../subscription-forms/new-subscription-form';
import {Subscription} from '../../shared/types/subscription';
import GenericOverlay from '../generic-overlay';
import SortSettings from '../sort-settings';
import {SortType, SortValues} from '../../shared/enums';

interface FooterProps {
  addSubscription: (subscription: Subscription) => void;
  handleSortChange: (type: SortType, value: SortValues) => void;
  sortSettings: {
    sortType: SortType;
    sortValue: SortValues;
  };
}

export default function Footer(props: FooterProps) {
  const [isNewFormDisplayed, setNewFormDisplayStatus] = useState(false);
  const [isSortSettingsDisplayed, setSortSettingsStatus] = useState(false);

  return (
    <View style={style.footer}>
      <TouchableOpacity style={style.footerButtonDefault}>
        <Feather name="settings" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={style.footerButtonDefault}>
        <Feather name="filter" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.footerButtonDefault}
        onPress={() => setSortSettingsStatus(true)}
      >
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

      <GenericOverlay
        isVisible={isSortSettingsDisplayed}
        onClose={() => setSortSettingsStatus(prevState => !prevState)}
      >
        {isSortSettingsDisplayed && (
          <SortSettings
            sortType={props.sortSettings.sortType}
            sortValue={props.sortSettings.sortValue}
            onClose={() => setSortSettingsStatus(false)}
            handleSortChange={props.handleSortChange}
          />
        )}
      </GenericOverlay>
    </View>
  );
}
