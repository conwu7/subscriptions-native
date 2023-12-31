import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 20,
    paddingLeft: 10,
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
