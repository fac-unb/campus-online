const fp = require('lodash/fp')
const type = 'MarkdownRemark'

const isEditorialNode = fp.isMatch({
	internal: {type: 'MarkdownRemark'},
	frontmatter: {template: 'editorial'},
})

const isPostNode = fp.isMatch({
	internal: {type: 'MarkdownRemark'},
	frontmatter: {template: 'blog-post'},
})

const isAuthorNode = fp.isMatch({
	internal: {type: 'MarkdownRemark'},
	frontmatter: {template: 'author'},
})

const getAuthorSlug = fp.get('frontmatter.author.slug')
const getEditorialSlug = fp.get('frontmatter.editorial.slug')

module.exports = ({boundActionCreators, getNodes, getNode}) => {
	const {createNodeField} = boundActionCreators
	const allNodes = getNodes()

	const postNodes = allNodes.filter(isPostNode)
	const authorNodes = allNodes.filter(isAuthorNode)
	const editorialNodes = allNodes.filter(isEditorialNode)

	const postWithAuthorNodes = postNodes.filter(getAuthorSlug)
	const postWithEditorialNodes = postNodes.filter(getEditorialSlug)

	const postsByAuthors = {}
	postWithAuthorNodes.forEach(node => {
		const slug = getAuthorSlug(node)
		const authorNode = authorNodes.find(fp.matches({fields: {slug}}))
		if (!authorNode) return
		const authorId = authorNode.id
		createNodeField({node, name: 'author', value: authorId})
		postsByAuthors[authorId] = postsByAuthors[authorId] || []
		postsByAuthors[authorId] = [...postsByAuthors[authorId], node.id]
	})

	Object.entries(postsByAuthors).forEach(([id, postIds]) => {
		createNodeField({node: getNode(id), name: 'posts', value: postIds})
	})

	const postsByEditorials = {}
	postWithEditorialNodes.forEach(node => {
		const slug = getEditorialSlug(node)
		const editorialNode = editorialNodes.find(fp.matches({fields: {slug}}))
		if (!editorialNode) return
		const editorialId = editorialNode.id
		createNodeField({node, name: 'editorial', value: editorialId})
		postsByEditorials[editorialId] = postsByEditorials[editorialId] || []
		postsByEditorials[editorialId] = [
			...postsByEditorials[editorialId],
			node.id,
		]
	})

	Object.entries(postsByEditorials).forEach(([id, postIds]) => {
		createNodeField({node: getNode(id), name: 'posts', value: postIds})
	})
}
