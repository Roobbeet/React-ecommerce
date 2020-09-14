//tujuan saga
/*
Tujuan saga:
1. hold middleware function dalam 1 container/file --> yg berpengaruh pada 1 section yg sama
2. menggunakan function generator dan bikin sequence dari function
*/
//saga bakal ngecancel proses pertama bila butuh fire ke 2 (yield ke 2)

//saga sendiri bisa jalan dengan listener dari action types karena lokasinya di middleware

import { takeEvery, call, put, takeLatest } from 'redux-saga/effects'; //fungsi takeEvery ada di notepad

import ShopActionTypes from './shop.types';

import {
    fecthCollectionsSuccess,
    fecthCollectionsFailure
} from './shop.actions'

import {firestore, convertCollectionsSnapshotToMap} from '../../components/firebase/firebase.utils'

export function* fetchCollectionsAsync() {
    yield console.log('Saga Started')
    
    //using try catch method for error and successful action
    try {
     const collectionRef = firestore.collection('collections'); //ngambil 'collections' collection
    const snapshot = yield collectionRef.get(); //yield ini sejenis .then-nya async
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    //basically kaya yield convertCollectionsSnapshotToMap(snapshot) tp bakal berhenti kalo kelamaan --> call buat call function yg ada argumentnya


    yield console.log(collectionsMap);
    yield put(fecthCollectionsSuccess(collectionsMap));  
    //put ini sejenis disptachnya thunk
    
    } catch (error) {
    yield put(fecthCollectionsFailure(error.message));   
    }
    
    /*
    collectionRef.get().then(snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           console.log(collectionsMap);

           
        }).catch(error => dispatch(fecthCollectionsFailure(error.message)))
        */
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}
//take vs takeEvery --> take cuma bisa fired sekali, takeEvery bisa diulang2
//takeLatest adalah take yg ngetrigger function terakhir dan cancel yg sebelumnya