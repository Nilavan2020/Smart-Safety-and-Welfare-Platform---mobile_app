import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SafetyScreen from './src/screens/SafetyScreen';
import MissingPersonScreen from './src/screens/MissingPersonScreen';
import ComplaintScreen from './src/screens/ComplaintScreen';
import DisasterScreen from './src/screens/DisasterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Smart City App' }} />
        <Stack.Screen name="Safety" component={SafetyScreen} options={{ title: 'Women\'s Safety' }} />
        <Stack.Screen name="MissingPerson" component={MissingPersonScreen} options={{ title: 'Missing Person' }} />
        <Stack.Screen name="Complaint" component={ComplaintScreen} options={{ title: 'Complaints' }} />
        <Stack.Screen name="Disaster" component={DisasterScreen} options={{ title: 'Disaster Relief' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
