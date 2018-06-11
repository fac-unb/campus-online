import React from 'react'
import Helmet from 'react-helmet'
import Container from '../../components/Container'
import {TagsCounter} from '../../components/Tags'

const TagsPage = ({
	data: {
		blog: {tags},
		site: {
			siteMetadata: {title},
		},
	},
}) => (
	<Container>
		<Helmet title={`${title} | Tags `} />
		<section>
			<h1>Tags</h1>
			<TagsCounter tags={tags} />
		</section>
	</Container>
)

export default TagsPage

export const tagPageQuery = graphql`
	query TagsQuery {
		site {
			siteMetadata {
				title
			}
		}
		blog: allMarkdownRemark(limit: 1000) {
			tags: group(field: frontmatter___tags) {
				fieldValue
				totalCount
			}
		}
	}
`
