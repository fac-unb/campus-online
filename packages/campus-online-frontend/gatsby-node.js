/* eslint-env node, es6 */
const {createFilePath} = require('gatsby-source-filesystem')
const remarkImagesToRelative = require('./gatsby/remarkImagesToRelative.js')

exports.createPages = async (...args) => {
	await require('./gatsby/create-default-pages')(...args)
	await Promise.all([
		require('./gatsby/create-tag-pages')(...args),
		require('./gatsby/create-post-pages')(...args),
	])
}

exports.onCreateNode = ({node, actions: {createNodeField}, getNode}) => {
	remarkImagesToRelative(node)
	if (node.internal.type !== 'MarkdownRemark') return
	createNodeField({name: 'slug', node, value: createFilePath({node, getNode})})
}
