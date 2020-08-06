import { RESET_STATE_SUCCEED, } from '../constants/reduxConstants';

const apiSucceed = payload => ({
    type: RESET_STATE_SUCCEED,
    payload,
});


export const ResetStateAction = () => async (dispatchEvent) => {
    dispatchEvent(apiSucceed('reset action dispatched from action screen'));
};
