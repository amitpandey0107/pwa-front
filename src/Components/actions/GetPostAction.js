import {} from '../constants/reduxConstants';
import axios from 'axios';
import { api_live_url as API_URL} from '../../app.json';
import { GET_POST_LOADING, GET_POST_FAIL, GET_POST_SUCCEED,  } from '../constants/reduxConstants';



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
    let token  = localStorage.getItem('Token');       
        try {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const method = 'get';
            const url = API_URL + "getallpost";
            axios({
                mode: 'no-cors',
                method,
                url: proxyurl + url,
                headers: {                                    
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded'                
                }
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
            console.log('error received on assign consultant action page')
            dispatchEvent(apiError(error));
        }

    // })
};
