/* eslint-env node */
const path = require('path')
const {createQuery} = require('./helpers')

const resolveComponent = (template = 'missing-template') =>
	path.resolve(`src/templates/${template}/gatsby.js`)

const query = createQuery('CreateDefaultPages')`
	allMarkdownRemark {
		pages: edges {
			node {
				id
				fields { url: slug }
				frontmatter { template }
			}
		}
	}
`

module.exports = async ({boundActionCreators, graphql}) => {
	const {createPage} = boundActionCreators
	const {
		allMarkdownRemark: {pages},
	} = await query(graphql)

	pages.forEach(({node: {id, fields, frontmatter}}) => {
		createPage({
			path: fields.url,
			context: {id},
			component: resolveComponent(frontmatter.template),
		})
	})
}
