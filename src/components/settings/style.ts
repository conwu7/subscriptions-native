import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 40,
    paddingBottom: 150,
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    textAlign: 'left',
    width: '120%',
  },
  backupButton: {
    height: 75,
    backgroundColor: '#e9e9e9',
    borderWidth: 1,
    borderColor: '#BABABA',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  backupButtonText: {
    fontSize: 20,
    color: 'darkslategray',
  },
});

export default styles;
