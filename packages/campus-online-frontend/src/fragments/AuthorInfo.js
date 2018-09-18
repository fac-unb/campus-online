import {graphql} from 'gatsby'

export const fragment = graphql`
	fragment AuthorInfo on MarkdownRemark {
		frontmatter {
			name: title
			semester
			avatar: image {
				childImageSharp {
					small: fixed(width: 32, height: 32, quality: 100, cropFocus: NORTH) {
						...GatsbyImageSharpFixed_noBase64
					}
					medium: fixed(width: 48, height: 48, quality: 100, cropFocus: NORTH) {
						...GatsbyImageSharpFixed_noBase64
					}
					large: fixed(width: 88, height: 88, quality: 100, cropFocus: NORTH) {
						...GatsbyImageSharpFixed_noBase64
					}
				}
			}
		}
		fields {
			url: slug
		}
	}
`

const flatten = ({frontmatter, fields}) => ({...frontmatter, ...fields})
export default node => (node ? flatten(node) : null)
