import React from 'react'
import PropTypes from 'prop-types'
import {mapProps} from 'recompose'
import {get, kebabCase} from 'lodash/fp'
import styled from 'styled-components'
import {colors} from '../../constants'
import MetaTags from '../../components/MetaTags'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import {CardRow} from '../../components/CardGrid'
import Navbar from '../../components/Navbar'
import StoriesTitle from '../../components/StoriesTitle'
import PostCard from '../../components/PostCard'
import Editorials from '../../components/Editorials'
import ScrollList from '../../components/ScrollList'

const LayoutGrid = styled(Row)`
	justify-content: space-between;
`

const enhanceTuthor = ({name, url}) => ({label: name, url})
const enhanceTag = tag => ({url: `/tags/${kebabCase(tag)}/`, label: tag})

const PageComponent = ({posts, tags, authors, editorials}) => (
	<div
		style={{
			background: colors.base,
			color: 'white',
			marginBottom: '-8rem',
			paddingBottom: '8rem',
		}}
	>
		<MetaTags title="Todos as matérias" />
		<Navbar style={{position: 'fixed', top: 0, zIndex: 2}} dark={true} />
		<main style={{padding: '8rem 0'}}>
			<Container>
				{/* [TODO]: sort tags and authors*/}
				<section style={{marginBottom: '6rem'}}>
					<Editorials editorials={editorials} style={{marginBottom: '2rem'}} />
					<ScrollList
						title="Alunos"
						to={'/authors'}
						list={authors.map(enhanceTuthor)}
					/>
					<ScrollList title="Tags" to={'/tags'} list={tags.map(enhanceTag)} />
				</section>
				<section>
					<StoriesTitle title="Todas as publicações" dark={true} />
					<LayoutGrid>
						<Cell xs={12} lg={8} xg={8}>
							{posts && (
								<CardRow>
									{posts.map(post => (
										<PostCard
											{...post}
											key={post.slug}
											dark={!post.featured}
											alt={true}
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

const enhance = mapProps(
	({
		data: {
			blog: {posts, tags},
			allAuthors: {authors},
			allEditorials: {editorials},
		},
	}) => ({
		tags,
		editorials: editorials
			.map(get('editorial'))
			.map(({frontmatter, fields}) => ({...frontmatter, ...fields})),
		authors: authors
			.map(get('author'))
			.map(({frontmatter, fields}) => ({...frontmatter, ...fields})),
		posts: posts
			.map(get('post'))
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
	}),
)

const BlogPage = enhance(PageComponent)

export default BlogPage

BlogPage.propTypes = {
	data: PropTypes.shape({
		blog: PropTypes.shape({
			posts: PropTypes.array,
		}),
	}),
}

export const pageQuery = graphql`
	query BlogQuery {
		allAuthors: allMarkdownRemark(
			# [TODO]: filter author on current semester
			sort: {order: DESC, fields: [frontmatter___title]}
			filter: {frontmatter: {template: {eq: "author"}}}
		) {
			authors: edges {
				author: node {
					frontmatter {
						name: title
						avatar: image
					}
					fields {
						url: slug
					}
				}
			}
		}
		allEditorials: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___title]}
			filter: {frontmatter: {template: {eq: "editorial"}}}
		) {
			editorials: edges {
				editorial: node {
					frontmatter {
						name: title
						color
					}
					fields {
						url: slug
					}
				}
			}
		}
		blog: allMarkdownRemark(
			sort: {order: DESC, fields: [frontmatter___date]}
			filter: {frontmatter: {template: {eq: "blog-post"}}}
		) {
			tags: distinct(field: frontmatter___tags)
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
						featured
						tags
						date
					}
				}
			}
		}
	}
`
