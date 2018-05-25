import React from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, {HTMLContent} from '../components/Content'
import Container from '../components/Container'
import HomeHero from '../components/HomeHero'

export const BlogPostTemplate = ({
	content,
	contentComponent,
	description,
	tags,
	date,
	title,
	helmet,
	id,
}) => {
	const PostContent = contentComponent || Content

	return (
		<article>
			{helmet || ''}
			<HomeHero title={title} date={date} key={id} />

			<Container>
				<PostContent content={content} />
				{tags && tags.length ? (
					<div>
						<h4>Tags</h4>
						<ul>
							{tags.map(tag => (
								<li key={tag + `tag`}>
									<Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
								</li>
							))}
						</ul>
					</div>
				) : null}
			</Container>
		</article>
	)
}

BlogPostTemplate.propTypes = {
	content: PropTypes.string.isRequired,
	date: PropTypes.date,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	helmet: PropTypes.instanceOf(Helmet),
}

const BlogPost = ({data}) => {
	const {markdownRemark: post} = data

	return (
		<BlogPostTemplate
			content={post.html}
			contentComponent={HTMLContent}
			description={post.frontmatter.description}
			helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
			tags={post.frontmatter.tags}
			title={post.frontmatter.title}
		/>
	)
}

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
}

export default BlogPost

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: {eq: $id}) {
			id
			html
			frontmatter {
				date
				title
				description
				tags
			}
		}
	}
`
