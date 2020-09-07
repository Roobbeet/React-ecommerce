//base reducer represent all state. All reducer will going into this reducer

import userReducer from '../redux/user/user.reducer';
import cartReducer from '../redux/cart/cart.reducer';
import directoryReducer from '../redux/directory/directory.reducer';
import shopReducer from '../redux/shop/shop.reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import { combineReducers } from 'redux'; //to combine all

const persistConfig = {
    key: 'root', 
    storage, //storage yg mau kita pake
    whitelist: ['cart'] //key apa yg mau kita store di persist --> refer di combineReducers
}
const rootReducer = combineReducers({
    user: userReducer, //ngasitau ke combineReducer kalo userReducer dipake untuk user
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer,
});


export default persistReducer(persistConfig, rootReducer);

/*
konsep redux:
1. reducer buat transform perubahan state ke state
2. store buat nyimpen
*/