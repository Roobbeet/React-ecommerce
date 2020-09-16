/*
Function get 2 property --> state (previous state), and action. Action is object that contains:
1. type: string value --> specify which action
2. payload (optional): transformation, versatile object

*/
import UserActionTypes from './user.types'
const INITIAL_STATE = { //object that represents initial state. exact same kaya initial state di component
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) { //bisa pake if else juga --> mirip kaya if action.type === '', then .... --> its kinda footswitch i guess
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null, //in case abis gagal dia berhasil (retry)
            }; //for identical return for more than 1 cases
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
            }
        case UserActionTypes.SIGN_IN_FAILURE: 
        case UserActionTypes.SIGN_OUT_FAILURE: 
            return {
                ...state,
                error: action.payload,
            }; 
        default:
            return state;
    }
}

export default userReducer;