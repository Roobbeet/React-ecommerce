import { call, put, takeLatest, all, take } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../components/firebase/firebase.utils'

import {signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess} from './user.actions';

//karena authenticatio/snapshotnya sama persis antara google dan email, makanya dijadiin 1 function generator
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
        try {
           const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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

export function* isUserAuthenticated() { //function buat check ada userAuth apa engga
    try {
        const userAuth = yield getCurrentUser(); //getCurrentUser dapet dari firebase
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch(error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}



export function* signUp({payload: {displayName, email, password, confirmPassword}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {
            displayName
        }}))
    }catch(error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}







export function* userSagas() {
    yield all ([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
}