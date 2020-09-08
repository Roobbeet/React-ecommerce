import { createStore, applyMiddleware} from 'redux'; //middleware to catch and write the action
import {persistStore} from 'redux-persist'
import logger from 'redux-logger'; //redux-logger adalah middleware tersebut

import rootReducer from './root-reducer'; //store ngambil dari root reducer sesuai flow. array is expected

const middlewares = []; //isi array bisa ditambah kalo butuh

if(process.env.NODE_ENV === 'development') { //to apply the logger for dev only
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
//create and export our store from rootReducer function

export const persistor = persistStore(store);

export default {store, persistor}; 