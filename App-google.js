import React, {useState, useEffect} from 'react';
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import './firebase/FixTime'
export default () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [hasError, setErrors] = useState(false);

  
  
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
    //fetchData();
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '354997727389-q3ll1jjquo6eq5t1ab5abgp163mctn0r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  gotoPage = () => {
    this.props.navigation.navigate("Searchable");
        };
  
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      setloggedIn(false);
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <View style={{flexDirection: 'row', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            <Image
              source={require('./assets/silver-community.png')}
              resizeMode="contain"
              style={{ width: 214 }}
             />
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {!loggedIn && (
                <GoogleSigninButton
                  style={{width: 192, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}
                />
              )}
             
            </View>
            {user && (
             
               
            <View style={styles.buttonContainer}>
            {!user && <Text>You are currently logged out</Text>}
             
                <View style={{width: '100%'}}>
                  
                  <Text>Welcome {user.displayName}</Text>
                  <Image
                    style={{ width: 100, height: 100, alignSelf: 'center', alignItems: 'center', marginTop: 24, marginBottom: 24 }}
                    source={{ uri: user.photoURL }}
                  />
                    
                      <Button
                    onPress={this.signOut}
                    title="LogOut"
                    color="red"></Button>
                     
                </View>      
              
            </View>
            
            )}
          </View>
          
                    
          
         
      </SafeAreaView>
      
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ebebeb'
	}
});