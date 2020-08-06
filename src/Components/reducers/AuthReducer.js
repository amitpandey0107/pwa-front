import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../constants/misc';
import { AUTH_LOADING, AUTH_FAIL, AUTH_SUCCEED, AUTH_RELOAD } from '../constants/reduxConstants';

export default function AuthReducer(state = {}, action) {
  switch (action.type) {

    case AUTH_FAIL:
      return Object.assign({}, state, { status: ERROR, error: action.payload, });

    case 'AUTH_EXPIRE':
      return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

    case AUTH_LOADING:
      return Object.assign({}, state, { status: LOADING });

    case AUTH_SUCCEED:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });

    case AUTH_RELOAD:
      return Object.assign({}, state, { status: RELOADING, value: action.payload });

    default:
      return Object.assign({}, state, { status: NONE });
  }
}