import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from "./createDataContext";
import main from '../api/main';
import { navigate } from '../navigationRef';

const authReducer = (state, action)  => {
    switch(action.type){
        case "register":
            return {...state};
        case "signin":
            return {token: action.payload};
        case "signout":
            return { token:null }
        default:
            return state;
    }
};

const register = (dispatch) => async ({ email, password, first_name, last_name }) => {
    try {
      const response = await main.post("/api/register/", { email, password, first_name, last_name });
      console.log( response.data);
        navigate("avatar");
    } catch (err) {
        console.log(err);
    }
  };


const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("homeStack");
    } else {
      navigate("login");
    }
  };


const signin = (dispatch) => async ({email, password}) =>{
    try{
        const response = await main.post("/api/token/", { email, password });
        console.log( response.data.access);
        await AsyncStorage.setItem("token", response.data.access);
        dispatch({type:"signin",payload: response.data.access });
        navigate("homeStack");
    }
    catch(err)
    {
        console.log(err);
    }
}

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("login");
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, register, tryLocalSignin, signout },
    { token: null}
  );
  