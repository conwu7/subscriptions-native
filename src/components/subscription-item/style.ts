import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  actualCostPerPeriod: {
    fontSize: 12,
  },
  costSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  costText: {
    fontSize: 19,
  },
  detailsSection: {},
  subscriptionItem: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 75,
    marginBottom: 7,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  subscriptionDescription: {
    fontSize: 11,
  },
  subscriptionName: {
    fontSize: 17,
  },
});

export default style;
