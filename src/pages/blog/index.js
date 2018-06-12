import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import flatten from '../../utils/flatten'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import {CardRow} from '../../components/CardGrid'
import Navbar from '../../components/Navbar'
import StoriesTitle from '../../components/StoriesTitle'
import PostCard from '../../components/PostCard'
import Tags from '../../components/Tags'

const getTags = posts => flatten(posts.map(x => x.post.frontmatter.tags))

const LayoutGrid = styled(Row)`
	flex-direction: row-reverse;
	justify-content: space-between;
`

export default class BlogPage extends React.Component {
	handleScriptLoad() {
		if (window.netlifyIdentity) {
			window.netlifyIdentity.on('init', user => {
				if (!user) {
					window.netlifyIdentity.on('login', () => {
						document.location.href = '/admin/'
					})
				}
			})
		}
		window.netlifyIdentity.init()
	}
	render() {
		const {
			site,
			blog: {posts},
		} = this.props.data
		return (
			<div>
				<Helmet>
					<title>{site.siteMetadata.title} | Todos as matérias</title>
				</Helmet>
				<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} />
				<main style={{paddingBottom: '8rem'}}>
					<Container>
						<section>
							<StoriesTitle
								title="Todas as publicações"
								style={{paddingTop: '8em', paddingBottom: '1em'}}
							/>
							<LayoutGrid>
								<Cell xs={12} lg={4} xg={4} style={{position: 'relative'}}>
									<div>
										<Tags tags={getTags(posts)} />
									</div>
								</Cell>
								<Cell xs={12} lg={8} xg={7}>
									{posts && (
										<CardRow>
											{posts.map(({post}) => (
												<PostCard
													url={post.fields.slug}
													title={post.frontmatter.title}
													date={post.frontmatter.date}
													excerpt={post.excerpt}
													editorial={post.frontmatter.editorial}
													cover={post.frontmatter.cover}
													author={post.frontmatter.author}
													dark={post.frontmatter.featured}
													key={post.fields.slug}
													reverse={true}
													compact={true}
												/>
											))}
										</CardRow>
									)}
								</Cell>
							</LayoutGrid>
						</section>
					</Container>
				</main>
			</div>
		)
	}
}

BlogPage.propTypes = {
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

export const pageQuery = graphql`
	query BlogQuery {
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
					excerpt(pruneLength: 400)
					fields {
						slug
					}
					frontmatter {
						title
						template
						editorial
						cover
						author
						featured
						tags
						date
					}
				}
			}
		}
	}
`
