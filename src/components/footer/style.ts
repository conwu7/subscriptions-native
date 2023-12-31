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
  newFormOverlay: {
    backgroundColor: '#F4F4F4',
    flex: 1,
    height: 'auto',
    width: '100%',
  },
});

export default style;
