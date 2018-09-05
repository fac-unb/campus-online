import invariant from 'invariant'
import {sha256} from '../utils/hash'
import firebase from '../firebase'
const database = firebase.database()

const inviteStudent = async ({email, name}) => {
	invariant(email, 'email must be defined')
	invariant(typeof email === 'string', 'email must be a string')
	const hash = await sha256(email)
	await database.ref(`/invite/${hash}`).set({email, full_name: name || null})
}

export default inviteStudent
