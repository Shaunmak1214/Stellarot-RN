import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, Button, Alert } from 'react-native';
import moment from "moment";
import Header from '../components/Header';
import NuaDaily from '../components/Daily';
import Content from '../components/Content';
import Potd from '../components/Potd';
import { LoginButton, SignUpButton } from '../components/Buttons/authButtons';

// const ScreenContainer = ({ children }) => (
//   <View style={styles.container}>{children}</View>
// );

export const HomeScreen = ({ navigation }) => {

  const onOpen = (title, author, publication, imageUrl, summary) => {
    navigation.push('Details', { title: title, author: author, publication: publication, imageUrl: imageUrl, summary: summary })
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <NuaDaily modalize={onOpen} style={styles.nuadaily} />
          <Potd />
          <Content modalize={onOpen} />
        </View>
      </ScrollView>
      {/* <Modalize 
        snapPoint={650} 
        modalTopOffset={10}
        ref={modalizeRef} 
        style={{ width:'100%', alignItems:'center', justifyContent: 'center', padding: 20, bottom: 50, position:'absolute' }}
      >
        <View style={{padding: 20}}>
          <Image
            style={{width: 350, height: 200, zIndex: 1000, borderRadius: 8, marginTop: 10}}
            source={{ uri: `${imageUrl}` }}
          />
          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.detailsBar}>
            <Text style={styles.modalAuthor}>{author}</Text>
            <Text style={styles.modalPublication}>{moment(publication).format("MM-DD-YYYY")}</Text>
          </View>

          <Text style={styles.modalSummary}>{summary}</Text>
        </View>
      </Modalize> */}
    </SafeAreaView>
    </>
  )
}

export const DetailsScreen = ({ route }) => {

  let data = route.params

  return(
  <View style={{padding: 0, position: 'relative'}}>
    <Image
      style={{position: 'absolute', top: 0, width: '100%', height: 250, zIndex: 1000}}
      source={{ uri: `${data.imageUrl}` }}
    />
    <View style={{position: 'absolute', top: 225, paddingTop: 5, paddingHorizontal: 20, borderRadius: 15, zIndex: 1000, backgroundColor: '#F6F2F2'}}>
      <Text style={styles.modalTitle}>{data.title}</Text>
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
  
export const SearchScreen = () => {
    return(
      <View style={styles.container}>
        <Header />
        <Text style={styles.tryText}>Search Screen</Text>
      </View>
    )
  }
  
export const ProfileScreen = () => {
    return(
      <View style={styles.container}>
        <Header />
        <Text style={styles.tryText}>Profile Screen</Text>
      </View>
    )
}

export const AuthScreen = () => {

  const loginClick = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const signUpClick = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return(
    <View style={styles.container}>
      {/* <newsIcon /> */}
      <Image
        style={{ width: '100%', height: 300, zIndex: 1000}}        
        source={require('../assets/images/news.png')}
      />
      <View style={styles.profileAuthView}>
          <Text style={styles.profileHeadingText}>We talk about Space. </Text>
          <Text style={styles.profileSecondaryText}>Join Us. </Text>
      </View>
      <View style={styles.authButtons}>
        <LoginButton onPress={()=>{loginClick()}}/>
        <SignUpButton onPress={()=>{signUpClick()}}/>
      </View>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EAEAEA',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  /*   container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    }, */
    nuadaily: {
      marginTop: 200
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
      fontWeight: '700'
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
      fontSize: 20,
    },
    authButtons:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      position: 'absolute',
      bottom: 35
    }
  });