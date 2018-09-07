import {createAction, handleActions} from 'redux-actions'
import * as api from '../api'

// [PRIVATE_ACTIONS]
const loading = createAction('enrollment/netlify/loading')

// [ACTIONS]
export const error   = createAction('enrollment/netlify/error')
export const replace = createAction('enrollment/netlify/replace')
export const clear   = createAction('enrollment/netlify/clear')

// [REDUCER]
export default handleActions({
	[error]:   (state, {payload}) => ({error: payload}),
	[replace]: (state, {payload}) => (payload),
	[loading]: () => ({isLoading: true}),
	[clear]:   () => ({}),
}, {})

// [PRIVATE_THUNKS]
const loadSiteData = () => async (dispatch, getState) => {
	const {auth: {token}, netlify: {isLoading}} = getState()
	if(isLoading || !token) return
	dispatch(loading())
	try{
		const data = await api.getNetlifySiteData({token})
		if(token === getState().auth.token) dispatch(replace(data))
	}catch({message}){
		if(token === getState().auth.token) dispatch(error(message))
	}
}

// [MIDDLEWARE]
export const middleware = ({dispatch, getState}) => {
	// reason for setTimeout: https://github.com/reduxjs/redux/issues/1240
	setTimeout(() => loadSiteData()(dispatch, getState))
	return next => async action => {
		const {auth: {token: token1}} = getState()
		next(action)
		const {auth: {token: token2}} = getState()
		if(token1 && !token2) return dispatch(clear())
		if(token1 === token2 || !token2) return
		loadSiteData()(dispatch, getState)
	}
}
