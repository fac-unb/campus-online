import {graphql} from 'gatsby'
import flattenAuthor from './AuthorInfo'
import flattenEditorial from './EditorialInfo'

export const blogPostCoverImage = graphql`
	fragment BlogPostCoverImage on MarkdownRemark {
		frontmatter {
			cover {
				image: childImageSharp {
					sizes(maxWidth: 1920, quality: 100) {
						...GatsbyImageSharpSizes
					}
				}
			}
		}
	}
`

export const fullsizeCoverThumbnail = graphql`
	fragment BlogPostCoverThumbnail on MarkdownRemark {
		frontmatter {
			cover {
				thumbnail: childImageSharp {
					sizes(maxWidth: 865, quality: 88) {
						...GatsbyImageSharpSizes
					}
				}
			}
		}
	}
`

export const fullsizeCoverThumbnailNoBase64 = graphql`
	fragment BlogPostCoverThumbnail_noBase64 on MarkdownRemark {
		frontmatter {
			cover {
				thumbnail: childImageSharp {
					sizes(maxWidth: 865, quality: 88) {
						...GatsbyImageSharpSizes_noBase64
					}
				}
			}
		}
	}
`

export const fragment = graphql`
	fragment BlogPostInfo on MarkdownRemark {
		frontmatter {
			title
			headline
			date
			tags
			featured
		}
		fields {
			url: slug
			editorial {
				...EditorialInfo
			}
			author {
				...AuthorInfo
			}
		}
	}
`

const flatten = ({frontmatter, fields}) => ({
	...frontmatter,
	...fields,
	editorial: flattenEditorial(fields.editorial),
	author: flattenAuthor(fields.author),
})

export default node => (node ? flatten(node) : null)
