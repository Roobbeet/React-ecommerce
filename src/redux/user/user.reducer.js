/*
Function get 2 property --> state (previous state), and action. Action is object that contains:
1. type: string value --> specify which action
2. payload (optional): transformation, versatile object

*/
import {UserActionTypes} from './user.types'
const INITIAL_STATE = { //object that represents initial state. exact same kaya initial state di component
    currentUser: null,

}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) { //bisa pake if else juga --> mirip kaya if action.type === '', then .... --> its kinda footswitch i guess
        case UserActionTypes.SET_CURRENT_USER: 
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;