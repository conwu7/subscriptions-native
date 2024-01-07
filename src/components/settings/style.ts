import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 150,
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    paddingLeft: 20,
    textAlign: 'left',
    width: '100%',
  },
  backupButton: {
    height: 75,
    backgroundColor: 'white',
    borderColor: '#BABABA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  backupButtonText: {
    fontSize: 20,
    color: 'darkslategray',
  },
});

export default styles;
