import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Movie from './src/screens/Movie';
import Person from './src/screens/Person';
import Search from './src/screens/Search';

export type RootStackParams = {
  Home: undefined
  Movie: undefined
  Person: undefined
  Search: undefined
}

const RootStack = createNativeStackNavigator<RootStackParams>();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName='Home' >
          <RootStack.Screen name='Home' component={Home} />
          <RootStack.Screen name='Movie' component={Movie} />
          <RootStack.Screen name='Person' component={Person} />
          <RootStack.Screen name='Search' component={Search} />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

