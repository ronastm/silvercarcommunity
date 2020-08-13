import React from 'react';

//Import all required component
import { View, Text } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
      <Text style={{ fontSize: 23, marginTop: 10 }}>Silvercar Community </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Member Search
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>by Ronas SCC 0044</Text>
    </View>
  );
};
export default SettingsScreen;