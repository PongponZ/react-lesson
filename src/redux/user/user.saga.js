import { takeLatest, put, all , call } from 'redux-saga/effects'

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils'

import {signInSuccess, signInFailure} from './user.action'
import UserActionType from './user.types'


export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider)
        const userRef = yield call(createUserProfileDocument, user)
        const userSnapShot = yield userRef.get()
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}


export function* signInWithEmail({payload:{email,password}}){
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        const userRef = yield call(createUserProfileDocument, user)
        const userSnapShot = yield userRef.get()
        console.log(userRef)
        yield put(signInSuccess({id:userSnapShot.id, ...userSnapShot.data() }))
    } catch (error) {
        yield put(signInFailure(error.message))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSaga(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}

