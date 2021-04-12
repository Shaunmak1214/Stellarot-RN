import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { AppLoading } from 'expo'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeIcon from './assets/images/homenav.svg';
import SearchIcon from './assets/images/searchnav.svg';
import NotificationIcon from './assets/images/bellnav.svg';
import ProfileIcon from './assets/images/profilenav.svg';
import { HomeScreen, DetailsScreen, NotificationScreen, SearchScreen, ProfileScreen, AuthScreen } from './screens'

import * as Font from 'expo-font';

const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </HomeStack.Navigator>
)

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={SearchScreen} />
  </SearchStack.Navigator>
)

const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen name="Notification" component={NotificationScreen} />
  </NotificationStack.Navigator>
)

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={AuthScreen} />
  </ProfileStack.Navigator>
)

const Tab = createBottomTabNavigator();

export default function App() {

  const [loaded, setLoaded] = useState(false);
  const fonts = {
    'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
  }

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync(fonts);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }

    })();
  }), [fonts];

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
          tabBarIcon: () => {
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
          SearchStackScreen
        } />
        <Tab.Screen name="Notification" 
          options={{tabBarBadge: 999,}}
          component={
          NotificationStackScreen
        } />
        <Tab.Screen name="Profile" component={
          ProfileStackScreen
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
  }
});