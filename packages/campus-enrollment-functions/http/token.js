const invariant = require('invariant')
const cors = require('cors')({origin: true, credentials: true})
const {fetchNetlifyUserInfo, createFirebaseAccount} = require('../lib/token')

module.exports = (req, res) => cors(req, res, async err => {
	try{
		if(err) throw err
		const authorization = req.get('authorization')
		invariant(authorization, 'missing authorization header')

		const accessToken = authorization.replace(/^Bearer +/, '')
		invariant(accessToken, 'missing accessToken')

		const user = await fetchNetlifyUserInfo(accessToken)
		const token = await createFirebaseAccount(user, accessToken)
		res.json({access_token: token, token_type: 'bearer'})
	}catch(e){
		console.error(e)
		res.status(401).json({
			error: 'invalid_request',
			error_message: e.message,
			error_code: e.code || 'other',
		})
	}
})
