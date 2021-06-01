import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 20,
  },
  containerTitle:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: -10
  },
  dot:{
    marginRight: 10,
    marginTop: -20
  },
  PrimaryText:{
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000'
  },
  flatList:{
    paddingVertical: 20,
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
    paddingHorizontal: 0,
    marginHorizontal: 10,
    width: 200,
    /* shadowOffset:{  width: 10,  height: 10,  },
    shadowColor: 'black',
    shadowOpacity: 1.0, */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    borderRadius: 8,
    position: "relative",
    justifyContent: "space-between",
  },
  tinyLogo: {
    width: 210,
    height: 200,
    resizeMode: "contain"
  },
  title: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    minHeight: 70,
  },
  name: {
    fontSize: 15
  },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  author:{
    fontSize: 9,
    color:'#959595'
  },  
  publication:{
    fontSize: 9,
    color:'#959595'
  },
  lottie: {
    width: 150,
    height: 150
  }
});

export default styles;
