//saga ini digunakan buat nyimpen semua saga yg ada, nanti bakal dipass ke store.js sebagai 1 function

import {all, call} from 'redux-saga/effects';
import {fetchCollectionsStart} from './shop/shop.sagas'

export default function* rootSaga() {
    yield all([ //bikin semua yg masuk ke yield dilakuin barengan
       call(fetchCollectionsStart)
    ])
}