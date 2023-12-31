import {TouchableOpacity, View} from 'react-native';
import style from './style';
import DefaultText from '../default-text';
import {AntDesign} from '@expo/vector-icons';
import {capitalizeFirstLetter} from '../../shared/utility';
import {SortType, SortValues} from '../../shared/enums';
import {useState} from 'react';

interface SortSettingsProps {
  sortType: SortType;
  sortValue: SortValues;
  onClose: () => void;
  handleSortChange: (type: SortType, value: SortValues) => void;
}

export default function SortSettings(props: SortSettingsProps) {
  const [sortType, setSortType] = useState(props.sortType);
  const [sortValue, setSortValue] = useState(props.sortValue);

  const handleClick = (sortType: SortType, sortValue: SortValues) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const handleSubmit = () => {
    props.handleSortChange(sortType, sortValue);
    props.onClose();
  };

  const SORT_ITEMS = [
    {name: SortType.name, label: 'Name'},
    {name: SortType.amount, label: 'Amount'},
    {name: SortType.upcomingDate, label: 'Bill Date'},
    {name: SortType.createdDate, label: 'Created'},
  ];

  return (
    <View style={style.sortContainer}>
      <DefaultText weight={700} styles={[style.title]}>
        Sort by
      </DefaultText>
      {SORT_ITEMS.map(item => (
        <View style={style.sortItemContainer} key={item.name}>
          <DefaultText styles={[style.sortType]} weight={500}>
            {capitalizeFirstLetter(item.label)}
          </DefaultText>
          <TouchableOpacity
            onPress={() => handleClick(item.name, SortValues.asc)}
            style={[
              style.sortValueIconButton,
              item.name === sortType && sortValue === SortValues.asc
                ? style.selectedButton
                : undefined,
            ]}
          >
            <AntDesign name="arrowup" size={40} color="darkslategray" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleClick(item.name, SortValues.desc)}
            style={[
              style.sortValueIconButton,
              item.name === sortType && sortValue === SortValues.desc
                ? style.selectedButton
                : undefined,
            ]}
          >
            <AntDesign name="arrowdown" size={40} color="darkslategray" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={handleSubmit} style={style.submitButton}>
        <DefaultText weight={700} styles={[style.submitButtonText]}>
          Apply
        </DefaultText>
      </TouchableOpacity>
    </View>
  );
}
