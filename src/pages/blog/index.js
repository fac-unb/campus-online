import React from 'react'
import PropTypes from 'prop-types'
import {mapProps} from 'recompose'
import fp from 'lodash/fp'
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

const LayoutGrid = styled(Row)`
	justify-content: space-between;
`

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
				{/* [TODO]: sort tags */}
				<Editorials editorials={editorials} />
				<details>
					<summary>authors</summary>
					<pre>{JSON.stringify(authors, null, 2)}</pre>
				</details>
				<details>
					<summary>tags</summary>
					<pre>{JSON.stringify(tags, null, 2)}</pre>
				</details>

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
			.map(fp.get('editorial'))
			.map(({frontmatter, fields}) => ({...frontmatter, ...fields})),
		authors: authors
			.map(fp.get('author'))
			.map(({frontmatter, fields}) => ({...frontmatter, ...fields})),
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
