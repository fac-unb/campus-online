import {mapProps} from 'recompose'
import BlogPost from '.'

const enhance = mapProps(
	({
		data: {
			post: {
				frontmatter,
				html,
				fields: {editorial, author},
			},
		},
	}) => ({
		...frontmatter,
		content: html,
		author: author && {
			...author.frontmatter,
			url: author.fields.slug,
		},
		editorial: editorial && {
			...editorial.frontmatter,
			url: editorial.fields.slug,
		},
	}),
)

export default enhance(BlogPost)

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		post: markdownRemark(id: {eq: $id}) {
			html
			fields {
				editorial {
					fields {
						slug
					}
					frontmatter {
						title
						color
					}
				}
				author {
					fields {
						slug
					}
					frontmatter {
						title
						image
					}
				}
			}
			frontmatter {
				date
				title
				cover
				tags
			}
		}
	}
`
