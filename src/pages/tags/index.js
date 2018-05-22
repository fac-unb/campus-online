import React from 'react'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const TagsPage = ({
	data: {
		blog: {tags},
		site: {siteMetadata: {title}},
	},
}) => (
	<section>
		<Helmet title={`Tags | ${title}`} />
		<div>
			<div>
				<div>
					<h1>Tags</h1>
					<ul>
						{tags.map(tag => (
							<li key={tag.fieldValue}>
								<Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
									{tag.fieldValue} ({tag.totalCount})
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	</section>
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
