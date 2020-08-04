import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import LoginReducer from '../reducers/LoginReducer';
import AuthReducer from '../reducers/AuthReducer';
import RegisterReducer from '../reducers/RegisterReducer';
import GetPostReducer from '../reducers/GetPostReducer';

const rootReducer = combineReducers({
    LoginReducer: LoginReducer,   
    AuthReducer: AuthReducer,   
    RegisterReducer: RegisterReducer,   
    GetPostReducer: GetPostReducer,   
})
const appReducer = {

}
export const store = createStore(rootReducer, appReducer, applyMiddleware(thunk))