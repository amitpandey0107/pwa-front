import {} from '../constants/reduxConstants';
import axios from 'axios';
import { api_live_url as API_URL, api_base_url_local as LOCAL_URL } from '../../app.json';
import { REGISTER_LOADING, REGISTER_ERROR, REGISTER_SUCCESS } from '../constants/reduxConstants';


const apiLoading = () => ({
    type: REGISTER_LOADING
});

const apiSucceed = payload => ({
    type: REGISTER_SUCCESS,
    payload,
});

const apiError = (payload) => ({
    type: REGISTER_ERROR,
    payload
});



export const RegisterAction = (firstname, lastname, email, gender, date_of_birth, password, ) => async (dispatchEvent) => {   
    dispatchEvent(apiLoading());
    try {
        axios.post(API_URL + "userregistration",
            {
                firstname: firstname,
                lastname: lastname,                
                email: email,
                gender: gender,
                date_of_birth: date_of_birth,
                password: password,
            }
        ).then((response) => {          
            if (response.data.status_code === 200) {
                dispatchEvent(apiSucceed(response));
            } else {
                dispatchEvent(apiError(response));
            }
        }).catch((error) => {           
            dispatchEvent(apiError(error));
        })

    } catch (error) {
        console.log('error received on register action page')
        dispatchEvent(apiError(error));
    }
};
