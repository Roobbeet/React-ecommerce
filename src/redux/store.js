import { createStore, applyMiddleware} from 'redux'; //middleware to catch and write the action
import {persistStore} from 'redux-persist'
import logger from 'redux-logger'; //redux-logger adalah middleware tersebut

import rootReducer from './root-reducer'; //store ngambil dari root reducer sesuai flow. array is expected

const middlewares = [logger]; //isi array bisa ditambah kalo butuh

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//create and export our store from rootReducer function

export const persistor = persistStore(store);

export default {store, persistor}; 