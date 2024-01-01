import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  sortContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 40,
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: 'left',
    width: '100%',
  },
  sortItemContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    height: 80,
    flexDirection: 'row',
  },
  selectedButton: {
    backgroundColor: 'lightgreen',
  },
  sortType: {
    color: 'darkslategray',
    fontSize: 17,
    width: 100,
    marginRight: 20,
    marginVertical: 20,
  },
  sortValueIconButton: {
    margin: 10,
    padding: 10,
    borderRadius: 30,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: 'darkslategray',
    justifyContent: 'center',
    height: 80,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 40,
  },
  submitButtonText: {
    color: 'antiquewhite',
    fontSize: 18,
  },
});

export default style;
