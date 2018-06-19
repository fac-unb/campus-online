import {mapProps} from 'recompose'
import flattenBlogPostInfo from '../../fragments/BlogPostInfo'
import BlogPost from '.'

const fromGraphql = ({data: {post, prev, next}}) => ({
	...flattenBlogPostInfo(post),
	content: post.content,
	excerpt: post.excerpt,
	prev: prev && flattenBlogPostInfo(prev),
	next: next && flattenBlogPostInfo(next),
})

const enhance = mapProps(fromGraphql)
export default enhance(BlogPost)
export const pageQuery = graphql`
	query BlogPostTemplate($id: String!, $prev: String, $next: String) {
		prev: markdownRemark(id: {eq: $prev}) {
			...BlogPostInfo
		}
		next: markdownRemark(id: {eq: $next}) {
			...BlogPostInfo
		}
		post: markdownRemark(id: {eq: $id}) {
			...BlogPostInfo
			content: html
			excerpt(pruneLength: 120)
		}
	}
`
