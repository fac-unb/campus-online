import {graphql} from 'gatsby'
import {map} from 'lodash/fp'
import {mapProps} from 'recompose'
import flattenBlogPostInfo from '../../fragments/BlogPostInfo'
import flattenAuthorInfo from '../../fragments/AuthorInfo'
import AuthorPage from '.'

const enhance = mapProps(({data: {author, posts}}) => ({
	...flattenAuthorInfo(author),
	posts: map(flattenBlogPostInfo, posts.edges.map(a => a.node)),
	content: author.content,
	excerpt: author.excerpt,
}))

export default enhance(AuthorPage)

export const pageQuery = graphql`
	query AuthorByurl($url: String!) {
		author: markdownRemark(fields: {slug: {eq: $url}}) {
			...AuthorInfo
		}
		posts: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}
			filter: {
				frontmatter: {
					template: {eq:"blog-post"}
					author: {slug: {eq: $url}}
				}
			}
		) {
			edges {
				node {
					...BlogPostInfo
					...BlogPostCoverThumbnail
				}
			}
		}
	}
`
