import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import UserSettings from '../screens/UserSettings';
import CarsScreen from '../screens/CarsScreen';
import SearchScreen from '../screens/SearchScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const homeName = 'Home';
const userSettings = 'Settings';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const SearchStack = () => (
  <Stack.Navigator initialRouteName='Main'>
    <Stack.Screen name="Search" component={SearchScreen} options={ {headerShown: false}} />
    <Stack.Screen name="Cars" component={CarsScreen} options={{headerShown: true, headerTitle: 'Wyszukiwane pojazdy'}} />
  </Stack.Navigator>
);

const MainTab = () => (
    <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={ ({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if(rn === homeName) {
                    iconName = focused ? 'home' : 'home-outline'
                } else if(rn === userSettings) {
                    iconName = focused ? 'settings' : 'settings-outline'
                }

                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { paddingBottom: 10 },
            tabBarStyle: { padding: 10, height: 100, backgroundColor: '#fff'},
        })}
    >
    <Tab.Screen name={homeName} component={SearchStack} options={{headerTitleAlign: 'center', headerTitle: 'MOTOMANIA',}}/>
    <Tab.Screen name={userSettings} component={UserSettings} />
  </Tab.Navigator>
);

const MainContainer = () => {
    return(
        <NavigationContainer>
            <MainTab />
        </NavigationContainer>
    )
}

export default MainContainer;


