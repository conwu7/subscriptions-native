import {StyleSheet} from 'react-native';
import {DefaultFonts} from '../../shared/enums';

const style = StyleSheet.create({
  colorAndDateContainer: {
    flexDirection: 'row',
    gap: 30,
    paddingHorizontal: 12,
  },
  colorButton: {
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    height: 60,
    justifyContent: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
    // width: '95%',
  },
  colorButtonText: {
    fontSize: 15,
  },
  colorPicker: {
    flex: 0.9,
    width: 400,
  },
  dateButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    flex: 1,
    flexDirection: 'column',
    height: 60,
    justifyContent: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
    // width: '95%',
  },
  dateButtonLabelText: {
    fontSize: 12,
  },
  dateButtonText: {
    fontSize: 14,
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
  deleteButton: {
    alignItems: 'center',
    backgroundColor: 'firebrick',
    borderRadius: 30,
    justifyContent: 'center',
    height: 60,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: 'antiquewhite',
    fontSize: 18,
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
    backgroundColor: 'darkslategray',
    borderRadius: 30,
    justifyContent: 'center',
    height: 60,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'antiquewhite',
    fontSize: 18,
  },
});

export default style;