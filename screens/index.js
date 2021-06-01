import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, FlatList, Platform} from 'react-native';
import { SearchBar } from 'react-native-elements';
import moment from "moment";
import * as Font from 'expo-font';
import { AuthContext } from '../AuthProvider';

import Header from '../components/Header';
import NuaDaily from '../components/Daily';
import Content from '../components/Content';
import Potd from '../components/Potd';
import SearchList from '../components/Search';
import { LoginButton, LogOutButton, SignUpButton, GoogleButton, FacebookButton, LoginActionButton, SignUpActionButton } from '../components/Buttons/authButtons';
import OuterSpaceIcon from '../assets/images/outer-space.svg';

export const HomeScreen = ({ navigation }) => {

  const fonts = {
    'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf')
  }
  
  useEffect(() => {
    (async () => {
        try {
            await Font.loadAsync(fonts);
        } catch (err) {
            console.log(err);
        }
  
    })();
  }), [fonts];

  const onOpen = (title, author, publication, imageUrl, summary) => {
    navigation.push('Details', { title: title, author: author, publication: publication, imageUrl: imageUrl, summary: summary })
  };

  const VirtualizedList = ({children}) => {
    return (
      <FlatList
          data={[]}
          keyExtractor={() => "key"}
          renderItem={null}
          ListHeaderComponent={
              <>{children}</>
          }
      />
    )
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <VirtualizedList>
        <View style={styles.container}>
          <Header />
          <NuaDaily modalize={onOpen} />
          <Potd />
          <Content modalize={onOpen} />
        </View>
      </VirtualizedList>
    </SafeAreaView>
    </>
  )
}

export const DetailsScreen = ({ route }) => {

  const fonts = {
    'Quicksand': require('../assets/fonts/Quicksand-Regular.ttf'),
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf')
  }
  
  useEffect(() => {
    (async () => {
        try {
            await Font.loadAsync(fonts);
        } catch (err) {
            console.log(err);
        }
  
    })();
  }), [fonts];

  let data = route.params

  return(
  <View style={{padding: 0, position: 'relative', backgroundColor: '#FFFFFF'}}>
    <Image
      style={{position: 'absolute', top: 0, width: '100%', height: 250, zIndex: 1000}}
      source={{ uri: `${data.imageUrl}` }}
    />
    <View style={{position: 'absolute', top: 225, paddingTop: 5, paddingHorizontal: 20, borderRadius: 15, zIndex: 1000, backgroundColor: '#FFFFFF'}}>
      <Text style={[styles.modalTitle, {fontFamily: 'Quicksand'}]}>{data.title}</Text>
      <View style={styles.detailsBar}>
        <Text style={styles.modalAuthor}>{data.author}</Text>
        <Text style={styles.modalPublication}>{moment(data.publication).format("MM-DD-YYYY")}</Text>
      </View>

      <Text style={styles.modalSummary}>{data.summary}</Text>
    </View>
  </View>
  )
}

export const NotificationScreen = () => {
    return(
      <View style={styles.container}>
        <Header />
        <Text style={styles.tryText}>Notification Screen</Text>
      </View>
    )
  }
  
export const SearchScreen = ({ navigation }) => {

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
      setSearch({ search })
    }

    const onOpen = (title, author, publication, imageUrl, summary) => {
      navigation.push('Details', { title: title, author: author, publication: publication, imageUrl: imageUrl, summary: summary })
    };

    return(
      <View style={{width: '100%'}}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}
          style={{ width: '100%' }}
          lightTheme={true}
        />
        <SearchList modalize={onOpen} search={search} />
      </View>
    )
}
  
export const ProfileScreen = () => {

  const {user, logout} = useContext(AuthContext);
  const onPress = () => {
    logout();
  }

  return(
    <View style={styles.container}>
      <LogOutButton onPress={onPress} />
      <Text style={styles.tryText}>Profile Screen Logged In !</Text>
    </View>
  )
}

export const AuthScreen = ({ navigation }) => {

  const loginClick = () => {
    navigation.push('LoginScreen')
  }

  const signUpClick = () => {
    navigation.push('SignUpScreen')
  }

  return(
    <View style={ [styles.container, { paddingTop: 60 }] }>
      <View style={styles.profileAuthView}>
          <Text style={styles.profileHeadingText}>We talk about Space. </Text>
          <Text style={styles.profileSecondaryText}>Do not go gentle into that goodnight.  </Text>
      </View>
      <View style={{ width: '100%', height: 415, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
        <OuterSpaceIcon style={{ width: 20, height: 20, zIndex: -1 }} />
      </View>
      <View style={styles.authButtons}>
        <LoginButton onPress={()=>{loginClick()}}/>
        <View style={{ height: 20 }} ></View>
        <SignUpButton onPress={()=>{signUpClick()}}/>
      </View>
    </View>
  )
}

export const LoginScreen = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, googleLogin } = useContext(AuthContext);
  const onPress = () => {
    login(email, password)
  }
  const googleOnPress = () => {
    googleLogin();
  }

  return(
    <SafeAreaView>
      <View style={{paddingHorizontal: 20, paddingVertical: 50, position: 'relative'}}>
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 5, fontSize: 35, color: '#000' }}>Log In to NUA</Text>
          <Text style={{ marginBottom: 30, fontSize: 15, color: '#797979' }}>We missed you .</Text>
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Email"
            placeholderTextColor = "#080808"
            autoCapitalize = "none"
            onChangeText={email => setEmail(email)}
          />
          <TextInput style = {styles.input}
            secureTextEntry={true}
            underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "#080808"
            autoCapitalize = "none"
            onChangeText={password => setPassword(password)}
          />
          <LoginActionButton onPress={onPress} />
          {Platform.OS === 'android' ? (
            <>
            <View style={{ marginVertical: 40, width: '100%', height: 1 ,borderBottomColor: '#C3BBBB', borderBottomWidth: 1, borderRadius: 8 }}></View>
            <GoogleButton onPress={googleOnPress} />
            <FacebookButton />
            </>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}

export const SignUpScreen = ({ route }) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { register } = useContext(AuthContext);

  const onPress = () => {
    register(email, password)
  }

  return(
    <SafeAreaView>
      <View style={{paddingHorizontal: 20, paddingVertical: 50, position: 'relative'}}>
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 5, fontSize: 35, color: '#000' }}>Create Account</Text>
          <Text style={{ marginBottom: 30, fontSize: 15, color: '#797979' }}>Yo, Welcome</Text>
          <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Email"
            placeholderTextColor = "#080808"
            autoCapitalize = "none"
            onChangeText={email => setEmail(email)}
          />
          <TextInput style = {styles.input}
            secureTextEntry={true}
            underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "#080808"
            autoCapitalize = "none"
            onChangeText={password => setPassword(password)}
          />
          <TextInput style = {styles.input}
            secureTextEntry={true}
            underlineColorAndroid = "transparent"
            placeholder = "Repeat Password"
            placeholderTextColor = "#080808"
            autoCapitalize = "none"
          />
          <SignUpActionButton onPress={onPress} />
          {Platform.OS === 'android' ? (
            <>
            <View style={{ marginVertical: 40, width: '100%', height: 1 ,borderBottomColor: '#C3BBBB', borderBottomWidth: 1, borderRadius: 8 }}></View>
            <GoogleButton  />
            <FacebookButton />
            </>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    bottomNavTab:{
      position: 'absolute',
      bottom: 50,
      zIndex: 1000
    },
    modalTitle:{
      fontSize: 25,
      marginBottom: 20,
      marginTop: 20,
      fontWeight: '700',
      color: '#000'
    },
    detailsBar:{
      padding: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
  
    },
    modalAuthor:{
      color: '#797979',
      fontWeight: '500',
      fontSize: 13
    },
    modalPublication:{
      color: '#797979',
      fontWeight: '500',
      fontSize: 13
    },
    modalSummary:{
      marginTop: 20,
      fontSize: 18,
      padding: 5
    },
    tryText:{
      position: 'absolute',
      fontSize: 18,
      bottom: 60
    },
    //for testing purposes
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    profileAuthView:{
      padding: 20,
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: "center",
    },
    profileHeadingText: {
      fontSize: 35,
    },
    profileSecondaryText:{
      color: '#797979',
      fontWeight: '500',
      marginTop: 20,
      fontSize: 15,
    },
    authButtons:{
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: '100%',
      position: 'absolute',
      bottom: 35
    },
    input: {
      marginVertical: 20,
      height: 60,
      borderColor: '#2196F3',
      color: '#242222',
      fontWeight: '500',
      fontSize: 14,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 20
    },
    ripple:{
      backgroundColor: "#000000",
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 50,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });