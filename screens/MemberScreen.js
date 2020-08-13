import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    TouchableHighlight,
    Button,
    ActivityIndicator, Modal, 
  } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import Axios from 'axios';

  const MemberScreen = props => {
    const [loggedIn, setloggedIn] = useState(false);
    const [user, setUser] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [arrayholder, setArrayholder] = useState([]);
    
    async function fetchData() {
        try{
          const res = await Axios.get(
            `http://apps.airfastindonesia.com/rnim/student/ShowAllSCCList.php`,
          );
          setData(res.data);
          setArrayholder(res.data);
          console.log(res.data);
          console.log(data);
          setLoading(false);
        } catch (error){
          setErrors(error.response.data);
          alert(hasError.toString());
          console.log(error);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

      const renderSeparator = () => {
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
    
      const searchFilterFunction = (text) => {
        setValue(text);
        const newData = arrayholder.filter(item => {
          const itemData = `${item.SCC_ID.toUpperCase()} ${item.Name.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        setData(newData);
      };
  
      const renderHeader = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => searchFilterFunction(text)}
            autoCorrect={false}
            value={value}
          />
        );
      };
  
    return (
        <>
        <View style={{ flex: 1 }}>
  {loading ? <ActivityIndicator /> : (
   <FlatList
     data={data}
     renderItem={({ item }) => (
        <ListItem onPress={() => props.navigation.navigate('DetailsScreen', {item})}
          leftAvatar={{ source: { uri: item.Photo } }}
          title={`${item.SCC_ID} ${item.Nama}`}
          subtitle={item.Chapter}></ListItem>
        
      )}
     keyExtractor={item => item.ID.toString()}
     ItemSeparatorComponent={renderSeparator}
     ListHeaderComponent={renderHeader}
   />
  )}
 </View>
        
        </>
      );

  }

  export default MemberScreen;
  