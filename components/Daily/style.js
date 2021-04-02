import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 20,
    marginTop: 150,
  },
  PrimaryText:{
    fontSize: 25,
    marginBottom: 20
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  scrollable:{
    flex: 1,
    flexDirection: "row",
    overflow: "scroll",
    position: "absolute",
    bottom: 0
  },
  item: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    width: 250,
    shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    borderRadius: 8,
    position: "relative",
    justifyContent: "space-between"
  },
  tinyLogo: {
    width: 210,
    height: 200,
    resizeMode: "contain"
  },
  title: {
    marginTop: 20,
    fontSize: 18,
  },
  name: {
    fontSize: 15
  },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 40,
    justifyContent: 'space-between',
  },
  author:{
    fontSize: 11,
    color:'#797979'
  },  
  publication:{
    fontSize: 11,
    color:'#797979'
  }
});

export default styles;
