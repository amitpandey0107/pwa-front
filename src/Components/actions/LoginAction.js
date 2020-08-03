import axios from 'axios';
import { api_live_url as API_URL, api_base_url_local as LOCAL_URL } from '../../app.json';
import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_RELOADING, AUTH_LOADING, AUTH_FAIL, AUTH_SUCCEED, AUTH_RELOAD } from '../constants/reduxConstants';
import { AsyncStorage } from 'AsyncStorage';



const apiLoading = () => ({
    type: LOGIN_LOADING
});

const apiSucceed = payload => ({
    type: LOGIN_SUCCESS,
    payload,
});

const apiError = (payload) => ({
    type: LOGIN_ERROR,
    payload
});

const authExpire = () => ({
    type: 'AUTH_EXPIRE',

});

const authLoading = () => ({
    type: AUTH_LOADING
});

const authSucceed = payload => ({
    type: AUTH_SUCCEED,
    payload,
});

const authError = (payload) => ({
    type: AUTH_FAIL,
    payload
});





export const LoginAction = (username, password) => async (dispatchEvent) => {
    console.log(username, password);
    dispatchEvent(apiLoading());
    try {

        axios.post(LOCAL_URL + "login",
            {
                headers: {
                    'Access-Control-Allow-Origin': true,
                },
                email: username,
                password: password,
            }).then((response) => {
                if (response.data.status_code === 200) {
                    dispatchEvent(apiSucceed(response));
                } else {
                    dispatchEvent(apiError(response));
                }
            }).catch((error) => {
                console.log('Error in login', error)
                dispatchEvent(apiError(error));
            })



    } catch (error) {
        console.log('error received on project list action page')
        dispatchEvent(apiError(error));
    }
};


export const auth_action = () => async (dispatchEvent) => {
    dispatchEvent(authLoading());
    try {
        var userToken = await localStorage.getItem('Token');
        var UserId = await localStorage.getItem('UserId');
        var userRole = await localStorage.getItem('role');
        // var userToken = await localStorage.getItem('Token');
        // var UserId = await localStorage.getItem('UserId');
        // var userRole = await localStorage.getItem('role');
        if (userRole === null) {
            console.log('userRole null', userRole);
            dispatchEvent(authError({ error: "Please login", message: "please login" }));
        } else {
            console.log('userRole success', userRole);
            dispatchEvent(authSucceed({ userToken: userToken, userRole: userRole, UserId: UserId, message: "Success" }));
        }
    } catch (error) {
        console.log('error received auth action = ', error)
        dispatchEvent(authError(error));
    }
};