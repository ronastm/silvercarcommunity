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
  ActivityIndicator
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
import './firebase/FixTime';
import { ListItem, SearchBar } from 'react-native-elements';
import Axios from 'axios';
//import SearchableFlatList from './src/SearchableList';
// constructor(props) {
//   super(props);

//   this.state = {
//     loading: false,
//     data: [],
//     error: null,
//   };

//   this.arrayholder = [];
// }
export default () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  var arrayholder = [];
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
  
  async function fetchData() {
    try{
      const res = await Axios.get(
        `http://apps.airfastindonesia.com/rnim/student/ShowAllSCCList.php`,
      );
      setData(res.data);
      console.log(res.data);
      console.log(data);
      setLoading(false);
    } catch (error){
      setErrors(error.response.data);
      alert(hasError.toString());
      console.log(error);
    }
  }

  makeRemoteRequest = () => {
    //const url = `https://randomuser.me/api/?&results=20`;
    const url = `http://apps.airfastindonesia.com/rnim/student/ShowAllSCCList.php`;
    //this.setState({ loading: true });
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(res => {
        // this.setState({
        //   data: res,
        //   error: res.error || null,
        //   loading: false,
        // });
        setData(res);
        setLoading(false);
        setError(res.error || null);
        this.arrayholder = res;
        console.log(res);
        console.log(data);
        console.log(error);
      })
      .catch(err => {
        // this.setState({ error, loading: false });
        setError(err);
        setLoading(false);
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    // this.setState({
    //   value: text,
    // });
    setValue(text);

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.SCC_ID.toUpperCase()} ${item.Name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    // this.setState({
    //   data: newData,
    // });
    setData(newData);
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={value}
      />
    );
  };

  useEffect(() => {
    //this.makeRemoteRequest();
    //fetchData();
    Axios.get(`http://apps.airfastindonesia.com/rnim/student/ShowAllSCCList.php`)
      .then(({data}) => setData({data}))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
      console.log(data);
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '354997727389-q3ll1jjquo6eq5t1ab5abgp163mctn0r.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    
  }, []);

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
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }
  return (
    <>
      <StatusBar barStyle="dark-content" />  
      <SafeAreaView>
      {user && (
 <>
  <View style={{width: '100%'}}>
                  
                  <Text>Welcome {user.displayName}</Text>
                 
                  <Text>{data.SCC_ID}</Text>
                  <Text>{loading}</Text>
                      <Button
                    onPress={this.signOut}
                    title="LogOut"
                    color="red"></Button>
                     
                </View>     
  <View style={{ flex: 1 }}>
  {loading ? <ActivityIndicator /> : (
   <FlatList
     data={data}
     renderItem={({ item }) => (
        <ListItem
          leftAvatar={{ source: { uri: item.Photo } }}
          title={`${item.SCC_ID} ${item.Nama}`}
          subtitle={item.Chapter}></ListItem>
        
      )}
     keyExtractor={item => item.ID.toString()}
     ItemSeparatorComponent={this.renderSeparator}
    
   />
  )}
 </View>
   </>  
      )}
      {!loggedIn && (
          <>       
          <View style={{flexDirection: 'row', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            <Image
              source={require('./assets/silver-community.png')}
              resizeMode="contain"
              style={{ width: 214 }}
             ></Image>
          </View>
     
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              
                <GoogleSigninButton
                  style={{width: 192, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this._signIn}>
                </GoogleSigninButton>
             
             
            </View> 
            
            
          </View>
          </>
      
          )} 
                       
          
           </SafeAreaView>
    
            
        
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
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
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'black',
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