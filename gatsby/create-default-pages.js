/* eslint-env node */
const path = require('path')

const resolveComponent = (template = 'missing-template') =>
	path.resolve(`src/templates/${template}/gatsby.js`)

const query = async graphql => {
	const {data, errors} = await graphql(`
		query CreateDefaultPagesQuery {
			allMarkdownRemark {
				pages: edges {
					node {
						id
						fields {
							url: slug
						}
						frontmatter {
							template
						}
					}
				}
			}
		}
	`)

	if (!errors) return data

	errors.forEach(e => console.error(e.toString())) // eslint-disable-line
	throw errors
}

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
