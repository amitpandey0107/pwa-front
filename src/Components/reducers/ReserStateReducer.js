
import { RESET_STATE_FAIL, RESET_STATE_LOADING, RESET_STATE_RELOAD, RESET_STATE_SUCCEED, } from '../constants/reduxConstants';
import { SUCCESS, ERROR, LOADING, RELOADING, NONE } from '../constants/misc';



export default function ResetStateReducer(state = {}, action) {
    switch (action.type) {

        case RESET_STATE_FAIL:
            return Object.assign({}, state, { status: ERROR, value: action.payload, });

        case RESET_STATE_LOADING:
            return Object.assign({}, state, { status: LOADING });

        case RESET_STATE_SUCCEED:
            return Object.assign({}, state, { status: SUCCESS, value: action.payload });

        case RESET_STATE_RELOAD:
            return Object.assign({}, state, { status: RELOADING, value: action.payload });

        default:
            return Object.assign({}, state, { status: NONE });
    }
}