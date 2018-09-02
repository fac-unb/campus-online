const {Agent: HttpAgent} = require('http')
const {Agent: HttpsAgent} = require('https')
const axios = require('axios')

module.exports = axios.create({
	baseURL: 'https://api.netlify.com/api/v1/',
	httpAgent: new HttpAgent({keepAlive: true, timeout: 1000}),
	httpsAgent: new HttpsAgent({keepAlive: true, timeout: 1000}),
})
