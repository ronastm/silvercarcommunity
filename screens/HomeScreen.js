import React, {useState, useEffect} from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import SearchableFlatList from '../src/SearchableList';

export default function HomeScreen(props) {
    
    return (
    <>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SearchableFlatList />
    </SafeAreaView>
    </>
  );
}