const API_URL = 'https://us-east1-campus-unb.cloudfunctions.net'

const headersByMethod = {
	'HEAD': {},
	'GET': {Accept: 'application/json'},
	'LINK': {Accept: 'application/json'},
	'UNLINK': {Accept: 'application/json'},
	'DELETE': {Accept: 'application/json'},
	'POST': {Accept: 'application/json', 'Content-Type': 'application/json'},
	'PUT': {Accept: 'application/json', 'Content-Type': 'application/json'},
	'PATCH': {Accept: 'application/json', 'Content-Type': 'application/json'},
}

const isString = value => typeof value === 'string'
const JSONEncode = body => isString(body) ? body : JSON.stringify(body)

const api = Object.keys(headersByMethod).reduce((api, method) => {
	api[method.toLowerCase()] = async (path, {auth, raw, ...options} = {}) => {
		if(typeof path !== 'string') throw new Error(`api.${method}: Missing Path`)
		const body = JSONEncode(options.body)
		const headers = new Headers({
			...headersByMethod[method],
			...options.headers,
			...createAuth(auth),
		})
		const {href} = new URL(path, API_URL)
		const response = await fetch(href, {...options, method, headers, body})
		if(raw) return response
		let json = {}
		try{json = await response.json()}catch(e){/* swallow */}

		if(json.error){
			const err = new Error(json.error_message || json.error_code || json.error)
			err.code = json.error_code
			throw err
		}

		return Array.isArray(json)
			? {items: json, http: response}
			: {...json, http: response}
	}
	return api
}, {})

export default api

const createAuth = ({username, password, token} = {}) => {
	const key = 'Authorization'
	if(typeof token === 'string') return {[key]: new TokenAuth(token)}
	if(typeof username === 'string' && typeof password === 'string'){
		return {[key]: new BasicAuth(username, password)}
	}
	return {}
}

export class BasicAuth {
	constructor(username, password){
		if(!username) throw new Error('BasicAuth: Missing Username')
		if(!password) throw new Error('BasicAuth: Missing Password')
		this.username = username
		this.password = password
		this.toString.bind(this)
	}
	toString(){
		// [TODO]: replace btoa with propper base64, people use emoji etc
		return 'Basic ' + btoa(`${this.username}:${this.password}`)
	}
}

export class TokenAuth {
	constructor(token){
		if(!token) throw new Error('TokenAuth: Missing Token')
		this.token = token
		this.toString.bind(this)
	}
	toString(){
		return 'Bearer ' + this.token
	}
}
