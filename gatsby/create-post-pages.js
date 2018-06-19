/* eslint-env node */
const path = require('path')

// [TODO]: create BlogPost node type
// [TODO]: make editorial and author BlogPost GraphQL key
// [TODO]: use real GraphQL fragments
const PostInfoFrament = `
	frontmatter { title date cover }
	fields {
		url: slug
		editorial {
			frontmatter { title color }
			fields { url: slug }
		}
		author {
			frontmatter { title image }
			fields { url: slug }
		}
	}
`

const query = async graphql => {
	const {data, errors} = await graphql(`
		query CreatePostPagesQuery {
			allMarkdownRemark(
				sort: {order: DESC, fields: [frontmatter___date]},
				filter: {frontmatter: {template: {eq: "blog-post"}}},
			) {
				posts: edges {
					post: node { id fields { url: slug } }
					prev: previous { ${PostInfoFrament} }
					next: next { ${PostInfoFrament} }
				}
			}
		}
	`)

	if (!errors) return data

	errors.forEach(e => console.error(e.toString())) // eslint-disable-line
	throw errors
}

const flattenPostInfo = ({frontmatter, fields: {url, editorial, author}}) => ({
	...frontmatter,
	url,
	editorial: editorial && {
		...editorial.frontmatter,
		...editorial.fields,
	},
	author: author && {
		...author.frontmatter,
		...author.fields,
	},
})

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
				prev: prev && flattenPostInfo(prev),
				next: next && flattenPostInfo(next),
			},
		})
	})
}
