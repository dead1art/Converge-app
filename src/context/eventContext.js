import React,{useContext} from 'react';
import createDataContext from "./createDataContext";
import main from '../api/main';
import {AuthContext} from './AuthContext';


const initialState = {
    events:[],
    errorMessage:false,
    isFetching:false,
    isEventSubmitted:false,
    submissionError:false
}

const eventReducer = (state, action) =>{
    switch(action.type)
    {
        case "fetch_events_request":
        return{
            ...state,
            isFetching: true,
            errorMessage:false
        };
        case "fetch_events_success":
            return{
                ...state,
                events:action.payload,
                errorMessage:false,
                isFetching:false
            };
        case "fetch_events_failure":
            return{
                ...state,
                errorMessage:true,
                isFetching:false
            };
        case "add_event_request":
            return{
                ...state,
                submissionError:false,
                isEventSubmitted:false
            };
        case "add_events_success":
            return{
                ...state,

            };
        case "add_events_failure":
            return{
                ...state,
            };
        default:
            return state;
    }
}

const addSong = (dispatch) => async({}) => {

}

export const {Provider, Context } = createDataContext(
    eventReducer,
    {addSong},
    initialState
)