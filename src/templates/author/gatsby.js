import {map} from 'lodash/fp'
import {mapProps} from 'recompose'
import flattenBlogPostInfo from '../../fragments/BlogPostInfo'
import flattenAuthorInfo from '../../fragments/AuthorInfo'
import AuthorPage from '.'

const enhance = mapProps(({data: {author}}) => ({
	...flattenAuthorInfo(author),
	posts: map(flattenBlogPostInfo, author.fields.posts),
	content: author.content,
	excerpt: author.excerpt,
}))

export default enhance(AuthorPage)

export const pageQuery = graphql`
	query AuthorByID($id: String!) {
		author: markdownRemark(id: {eq: $id}) {
			...AuthorInfo
			content: html
			excerpt(pruneLength: 120)
			fields {
				posts {
					...BlogPostInfo
				}
			}
		}
	}
`
