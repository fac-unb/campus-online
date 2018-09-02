const {createHash} = require('crypto')
const functions = require('firebase-functions')
const createTask = require('../lib/createTask')

const fnRef = path => functions.runWith({timeoutSeconds: 30}).database.ref(path)
const sha256 = string => createHash('sha256').update(string).digest('hex')

const address = fnRef('/invite/{hash}')
const handler = (snapshot, {params = {}, timestamp, auth}) => {
	const {hash} = params || {}
	const {uid: userId} = auth || {}
	const {email, full_name} = snapshot.val()
	const ref_url = snapshot.ref.toString()

	if(!userId) return console.log('missing userId, skipping...')
	if(hash !== sha256(email)) return console.log('hash diff, skipping...')
	if(!email.includes('@')) return console.log('invalid email, skipping...')

	const payload = {email, full_name, ref_url}
	return createTask({type: 'AUTHOR_INVITE', payload, timestamp, userId})
}

module.exports = address.onCreate(handler)
