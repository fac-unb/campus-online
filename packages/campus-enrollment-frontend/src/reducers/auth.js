import {authMiddleware, authReducer} from 'redux-implicit-oauth2'
import {
	LOGIN_REQUEST, login        as loginAction,
	LOGIN_SUCCESS, loginSuccess as loginSuccessAction,
	LOGIN_FAILURE, loginFailure as loginFailureAction,
	LOGOUT,        logout       as logoutAction,
} from 'redux-implicit-oauth2/lib/actions.js'
import firebase from '../firebase'
import * as api from '../api'

const createAction = (actionCreator, typeString) => {
	actionCreator.toString = () => typeString
	return actionCreator
}

// [ACTIONS]
const loginSuccess  = createAction(loginSuccessAction, LOGIN_SUCCESS)
const loginFailure  = createAction(loginFailureAction, LOGIN_FAILURE)
export const login  = createAction(loginAction,        LOGIN_REQUEST)
export const logout = createAction(logoutAction,       LOGOUT)

// [REDUCER]
export default authReducer

const handleError = store => error => store.dispatch(loginFailure(error))
const noop = () => {}
const hook = {
	[loginSuccess]: async (store, {token}) => {
		try{
			const firebaseToken = await api.getFirebaseToken(token)
			await firebase.auth().signInWithCustomToken(firebaseToken)
		}catch(error){
			handleError(store)(error)
		}
	},
	[logout]: () => firebase.auth().signOut(),
	[loginFailure]: () => firebase.auth().signOut(),
}

// [MIDDLEWARE]
export const middleware = store => {
	setTimeout(() => {
		const {auth} = store.getState()
		if(!auth.token) return
		if(firebase.auth().currentUser) return
		hook[loginSuccess](store, auth)
	}, 320)

	firebase.auth().onAuthStateChanged(
		user => {
			const {auth: {isLoggedIn}} = store.getState()
			if(!user && isLoggedIn) store.dispatch(logout())
		},
		handleError(store),
	)
	return next => action => {
		(hook[action.type] || noop)(store, action)
		return authMiddleware(store)(next)(action)
	}
}
