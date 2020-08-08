import React from 'react';
//import React, { Fragment } from 'react';
import { SafeAreaView } from 'react-native';
//import LoginController from './LoginController';
import SearchableFlatList from './src/SearchableList';
// const App = () => {return (
// <LoginController/> 
// );};
const App = () => (
     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <SearchableFlatList />
  </SafeAreaView>
  );
export default App;