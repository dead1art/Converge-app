import React,{useContext} from 'react';
import createDataContext from "./createDataContext";
import main from '../api/main';
import {AuthContext} from './AuthContext';
import axios from 'axios';


const initialState = {
    posts:[],
    errorMessage:false,
    isFetching:false,
    isPostSubmitted:false,
    submissionError:false
}

const postReducer = (state, action) =>{
    switch(action.type)
    {
        case "fetch_posts_request":
        return{
            ...state,
            isFetching: true,
            errorMessage:false
        };
        case "fetch_posts_success":
            return{
                ...state,
                events:action.payload,
                errorMessage:false,
                isFetching:false
            };
        case "fetch_posts_failure":
            return{
                ...state,
                errorMessage:true,
                isFetching:false
            };
        case "add_posts_request":
            return{
                ...state,
                submissionError:false,
                isPostSubmitted:false
            };
        case "add_posts_success":
            return{
                ...state,

            };
        case "add_posts_failure":
            return{
                ...state,
            };
        default:
            return state;
    }
}

const addPost = (dispatch) => async({image,caption,tags,token}) => {


    console.log(tags);
    let localUri = image;
    let filename = localUri.split('/').pop();

  // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append('image', { uri: localUri, name: filename, type });
    formData.append('caption', )
    // formData.append('addr',addr);
    // formData.append('max_attendees',max_attendees);
    // formData.append('desc',desc);
    // formData.append('event_date',event_date);
    // formData.append('location',location);
    // formData.append('tagsData',tagsData);
    // formData.append('title',title);

    console.log(formData);

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
            const post_response = await main.post('/api/post/',{image,caption,tags}, {
                headers: {
           'Authorization': `Bearer ${token}` 
           }});
           console.log(post_response.data);

           const path_url = "https://converge-project.herokuapp.com/api/post/"+ post_response.data.id+"/";
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

        }
        catch(error)
        {
            console.log(error);
        }
           
}

export const {Provider, Context } = createDataContext(
    postReducer,
    {addPost},
    initialState
)