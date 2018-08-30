import {graphql} from 'gatsby'

export const fragment = graphql`
	fragment AuthorInfo on MarkdownRemark {
		frontmatter {
			name: title
			avatar: image {
				large: childImageSharp {
					resolutions(width: 88, height: 88) {
						...GatsbyImageSharpResolutions_noBase64
					}
				}
				small: childImageSharp {
					resolutions(width: 32, height: 32) {
						...GatsbyImageSharpResolutions_noBase64
					}
				}
			}
			semester
		}
		fields {
			url: slug
		}
	}
`

const flatten = ({frontmatter, fields}) => ({...frontmatter, ...fields})
export default node => (node ? flatten(node) : null)
