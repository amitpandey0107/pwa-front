import { LOADING, SUCCESS, ERROR, RELOADING, NONE } from '../constants/misc';
import { GET_POST_LOADING, GET_POST_FAIL, GET_POST_SUCCEED,GET_POST_RELOAD} from '../constants/reduxConstants';

export default function GetPostReducer(state = {}, action) {

  switch (action.type) {

    case GET_POST_FAIL:
      return Object.assign({}, state, { status: ERROR, error: action.payload, });

    case 'AUTH_EXPIRE':
      return Object.assign({}, state, { status: 'AUTH_EXPIRE', value: 'AUTH_EXPIRE', });

    case GET_POST_LOADING:
      return Object.assign({}, state, { status: LOADING });

    case GET_POST_SUCCEED:
      return Object.assign({}, state, { status: SUCCESS, value: action.payload });

    case GET_POST_RELOAD:
      return Object.assign({}, state, { status: RELOADING, value: action.payload });

    default:
      return Object.assign({}, state, { status: NONE });
  }
}