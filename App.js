import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import home from './views/auth/home';
import login from './views/auth/login';
import signup from './views/auth/signup';
import emailVerifyForm from './views/auth/emailVerifyForm';

const Drawer = createDrawerNavigator();

class app extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName={'login'}>
                    <Drawer.Screen name="home" component={home} />
                    <Drawer.Screen name="emailVerifyForm" component={emailVerifyForm} />
                    <Drawer.Screen name="login" component={login} />
                    <Drawer.Screen name="signup" component={signup} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

export default app;
