import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import Home from '../screens/Home/index';
import Form from '../screens/Form/index';
import Lista from '../screens/List/index';

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home' 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Lista" component={Lista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}