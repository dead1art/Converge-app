import React,{useContext} from 'react';
import createDataContext from "./createDataContext";
import main from '../api/main';
import {AuthContext} from './AuthContext';
import axios from 'axios';


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
                isEventSubmitted:false,
            };
        case "add_events_success":
            return{
                ...state,
                isEventSubmitted:true,
                submissionError:false
            };
        case "add_events_failure":
            return{
                ...state,
                submissionError:true
            };
        default:
            return state;
    }
}

const addEvent = (dispatch) => async({addr,max_attendees,desc,event_date,image,location,tags,title,token}) => {


    console.log(tags);
    let localUri = image;
    let filename = localUri.split('/').pop();

  // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append('image', { uri: localUri, name: filename, type });
    // formData.append('addr',addr);
    // formData.append('max_attendees',max_attendees);
    // formData.append('desc',desc);
    // formData.append('event_date',event_date);
    // formData.append('location',location);
    // formData.append('tagsData',tagsData);
    // formData.append('title',title);

    console.log(formData);

    console.log(event_date);


    // axios({
    //     method: "post",
    //     url: "https://httpbin.org/post",
    //     data: formData,
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //         'Authorization': `Bearer ${token}`},
    //   })
    //     .then(function (response) {
    //       //handle success
    //       console.log(response);
    //     })
    //     .catch(function (response) {
    //       //handle error
    //       console.log(response);
    
    //     });

        try{
            dispatch({type:"add_event_request"})
            const event_response = await main.post('/api/event/',{addr,max_attendees,desc,event_date,location,tags,title}, {
                headers: {
           'Authorization': `Bearer ${token}` 
           }});
           console.log(event_response.data);

           const path_url = "https://converge-project.herokuapp.com/api/event/"+ event_response.data.id+"/";
           console.log(path_url);

           axios({
            method: "patch",
            url: path_url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
            },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
        
            });
            dispatch({type:"add_events_success"});
        }
        catch(error)
        {
            console.log(error);
            dispatch({type:"add_events_failure"});
        }
        
    
}

export const {Provider, Context } = createDataContext(
    eventReducer,
    {addEvent},
    initialState 
)