import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UserSettings from './screens/UserSettings';
import CustomSelectCheckboxPicker from './components/CustomSelectCheckboxPicker';

import { useState } from 'react';
import MainScreen from './screens/MainScreen';

export default function App() {

  return (
    <View style={styles.container}>
      { /*<CustomSelectCheckboxPicker checkboxList={carBrandList} updateBrandList={updateBrandList}/>*/ }
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
