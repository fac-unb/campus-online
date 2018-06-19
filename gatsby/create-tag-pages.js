/* eslint-env node */
const _ = require('lodash')
const path = require('path')

const query = async graphql => {
	const {data, errors} = await graphql(`
		query CreateTagPagesQuery {
			allMarkdownRemark(filter: {frontmatter: {template: {eq: "blog-post"}}}) {
				posts: edges {
					post: node {
						frontmatter {
							tags
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
