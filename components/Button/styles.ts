import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 3,
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 15,
  },
  confirm: {
    backgroundColor: '#1B98E0',
  },
  cancel: {
    backgroundColor: '#DE6969',
  },
  float: {
    borderRadius: 25,
    position: 'absolute',
    padding: 10,
    backgroundColor: '#1B98E0',
    width: 50,
    height: 50,
    right: '10%',
    top: '85%',
    fontSize: 50

  }
});
