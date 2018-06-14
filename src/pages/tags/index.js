import React from 'react'
import Helmet from 'react-helmet'
import Container from '../../components/Container'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import {TagsCounter} from '../../components/Tags'

const TagsPage = ({
	data: {
		blog: {tags},
		site: {
			siteMetadata: {title},
		},
	},
}) => (
	<React.Fragment>
		<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
		<Hero title="Navegar por tags" sub={`${tags.length} tags no total`} />
		<Container>
			<Helmet title={`${title} | Tags `} />
			<section style={{padding: '6rem 0 8rem'}}>
				<TagsCounter tags={tags} />
			</section>
		</Container>
	</React.Fragment>
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
