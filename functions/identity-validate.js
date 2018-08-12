exports.handler = async event => {
	console.log('EVENT:', event.body)
	return {statusCode: 403, body: ''}
}
