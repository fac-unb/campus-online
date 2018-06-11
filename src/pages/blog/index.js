import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {colors} from '../../constants'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import {CardRow} from '../../components/CardGrid'
import Navbar from '../../components/Navbar'
import StoriesTitle from '../../components/StoriesTitle'
import PostCard from '../../components/PostCard'

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
				<Navbar
					style={{position: 'fixed', top: 0, zIndex: 2}}
					links={[
						{href: '/about', label: 'Sobre'},
						{href: '/contact', label: 'Contato'},
					]}
				/>
				<main style={{background: colors.base03, paddingBottom: '8rem'}}>
					<Container>
						<section>
							<StoriesTitle
								title="Todas as publicações"
								style={{paddingTop: '8em', paddingBottom: '1em'}}
							/>
							<Row>
								<Cell xs={12} lg={3} xg={3} style={{position: 'relative'}}>
									<div
										style={{
											fontWeight: 600,
											background: 'red',
											margin: '0.5rem 0',
											padding: '1rem',
											width: '100%',
										}}
									>
										[TODO]: Filters Editorials + Authors + Tags
										{
											'' /* <ul>
											{posts.filter(x => x.frontmatter.tags).map(tag => (
												<li key={tag.fieldValue}>
													<Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
														{tag.fieldValue} ({tag.totalCount})
													</Link>
												</li>
											))}
										</ul> */
										}
										{/* {console.log(JSON.stringify(posts.map(x=>x.post.frontmatter.tags)))} */}
									</div>
								</Cell>
								<Cell lg={1} />
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
													key={post.id}
													compact={true}
												/>
											))}
										</CardRow>
									)}
								</Cell>
							</Row>
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
					id
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
