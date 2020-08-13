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
  } from 'react-native';
  import AsyncStorage from '@react-native-community/async-storage';
  import Loader from '../components/Loader';

  const MemberScreen = props => {
    return (
        <View style={{ flex: 1 }}>
             <Text>ID: </Text>
             <Text
             
              onPress={() => props.navigation.navigate('LoginScreen')}>
              Login Screen
            </Text>
    
        </View>
      );

  }

  export default MemberScreen;
  