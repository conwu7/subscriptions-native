import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  addNewButton: {
    flexDirection: 'row',
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  footerButtonDefault: {
    flexGrow: 1,
  },
});

export default style;
