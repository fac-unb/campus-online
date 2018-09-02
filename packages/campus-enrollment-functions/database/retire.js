const functions = require('firebase-functions')
const createTask = require('../lib/createTask')

const fnRef = path => functions.runWith({timeoutSeconds: 30}).database.ref(path)

const address = fnRef('/retire/{push}')
const handler = (snapshot, {timestamp, auth}) => {
	const {uid: userId} = auth || {}
	const {user_id: netlifyUserId} = snapshot.val()
	const ref_url = snapshot.ref.toString()

	if(!userId) return console.log('missing userId, skipping...')
	if(!netlifyUserId) return console.log('missing netlifyUserId, skipping...')

	const payload = {user_id: netlifyUserId, ref_url}
	return createTask({type: 'AUTHOR_RETIRE', payload, timestamp, userId})
}

module.exports = address.onCreate(handler)
