import { takeEvery, call, put, takeLatest, all } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {auth, googleProvider, createUserProfileDocument} from '../../components/firebase/firebase.utils'

import {signInSuccess, signInFailure} from './user.actions';

//karena authenticatio/snapshotnya sama persis antara google dan email, makanya dijadiin 1 function generator
export function* getSnapshotFromUserAuth(userAuth) {
        try {
           const userRef = yield call(createUserProfileDocument, userAuth);
        //hasilnya => const userRef = await createUserProfileDocument(userAuth);
        const userSnapshot = yield userRef.get(); //userRef.onSnapshot
        const userData = yield userSnapshot.data(); // decrypt the data
        yield console.log(userData);
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        //setCurrentUser diurus oleh user.reducer pada bagian success 
        } catch(error) {
            yield put(signInFailure(error))
        }
    
}

export function* signInWithGoogle() {
    //mengubah susunan sign in pada app js dan sign-in component menjadi 1 saga
    try {
        const {user} = yield auth.signInWithPopup(googleProvider); //get the value
        //authentication with GoogleProvider
        yield getSnapshotFromUserAuth(user)
        
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        //authentication with email and password payload
        yield getSnapshotFromUserAuth(user);

    } catch(error) {
        yield put(signInFailure(error))
    }
} //listener

export function* onEmailSignInStart() { //listener
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
    yield all ([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}