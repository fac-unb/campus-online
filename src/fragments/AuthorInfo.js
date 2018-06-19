export const fragment = graphql`
	fragment AuthorInfo on MarkdownRemark {
		frontmatter {
			name: title
			avatar: image
			semester
		}
		fields {
			url: slug
		}
	}
`

const flatten = ({frontmatter, fields}) => ({...frontmatter, ...fields})
export default node => (node ? flatten(node) : null)
