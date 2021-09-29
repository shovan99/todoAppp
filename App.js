import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';


import Home from "./Screens/Home"
import Edit from "./Screens/Edit"
import Add from "./Screens/Add"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerStyle: {
              backgroundColor: "#0f4c7f"
            },
            title: "Todo List",
            headerTitleStyle: {
              textAlign: "center",
              color: "#00b7c2"
            } }}/>


            <Stack.Screen name="Edit" component={Edit} options={{ headerStyle: {
              backgroundColor: "#0f4c7f"
            },
            title: "Todo List",
            headerTitleStyle: {
              textAlign: "center",
              color: "#00b7c2"
            } }}/>


            <Stack.Screen name="Add" component={Add} options={{ headerStyle: {
              backgroundColor: "#0f4c7f"
            },
            title: "Todo List",
            headerTitleStyle: {
              textAlign: "center",
              color: "#00b7c2"
            } }}/>
        </Stack.Navigator>
    </NavigationContainer>
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
