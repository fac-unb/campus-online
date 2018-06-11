import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import {padStart} from 'lodash'
import {colors} from '../../constants'
import Content from '../../components/Content'
import Container from '../../components/Container'
import {Row, Cell} from '../../components/Grid'
import Navbar from '../../components/Navbar'
import HomeHero from '../../components/HomeHero'
import Text from '../../components/Text'
import Tags from '../../components/Tags'
import StylableLink from '../../components/StylableLink'

const TagsLink = styled(StylableLink)`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	font-weight: 500;
	color: ${colors.base44};
	font-weight: 1.125rem;
	line-height: 2rem;
	text-decoration: none;
	margin-bottom: 1rem;
	border-bottom: 1px solid ${colors.base22};
	div {
		font-size: 0.875rem;
		line-height: 1rem;
	}
	&:hover,
	&:focus {
		color: ${colors.base66};
	}
`

const BlogPost = ({
	content,
	tags,
	date,
	cover,
	editorial,
	title,
	author,
	siteTitle,
}) => {
	return (
		<main style={{paddingBottom: '8rem'}}>
			<Helmet title={`${siteTitle} | ${title}`} />
			<Navbar
				style={{position: 'fixed', top: 0, zIndex: 2}}
				links={[
					{href: '/about', label: 'Sobre'},
					{href: '/contact', label: 'Contato'},
				]}
			/>
			<HomeHero title={title} date={date} cover={cover} editorial={editorial} />
			<Container>
				<Row>
					<Cell xs={12} lg={8}>
						<Text>
							<Content>{content}</Content>
						</Text>
					</Cell>
					<Cell xs={0} lg={1} />
					<Cell xs={12} lg={3} style={{position: 'sticky', top: '6rem'}}>
						{tags.length && (
							<div style={{width: '100%'}}>
								<TagsLink to="/tags">
									Tags
									<div>{padStart(tags.length, 2, 0)}</div>
								</TagsLink>
								<Tags tags={tags} />
							</div>
						)}
						{author}
					</Cell>
				</Row>
			</Container>
		</main>
	)
}

export default BlogPost
