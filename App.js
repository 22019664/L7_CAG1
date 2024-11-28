import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import Add from './Add';
import Summary from './Summary';
import Edit from "./Edit";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Task List">
          <Stack.Screen name="Task List" component={Home} />
          <Stack.Screen name="Add" component={Add} />
          <Stack.Screen name="Edit" component={Edit} />
          <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
