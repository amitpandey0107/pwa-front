import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../constants/misc';
import { LOGIN_LOADING,LOGIN_ERROR,LOGIN_SUCCESS,LOGIN_RELOADING} from '../constants/reduxConstants';

export default function LoginReducer(state = {}, action) {

  switch (action.type) {

    case LOGIN_ERROR:
      return Object.assign({}, state, { status: ERROR, error: action.payload, });

    case 'AUTH_EXPIRE':
      return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

    case LOGIN_LOADING:
      return Object.assign({}, state, { status: LOADING });

    case LOGIN_SUCCESS:
    
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });

    case LOGIN_RELOADING:
      return Object.assign({}, state, { status: RELOADING, value: action.payload });

    default:
      // return state;
      return Object.assign({}, state, { status: NONE });
  }
}