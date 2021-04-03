import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { AppLoading } from 'expo'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image,  TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Modalize } from 'react-native-modalize';
import Header from './components/Header';
import NuaDaily from './components/Daily'
import { Ionicons } from '@expo/vector-icons';
import { render } from 'react-dom';
import HomeIcon from './assets/images/homenav.svg';
import SearchIcon from './assets/images/searchnav.svg';
import NotificationIcon from './assets/images/bellnav.svg';
import ProfileIcon from './assets/images/profilenav.svg';

import moment from "moment";

const HomeStackScreen = () => {

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [publication, setPublication] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [summary, setSummary] = useState([])

  const modalizeRef = useRef(null);
  const onOpen = (title, author, publication, imageUrl, summary) => {
    modalizeRef.current?.open();
    setTitle(title)
    setAuthor(author)
    setPublication(publication)
    setImageUrl(imageUrl)
    setSummary(summary)
  };

  return (
    <>

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <Header />
            <NuaDaily modalize={onOpen} style={styles.nuadaily} />
          {/* <NuaDaily style={styles.nuadaily1} />
          <NuaDaily style={styles.nuadaily1} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>

{/*     <TouchableOpacity onPress={onOpen}>
      <Text>Open the modal</Text>
    </TouchableOpacity> */}

    <Modalize snapPoint={650} modalTopOffset={10} ref={modalizeRef} style={{ width: '100%',   alignItems: 'center', justifyContent: 'center', padding: 20 }}>
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
    </Modalize>

    </>
  )
}

const NotificationScreen = () => {
  return(
    <View style={styles.container}>
      <Header />
      <Text style={styles.tryText}>Notification Screen</Text>
    </View>
  )
}

const SearchScreen = () => {
  return(
    <View style={styles.container}>
      <Header />
      <Text style={styles.tryText}>Search Screen</Text>
    </View>
  )
}

const ProfileScreen = () => {
  return(
    <View style={styles.container}>
      <Header />
      <Text style={styles.tryText}>Profile Screen</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={
          {
            activeTintColor: '#00B2FF',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: { height: 60, borderRadius: 0, backgroundColor: 'rgba(255, 255, 255, 0.85)'}
          }
        }
        showLabel = {false}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return <HomeIcon />
            } else if (route.name === 'Search') {
              return <SearchIcon />
            } else if (route.name === 'Notification') {
              return <NotificationIcon />
            } else if (route.name === 'Profile') {
              return <ProfileIcon />
            }
          },
        })}
      >
        <Tab.Screen name="Home"
          component={
          HomeStackScreen
        } />
        <Tab.Screen name="Search" component={
          SearchScreen
        } />
        <Tab.Screen name="Notification" 
          options={{tabBarBadge: 999,}}
          component={
          NotificationScreen
        } />
        <Tab.Screen name="Profile" component={
          ProfileScreen
        } />
      </Tab.Navigator>
    </NavigationContainer>
  );
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
  }
});