import {map} from 'lodash/fp'
import {mapProps} from 'recompose'
import flattenBlogPostInfo from '../../fragments/BlogPostInfo'
import flattenAuthorInfo from '../../fragments/AuthorInfo'
import AuthorPage from '.'

const enhance = mapProps(({data: {author}}) => ({
	...flattenAuthorInfo(author),
	posts: map(flattenBlogPostInfo, author.fields.posts),
	content: author.content,
}))

export default enhance(AuthorPage)

export const pageQuery = graphql`
	query AuthorByID($id: String!) {
		author: markdownRemark(id: {eq: $id}) {
			content: html
			...AuthorInfo
			fields {
				posts {
					...BlogPostInfo
				}
			}
		}
	}
`
