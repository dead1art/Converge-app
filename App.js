import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import signinScreen from './src/screens/SigninScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import registerScreen from './src/screens/RegisterScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import homeScreen from './src/screens/homeScreen';
import settingScreen from './src/screens/settingScreen';
import { Provider as AuthProvider } from './src/context/authContext';
import avatarScreen from './src/screens/avatarScreen';
import { navigationRef } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import userScreen from './src/screens/userScreen';

const App = ({navref}) => {

  const login = createStackNavigator(); 

  const Tab = createMaterialBottomTabNavigator();

  const homeStack = ()=>{
    return (
      <Tab.Navigator>
        <Tab.Screen 
            name="home" 
            component={homeScreen}
        />
        <Tab.Screen name="setting" component={settingScreen}/>
        <Tab.Screen name="user" component={userScreen} />
      </Tab.Navigator>
    )
  }

  const rootStack = () => {
    return (
      <login.Navigator>
        <login.Screen 
              name="signin" 
              component={signinScreen}
              options={{
                headerShown:false 
              }
              }/>
        <login.Screen name="register" component={registerScreen}/>
        <login.Screen name="avatar" component={avatarScreen} /> 
      </login.Navigator>
    )
  }

  const main = createStackNavigator();

  const isSignedIn = true;

  return <>
    <NavigationContainer ref={navref}>
      <main.Navigator initialRouteName="ResolveAuth">
        <main.Screen name="ResolveAuth" component={ResolveAuthScreen}/>
        <main.Screen 
            name="login" 
            component={rootStack} 
            options={{
              headerLeft:null,
              headerShown:false,
            }}
          />
        <main.Screen 
            name="homeStack" 
            component={homeStack}
            options={{
              title: 'MyScreen',
              headerLeft:null,
            }} />
      </main.Navigator>
    </NavigationContainer>
  </>
}

export default () => {
  return (
    <AuthProvider>
      <App
        navref={ navigationRef }
      />
    </AuthProvider>
  );
};
