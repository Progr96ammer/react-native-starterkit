import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import home from './views/auth/home';
import login from './views/auth/login';
import signup from './views/auth/signup';
import emailVerifyForm from './views/auth/emailVerifyForm';
import splash from './views/splash';
import loading from './views/loading';

const Drawer = createDrawerNavigator();

class app extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName={'splash'}>
                    <Drawer.Screen name="splash" component={splash} />
                    <Drawer.Screen name="loading" component={loading} />
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
