import style from './style';
import {TouchableOpacity, View} from 'react-native';
import {Feather, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {useState} from 'react';
import NewSubscriptionForm from '../subscription-forms/new-subscription-form';
import {Subscription} from '../../shared/types/subscription';
import GenericOverlay from '../generic-overlay';
import SortSettings from '../sort-settings';
import {BillingPeriod, SortType, SortValues} from '../../shared/enums';
import FilterSettings from '../filter-settings';
import Settings from '../settings';

interface FooterProps {
  addSubscription: (subscription: Subscription) => void;
  allTags: string[];
  refreshLists: () => Promise<void>;
  handleSortChange: (type: SortType, value: SortValues) => void;
  handleFilterApply: (
    selectedTags: Set<string>,
    selectedBillingPeriods: Set<BillingPeriod>
  ) => void;
  sortSettings: {
    sortType: SortType;
    sortValue: SortValues;
  };
  filterSettings: {
    selectedBillingPeriods: Set<BillingPeriod>;
    selectedTags: Set<string>;
  };
}

export default function Footer(props: FooterProps) {
  const [isNewFormDisplayed, setNewFormDisplayStatus] = useState(false);
  const [isSortSettingsDisplayed, setSortSettingsStatus] = useState(false);
  const [isFilterSettingsDisplayed, setFilterSettingsStatus] = useState(false);
  const [isDisplayingSettings, setSettingsStatus] = useState(false);

  const settingsOnClose = async () => {
    await props.refreshLists();
    setSettingsStatus(false);
  };

  return (
    <View style={style.footer}>
      <TouchableOpacity style={style.footerButtonDefault} onPress={() => setSettingsStatus(true)}>
        <Feather name="settings" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.footerButtonDefault}
        onPress={() => setFilterSettingsStatus(true)}
      >
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
            allTags={props.allTags}
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

      <GenericOverlay
        isVisible={isFilterSettingsDisplayed}
        onClose={() => setFilterSettingsStatus(prevState => !prevState)}
      >
        {isFilterSettingsDisplayed && (
          <FilterSettings
            onClose={() => setFilterSettingsStatus(false)}
            allTags={props.allTags}
            handleFilterApply={props.handleFilterApply}
            selectedBillingPeriods={props.filterSettings.selectedBillingPeriods}
            selectedTags={props.filterSettings.selectedTags}
          />
        )}
      </GenericOverlay>

      <GenericOverlay isVisible={isDisplayingSettings} onClose={() => setSettingsStatus(false)}>
        {isDisplayingSettings && <Settings onClose={settingsOnClose} />}
      </GenericOverlay>
    </View>
  );
}
