import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreenGoogle'
//import HomeScreen from './screens/HomeScreen'
//import ListScreen from './screens/ListScreen'
//import ListScreen2 from './screens/List'
//import ListFirebase from './screens/ListFirebase'
import AsyncStorage from '@react-native-community/async-storage'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,  
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import './firebase/FixTime';
import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';

const Stack = createStackNavigator();

export default function App() {

  const [loggedIn, setloggedIn] = useState(false);
    const [user, setUser] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const {accessToken, idToken} = await GoogleSignin.signIn();
        setloggedIn(true);
  
        const credential = auth.GoogleAuthProvider.credential(
          idToken,
          accessToken,
        );
        await auth().signInWithCredential(credential);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          alert('Cancel');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          alert('Signin in progress');
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          alert('PLAY_SERVICES_NOT_AVAILABLE');
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };
  
  
      function onAuthStateChanged(user) {
      setUser(user);
      console.log(user);
      
      if (user) setloggedIn(true);
    }

    
  
    
  
  useEffect(() => {

    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '354997727389-q3ll1jjquo6eq5t1ab5abgp163mctn0r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'Users List' }}
      />
          <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}
      />
      
      <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      />
        </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
