import {createAction, handleActions} from 'redux-actions'
import {compose} from 'recompose'
import * as api from '../api'
import * as netlify from './netlify'

const castArray = v => Array.isArray(v) ? v : [v]
const castList = v => v ? castArray(v) : []
const getSortedByDateArray = byId => Object.keys(byId).sort(
	(a, b) => new Date(byId[b].date) - new Date(byId[a].date)
)

const uniq = array => [...new Set(castArray(array))]
const intersect = (array1, array2) => array1.filter(x => array2.includes(x))
const uniqSect = compose(uniq, intersect)

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
export const invite   = ({email, name} = {}) => async dispatch => {
	try{
		const date = (new Date()).toISOString()
		dispatch(loading({email, name, date}))
		await api.inviteStudent({email, name})
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
		const selectedIds = uniqSect(state.selectedIds, allIds)
		return {...state, byId, allIds, selectedIds}
	},
	[loading]: (state, {payload: {email, name, date}}) => {
		const byId = {...state.byId, [email]: {email, name, date, loading: true}}
		const allIds = getSortedByDateArray(byId)
		return {...state, byId, allIds}
	},
	[select]: ({selectedIds, ...state}, {payload: ids}) => ({...state,
		selectedIds: uniqSect(
			[...selectedIds, ...ids],
			state.allIds,
		).filter(id => state.byId[id].id),
	}),
	[unselect]: ({selectedIds: selected, ...state}, {payload: ids}) => ({...state,
		selectedIds: uniqSect(
			selected.filter(a => !ids.includes(a)),
			state.allIds,
		).filter(id => state.byId[id].id)
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
