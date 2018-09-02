const functions = require('firebase-functions')
require('firebase-admin').initializeApp()

const {https: browser} = functions
	.region('us-east1')
	.runWith({timeoutSeconds: 8, memory: '256MB'})

exports.token  = browser.onRequest(require('./http/token'))
exports.queue  = require('./database/queue')
exports.invite = require('./database/invite')
exports.update = require('./database/update')
exports.retire = require('./database/retire')
