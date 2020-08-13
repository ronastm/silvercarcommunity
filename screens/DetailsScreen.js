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
  ScrollView, Button
} from 'react-native';
import Loader from '../components/Loader';

const DetailsScreen = props => {
    const {item} = props.navigation.state.params;
    console.log(item, item.Name, item.SCC_ID);  
  
      return (
        <View style={styles.modal}>
             <View style={styles.modalColumn}>
                
                  <View style={styles.modalRow}>
                      <Image
                      style={{ width: 100, height: 100, alignSelf: 'center', alignItems: 'center', marginTop: 24, marginBottom: 24 }}
                      source={{ uri: item.Photo }}
                      ></Image>
                      
                  </View>
                  <View style={styles.modalRow}>
                      <Text style={styles.rowText}>ID: </Text>
                      <Text style={styles.rowText}>{item.SCC_ID} </Text>
                  </View>

                  <View style={styles.modalRow}>
                      <Text style={styles.rowText}>Name: </Text>
                      <Text style={styles.rowText}>{item.Nama} </Text>
                  </View>

                  <View style={styles.modalRow}>
                      <Text style={styles.rowText}>Chapter: </Text>
                      <Text style={styles.rowText}>{item.Chapter}</Text>

                  </View>

                  <View style={styles.modalRow}>
                        <Text style={styles.rowText}>City: </Text>
                      <Text style={styles.rowText}>{item.Kota} </Text>
                  </View>
                  <View style={styles.modalRow}>
                        <Text style={styles.rowText}> </Text>
                      <Text style={styles.rowText}> </Text>
                  </View>

                  <Button style={styles.modalCloseButton} title="Close"
                                color="black"
                                onPress={() => props.navigation.navigate('MemberScreen')}>
                            </Button>

              </View>
          </View>
    
      );
  
         
}


const styles = StyleSheet.create({

  modal: {
     backgroundColor: 'white',
     marginTop: 10,
     paddingLeft: 50,
     paddingRight: 50,
     marginBottom: 10
 },
 row: {
     flexDirection: 'row',
     justifyContent: 'center',
     padding: 10,
     backgroundColor: '#F6F6F6',

 },
 rowText: {
     flex: 1, 
     justifyContent: 'center',
      fontSize: 14

 },

 modalRow: {
             flexDirection: 'row',

     marginTop: 10,
     borderBottomWidth: 1,
     justifyContent: 'center'
     
 },
 modalCloseButton: {
  backgroundColor: '#aaa9ad',
  borderWidth: 0,
  color: 'black',
  borderColor: '#aaa9ad',
  height: 40,
  alignItems: 'center',
  borderRadius: 30,
  marginLeft: 35,
  marginRight: 35,
  marginTop: 100,
  marginBottom: 20,
 },

});

export default DetailsScreen;