import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logo: {
    resizeMode: 'contain',
  },
  menu: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  }
});

export default styles;
