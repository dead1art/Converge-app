import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Button, Text, TextInput, View, StyleSheet} from 'react-native';
import {  Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import {tabBar} from './src/constants/colors'
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import main from './src/api/main';
import {AuthContext} from './src/context/AuthContext';
import { Provider as EventProvider } from './src/context/eventContext';

// Autentication
import signinScreen from './src/screens/authenctication/SigninScreen';
import registerScreen from './src/screens/authenctication/RegisterScreen';
// Home
import homeScreen from './src/screens/home/homeScreen';
// Search
import searchScreen from './src/screens/search/searchScreen';
import eventScreen from './src/screens/search/eventScreen'
import profileScreen from './src/screens/profile/profileScreen';
// Create
import createScreen from './src/screens/create/createScreen'
import createEvent from './src/screens/create/createEvent';
import createPost from './src/screens/create/createPost';
// Chat
import chatScreen from './src/screens/chat/chatScreen'
import room from './src/screens/chat/room'
import chatStack from './src/screens/chat/chatStack';
// Profile
import userScreen from './src/screens/profile/userScreen';
import editScreen from './src/screens/profile/editScreen'
import inviteScreen from './src/screens/profile/inviteScreen';



  // const AuthContext = React.createContext();

  const login = createStackNavigator(); 

  const user = createStackNavigator();

  const create = createStackNavigator();

  const Tab = createBottomTabNavigator();

  const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
};



  const homeStack = ()=>{
    return (
      <Tab.Navigator
      initialRouteName="home"
      backBehavior="initialRoute"
      tabBarOptions={{  
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
        backgroundColor: "white",
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        borderTopWidth:0,
        elevation:0,
        position: 'absolute',
        height: 60,
        }
        
      }}
      
      >
        <Tab.Screen 
            name="home" 
            component={homeScreen}
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name={focused? "home" : "home-outline"} size={30} color={focused? tabBar.focused : tabBar.notFocused}/>
              )
            }}
        />
        <Tab.Screen 
        name="search" 
        component={searchScreen}
        options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name={focused? "search" : "search-outline"} size={30} color={focused? tabBar.focused : tabBar.notFocused}/>
              )
            }}
        />

        <Tab.Screen 
        name="create" 
        component={createStack}
        options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name="add-circle-sharp" size={34} color={focused? tabBar.focused : tabBar.active}/>
              )
            }}
        />

        <Tab.Screen 
        name="chat" 
        component={chatScreen}
        options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name={focused? "chatbox" : "chatbox-outline"} size={30} color={focused? tabBar.focused : tabBar.notFocused}/>
              )
            }}
        />

        <Tab.Screen 
        name="userStack" 
        component={userStack}
        options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name={focused? "person" : "person-outline"} size={30} color={focused? tabBar.focused : tabBar.notFocused}/>
              )
            }}
        />
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

  const userStack = () => {
    return (
      <user.Navigator initialRouteName="user" screenOptions={{headerShown: false}}>

        <user.Screen 
        name="user"
        component={userScreen}
        />

        {/* <user.Screen 
        name="edit"
        component={editScreen}
        /> */}

      </user.Navigator>
    )
  }

  const createStack = () => {
    return (
      <create.Navigator initialRouteName="createEvent" screenOptions={{headerShown: false}}>

        <create.Screen 
        name="create"
        component={createScreen}
        />

        <create.Screen 
        name="createEvent"
        component={createEvent}
        />

        <create.Screen 
        name="createPost"
        component={createPost}
        />

      </create.Navigator>
    )
  }



const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user:[],
  streamToken:null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        user: action.user,
        streamToken: action.stream
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

  const client_id="7G9ugODJhtBbJee4EURnmJFILJUpAFJ2COPKjqCz";
  const client_secret="z3asQ77QYQRsZkaWYX7R7JpAp0kVPo6ifQeGlQX1mXWaNMrqCfVbsRM4jBN2k2SpiZC28EH2uFGEN9YLNgBB69WA9dpZN3NtBj4pl6fW1ps27VC2glU5Ng9tIysQ7mXv"
  const grant_type="password";

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userresponse;

      try {
        userToken = await AsyncStorage.getItem("token");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContextValue = React.useMemo(
    () => ({
      signinGoogle: async({token})=>{
        try{
          console.log(token);
          const response = await main.post("/api/convert-token/",{ token, backend: "google-oauth2", client_id, client_secret, grant_type: "convert_token" });
          console.log(response);
          await AsyncStorage.setItem("token", response.data.access_token);
          const userresponse = await main.get('/api/profile/', {
            headers: {
              'Authorization': `Bearer ${response.data.access_token}` 
            }         
          });
          await AsyncStorage.setItem("user", response.data.access_token);
          dispatch({type: 'SIGN_IN', token:response.data.access_token, user:userresponse.data})
        }
        catch(err)
        {
          alert("Something went wrong");
          console.log(err);
        }
      },
      signIn: async ({email, password}) => {
        try{
          const username=email;
          console.log(client_id);
          const response = await main.post("/api/token/", { username, password, client_id, client_secret, grant_type });
          console.log( response.data);
          await AsyncStorage.setItem("token", response.data.access_token);
          const userresponse = await main.get('/api/profile/', {
            headers: {
              'Authorization': `Bearer ${response.data.access_token}` 
            }         
          });
          const streamresponse = await main.get('/api/chat/token',{
            headers: {
              'Authorization': `Bearer ${response.data.access_token}` 
            }
          });
          await AsyncStorage.setItem("stream", streamresponse.data.token);
          dispatch({ type: 'SIGN_IN', token:response.data.access_token, user:userresponse.data, stream:streamresponse.data.token });
         }
      catch(err)
        {
          console.log(err);
          alert("Wrong password or email");
         }
        
      },
      register:async({email, password, first_name, last_name})=>{
        try {
          const username=email;
          await main.post("/api/register/", { email, password, first_name, last_name });
          const response = await main.post("/api/token/", { username, password, client_id, client_secret, grant_type });
          console.log( response.data.access);
          await AsyncStorage.setItem("token", response.data.access_token);
          const streamresponse = await main.get('/api/chat/token',{
            headers: {
              'Authorization': `Bearer ${response.data.access_token}` 
            }
          });
          await AsyncStorage.setItem("stream", streamresponse.data.token);
          dispatch({ type: 'SIGN_IN', token:response.data.access_token, stream: streamresponse.data.token});  
        } catch (err) {
            console.log(err);
        }

      },
      signOut: async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("stream");
        dispatch({ type: 'SIGN_OUT'});
      },
    }),
    []
  );

  return (
    <View style={styles.container}> 
          

    <AuthContext.Provider value={{authContextValue,state,dispatch}}>
    <EventProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              <Stack.Screen
              name="signin"
              component={rootStack}
              options={{
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
              />
          ) : (
            <Stack.Screen name="homestack" component={homeStack}
            options={{
 
            }} />
            )
            }
            <Stack.Screen name="event" component={eventScreen}/>
            <Stack.Screen name="edit" component={editScreen}/>
            <Stack.Screen name="profile" component={profileScreen}/>
            <Stack.Screen name="invite" component={inviteScreen}/>
            <Stack.Screen name="room" component={chatStack} />
        </Stack.Navigator>
      </NavigationContainer>
      </EventProvider>
    </AuthContext.Provider>
            </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('screen').height,
  },
})