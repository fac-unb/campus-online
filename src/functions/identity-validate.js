import {createHash} from 'crypto'
import fetch from 'node-fetch'

const sha256 = string =>
	createHash('sha256')
		.update(string)
		.digest('hex')
const fetchJSON = async (...args) => await (await fetch(...args)).json()
const isAllowed = async email => {
	if (typeof email !== 'string') throw new Error('email is not a string')
	const url = `https://auth-netlify.firebaseio.com/acl/${sha256(email)}.json`
	const value = await fetchJSON(`${url}?shallow=true`)
	console.log({email, value, hash: sha256(email)}) // eslint-disable-line
	return email === value
}

export const handler = async ({body = 'null'} = {}) => {
	try {
		const {email} = JSON.parse(body).user
		if (await isAllowed(email)) return {statusCode: 204, body: ''}
		throw new Error(`email '${email}' is not allowed`)
	} catch ({message}) {
		console.log(message) // eslint-disable-line
	}
	return {statusCode: 403, body: ''}
}
