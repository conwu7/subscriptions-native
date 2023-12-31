import {StyleSheet} from 'react-native';
import {DefaultFonts} from '../../shared/enums';

const style = StyleSheet.create({
  colorButton: {
    alignSelf: 'center',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
    width: '95%',
  },
  colorButtonText: {
    fontSize: 15,
  },
  colorPicker: {
    flex: 1,
    width: 400,
  },
  defaultLabelStyle: {
    color: 'darkslategray',
    fontFamily: DefaultFonts.light,
    fontSize: 15,
  },
  defaultTextInputStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    color: 'black',
    fontFamily: DefaultFonts.medium,
    fontSize: 13,
    height: 60,
    paddingHorizontal: 10,
    width: '100%',
  },
  form: {
    padding: 10,
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  formTitle: {
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
    width: '100%',
  },
  frequencyPicker: {
    alignSelf: 'center',
    borderColor: 'lightgray',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '95%',
  },
  dropdownHelperText: {
    fontFamily: DefaultFonts.medium,
    fontSize: 50,
  },
  frequencyPickerText: {
    fontFamily: DefaultFonts.medium,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 30,
    justifyContent: 'center',
    height: 60,
    width: '50%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'antiquewhite',
    fontSize: 20,
  },
});

export default style;
