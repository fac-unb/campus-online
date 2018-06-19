import {mapProps} from 'recompose'
import BlogPost from '.'

const flatten = ({content, frontmatter, fields: {url, editorial, author}}) => ({
	url,
	content,
	...frontmatter,
	editorial: editorial && {
		...editorial.frontmatter,
		...editorial.fields,
	},
	author: author && {
		...author.frontmatter,
		...author.fields,
	},
})

const fromGraphql = ({data: {post, prev, next}}) => ({
	...flatten(post),
	prev: flatten(prev),
	next: flatten(next),
})

const enhance = mapProps(fromGraphql)
export default enhance(BlogPost)
export const pageQuery = graphql`
	fragment PostInfo on MarkdownRemark {
		frontmatter {
			title
			date
			cover
		}
		fields {
			url: slug
			editorial {
				frontmatter {
					title
					color
				}
				fields {
					url: slug
				}
			}
			author {
				frontmatter {
					title
					image
				}
				fields {
					url: slug
				}
			}
		}
	}
	query BlogPostTemplate($id: String!, $prev: String, $next: String) {
		prev: markdownRemark(id: {eq: $prev}) {
			...PostInfo
		}
		next: markdownRemark(id: {eq: $next}) {
			...PostInfo
		}
		post: markdownRemark(id: {eq: $id}) {
			...PostInfo
			content: html
			frontmatter {
				tags
			}
		}
	}

`
