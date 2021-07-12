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
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

// Autentication
import signinScreen from './src/screens/authenctication/SigninScreen';
import registerScreen from './src/screens/authenctication/RegisterScreen';
import otpScreen from './src/screens/authenctication/otpScreen';
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
import notificationScreen from './src/screens/chat/notificationScreen'
import room from './src/screens/chat/room'
import chatStack from './src/screens/chat/chatStack';
// Profile
import userScreen from './src/screens/profile/userScreen';
import editScreen from './src/screens/profile/editScreen'
import inviteScreen from './src/screens/profile/inviteScreen';
import ChannelListScreen from './src/screens/chat/ChannelListScreen';
import recommendedScreen from './src/screens/search/recommendedScreen';




  // const AuthContext = React.createContext();

  const login = createStackNavigator(); 

  const reg = createStackNavigator();

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
        component={notificationScreen}
        options={{
              tabBarIcon: ({focused}) => (
                <Ionicons name={focused? "notifications" : "notifications-outline"} size={30} color={focused? tabBar.focused : tabBar.notFocused}/>
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

  const registerStack = () =>{
    return (
      <reg.Navigator initialRouteName="register">
      <reg.Screen 
        name= "register"
        component={registerScreen}
        options={{
          headerShown:false 
        }}
      />
      <reg.Screen 
        name="otp"
        component={otpScreen}
        options={{
          headerShown:false 
        }}
      />
      </reg.Navigator>
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
              name="registerStack" 
              component={registerStack}
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
      <create.Navigator initialRouteName="create" screenOptions={{headerShown: false}}>

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
  user: [],
  isLoading: true,
  isSignout: false,
  userToken: null,
  streamToken:null,
  registerEmail:null,
  haserror:false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        streamToken:action.stream,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        streamToken: action.stream,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
        streamToken: null
      };
    case 'REGISTER':
      return {
        ...state,
        registerEmail:action.email,
        haserror:false,
      };
    case 'Error':
      return {
        ...state,
        haserror:true,
      }

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
      let streamToken;

      try {
        userToken = await AsyncStorage.getItem("token");
        streamToken = await AsyncStorage.getItem("stream");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, stream: streamToken});
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
          dispatch({type: 'SIGN_IN', token:response.data.access_token, userid:userresponse.data.id})
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
          const streamresponse = await main.get('/api/chat/token',{
            headers: {
              'Authorization': `Bearer ${response.data.access_token}` 
            }
          });
          await AsyncStorage.setItem("stream", streamresponse.data.token);
          const userResponse = await main.get('/api/profile/', {
            headers: {
              'Authorization': `Bearer ${response.data.access_token}` 
            }         
          })
          dispatch({ type: 'SIGN_IN', token:response.data.access_token, stream:streamresponse.data.token, user: userResponse.data });
         }
      catch(err)
        {
          console.log(err);
          showMessage({
                          message:"Invalid Credentials!" ,
                          type:"danger",
                          floating: true,
                          duration:5000,
                          icon: {icon:"danger" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                          
                        }); 
         }
        
      },
      register:async({email, password, first_name, last_name})=>{
        try {
          const response = await main.post("/api/register/", { email, password, first_name, last_name });
          dispatch({ type: 'REGISTER', email:response.data.email });
        } catch (error) {
            console.log(error);
            showMessage({
                          message:"Error creating your account!" ,
                          type:"danger",
                          floating: true,
                          duration:5000,
                          icon: {icon:"danger" , position: "left"},
                          style: {paddingVertical: 20, paddingHorizontal:20}                   
                        });  
            dispatch({type:'Error', })
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
            <Stack.Screen name="recommend" component={recommendedScreen}/>
            <Stack.Screen name="edit" component={editScreen}/>
            <Stack.Screen name="profile" component={profileScreen}/>
            <Stack.Screen name="invite" component={inviteScreen}/>
            <Stack.Screen name="room" component={chatStack} />
        </Stack.Navigator>
      </NavigationContainer>
      </EventProvider>
    </AuthContext.Provider>

            <FlashMessage position="top" />
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