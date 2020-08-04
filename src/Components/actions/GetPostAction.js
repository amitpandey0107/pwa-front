import {} from '../constants/reduxConstants';
import axios from 'axios';
import { api_live_url as API_URL, api_base_url_local as LOCAL_URL } from '../../app.json';
import { GET_POST_LOADING, GET_POST_FAIL, GET_POST_SUCCEED,  } from '../constants/reduxConstants';
import { AsyncStorage } from 'AsyncStorage';



const apiLoading = () => ({
    type:GET_POST_LOADING
});

const apiSucceed = payload => ({
    type:GET_POST_SUCCEED,
    payload,
});

const apiError = (payload) => ({
    type:GET_POST_FAIL,
    payload
});



export const GetPostAction = () => async (dispatchEvent) => {       
    dispatchEvent(apiLoading());   
    var bodyFormData = new FormData();
    // bodyFormData.append('user_id', id);  
    AsyncStorage.getItem('Token').then((token) => {        
        try {
            console.log(token)
            axios({
                method: 'get',
                url: API_URL + "getallpost",
                headers: {
                    "Access-Control-Allow-Origin":  "*",                   
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'                
                }
            }).then((response) => {
                console.log('ACTION=>', response)
                if (response.data.status_code === 200) {
                    dispatchEvent(apiSucceed(response));
                } else {
                    dispatchEvent(apiError(response));
                }
            }).catch((error) => {
                console.log('ACTION ERROR=>', error)
                dispatchEvent(apiError(error));

            })

        } catch (error) {
            console.log('error received on assign consultant action page')
            dispatchEvent(apiError(error));
        }

    })
};
