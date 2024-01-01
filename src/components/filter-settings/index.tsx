import {ScrollView, TouchableOpacity, View} from 'react-native';
import style from './style';
import DefaultText from '../default-text';
import {AntDesign} from '@expo/vector-icons';
import {capitalizeFirstLetter} from '../../shared/utility';
import {BillingPeriod, SortType, SortValues} from '../../shared/enums';
import {useState} from 'react';
import {BillingPeriodFilterType, TagsFilterType} from '../../shared/types/filters';

interface FilterSettingsProps {
  allTags: string[];
  selectedTags: Set<string>;
  selectedBillingPeriods: Set<BillingPeriod>;
  onClose: () => void;
  handleFilterApply: (
    selectedTags: Set<string>,
    selectedBillingPeriods: Set<BillingPeriod>
  ) => void;
}

export default function FilterSettings(props: FilterSettingsProps) {
  const [selectedTags, setSelectedTags] = useState(props.selectedTags);
  const [selectedBillingPeriods, setSelectedBillingPeriods] = useState(
    props.selectedBillingPeriods
  );

  const handleTagClick = (tag: string) => {
    const newSet = new Set(selectedTags);
    const hasTag = newSet.has(tag);
    if (hasTag) {
      newSet.delete(tag);
    } else {
      newSet.add(tag);
    }
    setSelectedTags(newSet);
  };

  const handleBillingPeriodClick = (period: BillingPeriod) => {
    const newSet = new Set(selectedBillingPeriods);
    const hasBillingPeriod = newSet.has(period);
    if (hasBillingPeriod) {
      newSet.delete(period);
    } else {
      newSet.add(period);
    }
    setSelectedBillingPeriods(newSet);
  };

  const handleSubmit = () => {
    props.handleFilterApply(selectedTags, selectedBillingPeriods);
    props.onClose();
  };

  const handleClearAllFilters = () => {
    setSelectedBillingPeriods(new Set());
    setSelectedTags(new Set());
  };

  return (
    <ScrollView style={style.sortContainer}>
      <DefaultText weight={700} styles={[style.title]}>
        Filter by
      </DefaultText>
      <DefaultText styles={[style.filterType]} weight={500}>
        Tags
      </DefaultText>
      <View style={style.filterItemContainer}>
        {props.allTags.map(item => (
          <TouchableOpacity
            key={item}
            style={[style.tagItemButton].concat(
              selectedTags.has(item) ? (style.selectedButton as any) : []
            )}
            onPress={() => handleTagClick(item)}
          >
            <DefaultText>{item}</DefaultText>
          </TouchableOpacity>
        ))}
      </View>

      <DefaultText styles={[style.filterType]} weight={500}>
        Billing Period
      </DefaultText>
      <View style={style.filterItemContainer}>
        {Object.values(BillingPeriod).map(item => (
          <TouchableOpacity
            key={item}
            style={[style.tagItemButton].concat(
              selectedBillingPeriods.has(item) ? (style.selectedButton as any) : []
            )}
            onPress={() => handleBillingPeriodClick(item)}
          >
            <DefaultText>{item}</DefaultText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={style.clearAndSubmitContainer}>
        <TouchableOpacity onPress={handleClearAllFilters} style={style.clearButton}>
          <DefaultText weight={700} styles={[style.clearButtonText]}>
            Clear
          </DefaultText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={style.submitButton}>
          <DefaultText weight={700} styles={[style.submitButtonText]}>
            Apply
          </DefaultText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
