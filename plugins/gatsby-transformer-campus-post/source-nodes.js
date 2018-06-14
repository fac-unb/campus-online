const fp = require('lodash/fp')
const type = 'MarkdownRemark'

const isPostNode = fp.isMatch({
	internal: {type: 'MarkdownRemark'},
	frontmatter: {template: 'blog-post'},
})

const isAuthorNode = fp.isMatch({
	internal: {type: 'MarkdownRemark'},
	frontmatter: {template: 'author'},
})

const getAuthorSlug = fp.get('frontmatter.author.slug')

module.exports = ({boundActionCreators, getNodes, getNode}) => {
	console.log('===>WHAT<====')
	const {createNodeField} = boundActionCreators
	const postsByAuthors = {}
	const allNodes = getNodes()
	const authorNodes = allNodes.filter(isAuthorNode)
	const postWithAuthorNodes = allNodes.filter(isPostNode).filter(getAuthorSlug)

	postWithAuthorNodes.forEach(node => {
		const slug = getAuthorSlug(node)
		const authorNode = authorNodes.find(fp.matches({fields: {slug}}))
		if (!authorNode) return
		const authorId = authorNode.id
		createNodeField({node, name: 'author', value: authorId})
		postsByAuthors[authorId] = postsByAuthors[authorId] || []
		postsByAuthors[authorId] = [...postsByAuthors[authorId], node.id]
	})

	console.log(postsByAuthors)

	Object.entries(postsByAuthors).forEach(([authorNodeId, postIds]) => {
		const node = getNode(authorNodeId)
		if (!node) return
		createNodeField({node, name: 'posts', value: postIds})
	})
}
