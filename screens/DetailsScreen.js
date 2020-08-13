import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from '../components/Loader';

export default function DetailsScreen({ route, navigation }){
    const { itemId } = route.params;
    
    const { name }  = route.params;
    const { chapter }  = route.params;
    return(
      <>
      <View style={{ alignItems: 'center', backgroundColor: 'black' }}>
              <Image
                source={require('../assets/silver-community.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
      <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
       
        <Text>SCC Id: {JSON.stringify(itemId)}</Text>
        <Text>Name: {JSON.stringify(name)}</Text>
        <Text>Chapter: {JSON.stringify(chapter)}</Text>
        
        <Text></Text>
        
        <Button 
        title="Go to Home"
        onPress={()=>navigation.navigate('ListScreen')}></Button>
  
        <Button 
        title="Go to Profile"
        onPress={()=>navigation.navigate('SettingsScreen')}></Button>
  
        <Button 
        title="Go Back"
        onPress={()=>navigation.goBack()}></Button>
  
  
      </View>
      </>
      );
    }
  
    