/* eslint-env node */
const path = require('path')
const {createQuery} = require('./helpers')

// [TODO]: create BlogPost node type
// [TODO]: make editorial and author BlogPost GraphQL key

const query = createQuery('CreatePostPages')`
	allMarkdownRemark(
		sort: {order: DESC, fields: [frontmatter___date]},
		filter: {frontmatter: {template: {eq: "blog-post"}}},
	) {
		posts: edges {
			post: node { id fields { url: slug } }
			prev: previous { id }
			next: next { id }
		}
	}
`

module.exports = async ({boundActionCreators, graphql}) => {
	const {createPage, deletePage} = boundActionCreators
	const {
		allMarkdownRemark: {posts},
	} = await query(graphql)

	posts.forEach(({prev, next, post}) => {
		const {url} = post.fields
		try {
			deletePage(url)
		} catch (e) {
			/* swallow errors */
		}

		createPage({
			path: url,
			component: path.resolve(`src/templates/blog-post/gatsby.js`),
			context: {
				id: post.id,
				prev: prev && prev.id,
				next: next && next.id,
			},
		})
	})
}
