import React, {Fragment} from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {mapProps} from 'recompose'
import fp from 'lodash/fp'
import Container from '../components/Container'
import {CardRow} from '../components/CardGrid'
import Navbar from '../components/Navbar'
import StoriesTitle from '../components/StoriesTitle'
import HomeHero from '../components/HomeHero'
import PostCard from '../components/PostCard'

const PageComponent = ({siteTitle, posts: [hero, ...posts]}) => (
	<Fragment>
		<Helmet>
			<title>{siteTitle} | Home</title>
		</Helmet>
		<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
		<main style={{paddingBottom: '8rem'}}>
			{hero && <HomeHero {...hero} />}
			<Container>
				<StoriesTitle
					title="Publicações recentes"
					label="Ver todas"
					to="/blog"
				/>
				<CardRow>
					{posts.map((post, index) => (
						<PostCard
							{...post}
							dynamic
							key={post.url}
							size={!(index % 3) % 2}
						/>
					))}
				</CardRow>
			</Container>
		</main>
	</Fragment>
)

const enhance = mapProps(({data: {site, blog: {posts}}}) => ({
	siteTitle: fp.getOr('[default title]', 'siteMetadata.title')(site),
	posts: posts
		.map(fp.get('post'))
		.map(({fields: {slug, author, editorial}, frontmatter}) => ({
			...frontmatter,
			url: slug,
			author: author && {
				...author.frontmatter,
				url: author.fields.slug,
			},
			editorial: editorial && {
				...editorial.frontmatter,
				url: editorial.fields.slug,
			},
		})),
}))

const IndexPage = enhance(PageComponent)

IndexPage.propTypes = {
	data: PropTypes.shape({
		blog: PropTypes.shape({
			posts: PropTypes.array,
		}),
		site: PropTypes.shape({
			siteMetadata: PropTypes.shape({
				title: PropTypes.string,
			}),
		}),
	}),
}

export default IndexPage

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		blog: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}
			filter: {frontmatter: {template: {eq: "blog-post"}}}
		) {
			posts: edges {
				post: node {
					fields {
						slug
						author {
							fields {
								slug
							}
							frontmatter {
								title
								image
							}
						}
						editorial {
							fields {
								slug
							}
							frontmatter {
								title
								color
							}
						}
					}
					frontmatter {
						title
						cover
						dark: featured
						tags
						date
					}
				}
			}
		}
	}
`
