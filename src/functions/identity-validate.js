export async function handler(event) {
	const validationError = getValidationError(event)
	if (validationError) return validationError

	const {
		user: {email},
	} = JSON.parse(event.body)
	if (!email.endsWith('@kunstdesign.com.br')) return reject('wrong acl')
	return {statusCode: 204, body: ''}
}

const reject = (...reasons) => {
	console.log(...reasons) // eslint-disable-line no-console
	return {statusCode: 403, body: ''}
}

const getValidationError = event => {
	if (!event) return reject('event missing')
	if (!event.body) return reject('event.body missing')
	let json = {}

	try {
		json = JSON.parse(event.body)
	} catch (e) {
		return reject('error parsing json', typeof event.body)
	}

	if (!json) return reject('empty json')
	if (!json.user) return reject('empty json.user')
	if (!json.user.email) return reject('empty json.user.email')
	if (typeof json.user.email !== 'string') return reject('email is not string')
}
