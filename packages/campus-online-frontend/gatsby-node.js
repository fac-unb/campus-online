/* eslint-env node, es6 */
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const {createFilePath} = require('gatsby-source-filesystem')
const remarkImagesToRelative = require('./gatsby/remarkImagesToRelative.js')

exports.createPages = async (...args) => {
	await require('./gatsby/create-default-pages')(...args)
	await Promise.all([
		require('./gatsby/create-tag-pages')(...args),
		require('./gatsby/create-post-pages')(...args),
	])
}

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
	const {createNodeField} = boundActionCreators
	remarkImagesToRelative(node)
	if (node.internal.type !== 'MarkdownRemark') return
	createNodeField({name: 'slug', node, value: createFilePath({node, getNode})})
}

exports.modifyWebpackConfig = ({config}) =>
	config.merge({
		module: {
			noParse: [/netlify-cms\/dist\/cms\.js/],
		},
		resolve: {
			alias: {
				'netlify-cms': '@leonardodino/netlify-cms',
			},
		},
		plugins: [
			// https://github.com/lodash/lodash-webpack-plugin#feature-sets
			new LodashModuleReplacementPlugin({
				unicode: true,
				paths: true,
				flattening: true,
				currying: true,
				deburring: true,
			}),
		],
	})
