const {Agent: HttpAgent} = require('http')
const {Agent: HttpsAgent} = require('https')
const axios = require('axios')
const agents = {
	httpAgent: new HttpAgent({keepAlive: true, timeout: 1000}),
	httpsAgent: new HttpsAgent({keepAlive: true, timeout: 1000}),
}

const identity = a => a
const throwWithMessage = (error, message = '') => {
	if(!message || typeof message !== 'string') throw error
	error.message = `${error.message}: "${message}"`
	throw error
}

const handleError = async err => {
	if(err.response && err.response.data){
		const {data: {msg, message, error, error_description: info}} = err.response
		throwWithMessage(err, msg || message || error && `${error}: ${info}`)
	}
	throw err
}

module.exports = subdomain => {
	const baseURL = `https://${subdomain}.netlify.com/.netlify/identity/`
	const instance = axios.create({baseURL, ...agents})
	instance.interceptors.response.use(identity, handleError)
	return {
		recover: async ({email}) => {
			const response = await instance.post('recover', {email})
			return response.data
		},
		signup: async ({email, password, full_name}) => {
			const data = full_name && {full_name}
			const response = await instance.post('signup', {email, password, data})
			return response.data
		},
	}
}
