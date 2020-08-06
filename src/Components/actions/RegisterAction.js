import {} from '../constants/reduxConstants';
import axios from 'axios';
import { api_live_url as API_URL } from '../../app.json';
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
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const method = 'post';
        const url = API_URL + "userregistration";
        var _data = {
                firstname: firstname,
                lastname: lastname,                
                email: email,
                gender: gender,
                date_of_birth: date_of_birth,
                password: password,
        }
        axios({
            method,
            url: proxyurl + url,
            data: _data,
            mode: 'no-cors', // no-cors, cors, *same-origin
        }).then((response) => {          
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
