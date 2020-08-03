import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../constants/misc';
import { REGISTER_LOADING, REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_RELOADING } from '../constants/reduxConstants';

export default function RegisterReducer(state = {}, action) {

  switch (action.type) {

    case REGISTER_ERROR:
      return Object.assign({}, state, { status: ERROR, error: action.payload, });

    case 'AUTH_EXPIRE':
      return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

    case REGISTER_LOADING:
      return Object.assign({}, state, { status: LOADING });

    case REGISTER_SUCCESS:

      return Object.assign({}, state, { status: SUCCESS, value: action.payload });

    case REGISTER_RELOADING:
      return Object.assign({}, state, { status: RELOADING, value: action.payload });

    default:
      // return state;
      return Object.assign({}, state, { status: NONE });
  }
}