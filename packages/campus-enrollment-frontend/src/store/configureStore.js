/* eslint-env commonjs, node */
const {NODE_ENV} = process.env
module.exports = (NODE_ENV === 'production' || NODE_ENV === 'test')
	? require('./configureStore.prod')
	: require('./configureStore.dev')
