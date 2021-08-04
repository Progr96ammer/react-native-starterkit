import * as React from 'react';
import {StatusBar} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import home from './views/auth/home';
import login from './views/auth/login';
import signup from './views/auth/signup';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="login">
          <Drawer.Screen name="home" component={home} />
            <Drawer.Screen name="login" component={login} />
            <Drawer.Screen name="signup" component={signup} />
        </Drawer.Navigator>
      </NavigationContainer>
  );
}
