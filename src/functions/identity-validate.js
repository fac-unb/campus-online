import {createHash} from 'crypto'
import fetch from 'node-fetch'
import LRU from 'lru-cache'

const sha256 = string =>
	createHash('sha256')
		.update(string)
		.digest('hex')
const fetchJSON = async (...args) => await (await fetch(...args)).json()
const cache = LRU({max: 64, maxAge: 60 * 1000})
const isAllowed = async email => {
	if (typeof email !== 'string') throw new Error('email is not a string')
	if (cache.has(email)) return cache.get(email)
	const url = `https://auth-netlify.firebaseio.com/acl/${sha256(email)}.json`
	const result = email === (await fetchJSON(`${url}?shallow=true`))
	return cache.set(email, result), result
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
