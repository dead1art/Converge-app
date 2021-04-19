import signinScreen from './src/screens/SigninScreen';
import registerScreen from './src/screens/RegisterScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import homeScreen from './src/screens/homeScreen';
import settingScreen from './src/screens/settingScreen';
import userScreen from './src/screens/userScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import main from './src/api/main';
import AuthContext from './src/context/AuthContext';




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
      <login.Navigator >
        <login.Screen 
              name="signin" 
              component={signinScreen}
              options={{
                headerShown:false 
              }
              }/>
        <login.Screen 
              name="register" 
              component={registerScreen}
              options={{
                headerShown:false 
              }}/>
      </login.Navigator>
    )
  }




const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
}


function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();


export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContextValue = React.useMemo(
    () => ({
      signIn: async ({email, password}) => {
        try{
          const response = await main.post("/api/token/", { email, password });
          console.log( response.data.access);
          await AsyncStorage.setItem("token", response.data.access);
          dispatch({ type: 'SIGN_IN', token:response.data.access  });
         }
      catch(err)
        {
          console.log(err);
         }
        
      },
      register:async({email, password, first_name, last_name})=>{
        try {
          await main.post("/api/register/", { email, password, first_name, last_name });
          const response = await main.post("/api/token/", { email, password });
          console.log( response.data.access);
          await AsyncStorage.setItem("token", response.data.access);
          dispatch({ type: 'SIGN_IN', token:response.data.access  });  
        } catch (err) {
            console.log(err);
        }

      },
      signOut: async () => {
        await AsyncStorage.removeItem("token");
        dispatch({ type: 'SIGN_OUT'});
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{authContextValue,state}}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="signin"
              component={rootStack}
              options={{
                headerLeft:null,
                headerShown:false,
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            <Stack.Screen name="homestack" component={homeStack}
                options={{
                  title: 'MyScreen',
                  headerLeft:null,
            }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
