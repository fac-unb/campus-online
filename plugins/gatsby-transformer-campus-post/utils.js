const fp = require('lodash/fp')
const unified = require('unified')
const markdown = require('remark-parse')
const html = require('remark-html')

const stringify = ast =>
	unified()
		.use(html)
		.stringify(ast)
const unwrap = ({children = []} = {}) => ({children, type: 'root'})

exports.parse = string =>
	unified()
		.use(markdown)
		.parse(string)
exports.reduceWith = fn => fp.reduce((...args) => fn(args[1])(...args), [])
exports.nodeToHTML = fp.flow([unwrap, stringify, fp.trim])
