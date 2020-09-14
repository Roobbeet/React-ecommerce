import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
 collections: null,
 isFetching: false,
 errorMessage: undefined,

}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFecthing: true,
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS: //ngegantiin update collections
                return {
                    ...state,
                    collections: action.payload,
                    isFecthing: false,
                }
        // case ShopActionTypes.UPDATE_COLLECTIONS:
        //     return {
        //         ...state,
        //         collections: action.payload,
        //     }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFecthing: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}

export default shopReducer;