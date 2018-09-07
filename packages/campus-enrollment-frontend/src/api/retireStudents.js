import {key, increment} from 'firebase-key'
import firebase from '../firebase'
const database = firebase.database()
const refValue = path => database.ref(path).once('value').then(a => a.val())

const castArray = v => Array.isArray(v) ? v : [v]
const castList = v => v ? castArray(v) : []

const retireStudents = async (studentIds = []) => {
	const offset = await refValue('.info/serverTimeOffset')
	const {retirees} = castList(studentIds).reduce(
			({key: lastKey, retirees = {}}, studentId) => {
			if(typeof studentId !== 'string') return {key: lastKey, retirees}
			const key = increment(lastKey)
			return {key, retirees: {...retirees, [key]: {user_id: studentId}}}
		},
		{key: key(new Date().getTime() + offset)},
	)
	await database.ref('/retire').update(retirees)
}

export default retireStudents
