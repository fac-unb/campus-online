import {createAction, handleActions} from 'redux-actions'
import * as api from '../api'
import * as netlify from './netlify'

const castArray = v => Array.isArray(v) ? v : [v]
const castList = v => v ? castArray(v) : []
const getSortedByDateArray = byId => Object.keys(byId).sort(
	(a, b) => new Date(byId[b].date) - new Date(byId[a].date)
)

const isSelectable = ({byId, allIds}) => (id, index, array) => {
	if(!allIds.includes(id)) return false
	if(array.indexOf(id) !== index) return false
	const student = byId[id]
	if(!student) return false
	if(!student.id) return false
	if(student.loading) return false
	if(student.retiring) return false
	return true
}

const idleState = {byId: {}, allIds: [], selectedIds: [], isFetching: false}
const initialState = {...idleState, isWaiting: true}


// [ACTIONS]
export const fetching = createAction('enrollment/students/fetching')
export const receive  = createAction('enrollment/students/receive', castList)
export const error    = createAction('enrollment/students/error')
export const select   = createAction('enrollment/students/select', castList)
export const unselect = createAction('enrollment/students/unselect', castList)
export const toggle   = createAction('enrollment/students/toggle')
export const loading  = createAction('enrollment/students/loading')
export const retiring = createAction('enrollment/students/retiring', castList)
export const invite   = ({email, name} = {}) => async dispatch => {
	try{
		const date = (new Date()).toISOString()
		dispatch(loading({email, name, date}))
		await api.inviteStudent({email, name})
	}catch({message}){
		dispatch(error(message))
	}
}

export const retire = studentsIds => async dispatch => {
	try{
		dispatch(retiring(studentsIds))
		await api.retireStudents(studentsIds)
	}catch({message}){
		dispatch(error(message))
	}
}

// [REDUCER]
const reducer = handleActions({
	[fetching]:      () => ({...idleState, isFetching: true}),
	[netlify.error]: () => idleState,
	[netlify.clear]: () => initialState,
	[error]:         (state, {payload}) => ({...idleState, error: payload}),
	[receive]:       (state, {payload: ids}) => {
		const students = ids.reduce(
			(obj, item) => (item || {}).id ? ({...obj, [item.id]: item}) : obj, {},
		)
		const byId = {...state.byId, ...students}
		const allIds = getSortedByDateArray(byId)
		const selectedIds = state.selectedIds.filter(isSelectable({byId, allIds}))
		return {...state, byId, allIds, selectedIds}
	},
	[loading]: (state, {payload: {email, name, date}}) => {
		const byId = {...state.byId, [email]: {email, name, date, loading: true}}
		const allIds = getSortedByDateArray(byId)
		return {...state, byId, allIds}
	},
	[retiring]: (state, {payload = []}) => {
		const byId = castList(payload).reduce((byId, id) => (!byId[id] ? byId : ({
			...byId, [id]: {...byId[id], retiring: true},
		})), state.byId)
		const selectedIds = state.selectedIds.filter(isSelectable({...state, byId}))
		return {...state, byId, selectedIds}
	},
	[select]: ({selectedIds, ...state}, {payload: ids}) => ({...state,
		selectedIds: [...selectedIds, ...ids].filter(isSelectable(state)),
	}),
	[unselect]: ({selectedIds: s, ...state}, {payload: ids}) => ({...state,
		selectedIds: s.filter(a => !ids.includes(a)).filter(isSelectable(state)),
	}),
	[toggle]: (state, {payload: id}) => (
		reducer(state, state.selectedIds.includes(id) ? unselect(id) : select(id))
	),
}, initialState)

export default reducer

// [MIDDLEWARE]
export const middleware = store => {
	// [TODO]: handle firebase user tasks
	return next => async action => {
		next(action)
		if(action.type !== String(netlify.replace)) return
		const {
			netlify: {siteId, identityId},
			auth: {token},
			students: {isWaiting, isFetching},
		} = store.getState()
		if(!isWaiting || isFetching || !siteId || !token) return
		const students = await api.getEnrolledStudents({siteId, identityId, token})
		store.dispatch(receive(students))
	}
}
