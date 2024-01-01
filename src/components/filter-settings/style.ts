import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  sortContainer: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-end',
    padding: 40,
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: 'left',
    width: '100%',
  },
  filterItemContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: 'lightgreen',
    borderWidth: 1,
  },
  filterType: {
    color: 'darkslategray',
    fontSize: 20,
    width: 200,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  sortValueIconButton: {
    margin: 10,
    padding: 10,
    height: 60,
    borderRadius: 30,
  },
  clearAndSubmitContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  clearButton: {
    alignItems: 'center',
    backgroundColor: 'firebrick',
    justifyContent: 'center',
    height: 80,
    flex: 1,
    alignSelf: 'center',
    marginVertical: 40,
  },
  clearButtonText: {
    color: 'antiquewhite',
    fontSize: 18,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: 'darkslategray',
    justifyContent: 'center',
    height: 80,
    flex: 1,
    alignSelf: 'center',
    marginVertical: 40,
  },
  submitButtonText: {
    color: 'antiquewhite',
    fontSize: 18,
  },
  tagItemButton: {
    backgroundColor: 'lightgray',
    padding: 7,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default style;
