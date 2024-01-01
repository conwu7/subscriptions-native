import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  filteredStatus: {
    fontSize: 14,
    color: 'red',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 10,
  },
  titleTextArea: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  titleText: {
    fontSize: 20,
  },
  totalPerPeriodArea: {
    flexDirection: 'row',
  },
  totalPerPeriodTextArea: {
    alignItems: 'flex-end',
  },
  totalPerPeriodIconArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalPeriod: {
    fontSize: 13,
  },
  totalAmount: {
    fontSize: 20,
  },
});

export default style;
