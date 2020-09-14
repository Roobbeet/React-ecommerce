import ShopActionTypes from './shop.types';

import {firestore, convertCollectionsSnapshotToMap} from '../../components/firebase/firebase.utils'
/*
export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap,
}) //karena udah digantiin fungsinya sama fecthCollectionsSuccess, maka kita dispatch collectionsMap ke fecthCollectionsSuccess
*/

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

export const fecthCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
})

export const fecthCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
})

//async ini bakal ngedispatch hasil sesuai dengan kriterianya
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections'); //ngambil 'collections' collection
        dispatch(fetchCollectionsStart());

        collectionRef.get().then(snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           console.log(collectionsMap);
           dispatch(fecthCollectionsSuccess(collectionsMap));
           //this.setState({loading: false}) //no longer needed since we update the state on the fecthCollectionsSuccess

           //semua ini dipindahin dari ShopPage karena ada kemungkinan bakal ngegunain data yg disnapshot di tempat lain
        }).catch(error => dispatch(fecthCollectionsFailure(error.message)))
    }
}

//redux-thunk menjadi middleware function yg ngegunain dispatch, mirip mapDispatchToProps. cara makenya adalah bikin function yg return function thunk ini. Nantinya dia bakal fire beberapa function pas dispatch ini difire