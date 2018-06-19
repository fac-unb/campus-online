/* eslint-env node */
const _ = require('lodash')
const path = require('path')
const {createQuery} = require('./helpers')

const query = createQuery('CreateTagPages')`
	allMarkdownRemark(filter: {frontmatter: {template: {eq: "blog-post"}}}) {
		posts: edges {
			post: node {
				frontmatter { tags }
			}
		}
	}
`

module.exports = async ({boundActionCreators, graphql}) => {
	const {createPage, deletePage} = boundActionCreators
	const {
		allMarkdownRemark: {posts},
	} = await query(graphql)

	const tags = posts.reduce(
		(tags, {post}) => _.uniq([...tags, ...post.frontmatter.tags]),
		[],
	)

	tags.forEach(tag => {
		const url = `/tags/${_.kebabCase(tag)}/`

		try {
			deletePage(url)
		} catch (e) {
			/* swallow errors */
		}

		createPage({
			path: url,
			component: path.resolve(`src/templates/tags/index.js`),
			context: {tag},
		})
	})
}
