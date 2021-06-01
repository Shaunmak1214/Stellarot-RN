import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import {AuthContext, AuthProvider} from './AuthProvider';

import Icon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import CustomIcons from './assets/custom_icons';
import HomeIcon from './assets/compiled_svgs/home_line.js';
import SearchIcon from './assets/images/search-line.svg';
import NotificationIcon from './assets/images/notification-line.svg';
import ProfileIcon from './assets/images/account-circle-line.svg';
import { HomeScreen, DetailsScreen, NotificationScreen, SearchScreen, ProfileScreen, AuthScreen, LoginScreen, SignUpScreen } from './screens'

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
    <HomeStack.Screen name="Details" component={DetailsScreen} />
  </SearchStack.Navigator>
)

const NotificationStackScreen = () => (
  <NotificationStack.Navigator>
    <NotificationStack.Screen name="Notification" component={NotificationScreen} />
  </NotificationStack.Navigator>
)

const ProfileStackScreen = () => {

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log(user)
    if (initializing) setInitializing(false);
  }
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, {});

  if (initializing) return null;

  return(
    <ProfileStack.Navigator>
      {user ? 
        <ProfileStack.Screen options={{headerShown: false}} name="LoggedInProfile" component={ProfileScreen} />
       : 
        <>
          <ProfileStack.Screen options={{headerShown: false}} name="Profile" component={AuthScreen} />
          <ProfileStack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
          <ProfileStack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen} />
        </>
      }
    </ProfileStack.Navigator>
  )
}

export default function App() {

  const [loaded, setLoaded] = useState(false);
  const [tabSelected, setTabSelected] = useState("Home");
  const fonts = {
    'Quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
  }
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    (async () => {
      try {
        await Font.loadAsync(fonts);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }

      GoogleSignin.configure({
        webClientId: '632307321665-9tnvvnh86c50vnqeg400jgpiin3a1v3b.apps.googleusercontent.com',
      });

    })();
  }), [fonts];

  return (
    <AuthProvider>
      <NavigationContainer>
        <Tab.Navigator
          onPress={ console.log('pressed') }
          tabBarOptions={
            {
              activeTintColor: '#00B2FF',
              inactiveTintColor: 'gray',
              showLabel: false,
              style: { height: 60, borderRadius: 0}
            }
          }
          showLabel = {false}
          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === 'Home') {
                if(tabSelected === 'Home'){
                  return <Icon name="ios-home" size={25} color="#000000" />
                }else{
                  return <Icon name="ios-home-outline" size={25} color="#646464" />
                }
              } else if (route.name === 'Search') {
                if(tabSelected === 'Search'){
                  return <Icon name="search-sharp" size={25} color="#000000" />
                }else{
                  return <Icon name="search-outline" size={25} color="#646464" />
                }
              } else if (route.name === 'Notification') {
                if(tabSelected === 'Notification'){
                  return <Icon name="ios-notifications" size={25} color="#000000" />
                }else{
                  return <Icon name="ios-notifications-outline" size={25} color="#646464" />
                }
              } else if (route.name === 'Profile') {
                if(tabSelected === 'Profile'){
                  return <FaIcon name="user" size={23} color="#000000" />
                }else{
                  return <FaIcon name="user-o" size={23} color="#646464" />
                }
              }
            },
          })}
        >
          <Tab.Screen 
            name="Home"
            component={HomeStackScreen} 
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                setTabSelected("Home")
              },
            })}
          />
          <Tab.Screen 
            name="Search" 
            component={SearchStackScreen} 
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                setTabSelected("Search")
              },
            })}
          />
          <Tab.Screen 
            name="Notification" 
            component={NotificationStackScreen}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                setTabSelected("Notification")
              },
            })}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileStackScreen}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                setTabSelected("Profile")
              },
            })}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}