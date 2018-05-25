import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {colors, fonts} from '../constants'
import {above} from '../utils/responsive'
import {CardCell} from './CardGrid'

const minHeight = '26rem'
const maxHeight = '16rem'

const Wrapper = styled.article`
	transition: padding 0.15s cubic-bezier(0.4, 0, 0.2, 1),
		margin 0.15s cubic-bezier(0.4, 0, 0.2, 1),
		box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	z-index: 0;
	width: 100%;
	flex: 1;
	position: relative;
	${above.md`
		&:hover, &:focus, &:active{
			box-shadow: 0 37.125px 70px -12.125px rgba(0,0,0,0.3);
			z-index: 1;
		}
	`};
`

const Padding = styled.div`
	padding: 6px 6px;
`

const Inset = styled.div`
	background: ${p => (p.dark ? colors.base : 'white')};
	color: ${p => (p.dark ? 'white' : colors.base)};
	border-bottom: 1px solid lightgray;
	position: relative;
	overflow: hidden;
	transition: padding 0.15s cubic-bezier(0.4, 0, 0.2, 1),
		margin 0.15s cubic-bezier(0.4, 0, 0.2, 1),
		box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	${above.md`
		border-bottom: 0;
	`} ${above.md`
		${Wrapper}:hover &, ${Wrapper}:focus &, ${Wrapper}:active &{
			padding: 6px 6px;
			margin: -6px -6px;
		}
	`};
`

const PostContent = styled.div`
	width: 100%;
	position: relative;
	${above.md`
		display: flex;
		flex-direction: row-reverse;
		align-items: stretch;
		min-height: ${minHeight};
	`};
`

const ImageWrapper = styled.figure`
	display: flex;
	flex: 2;
	align-items: center;
	justify-content: center;
	object-fit: cover;
	transition: padding .15s cubic-bezier(.4,0,.2,1),margin .15s cubic-bezier(.4,0,.2,1),box-shadow .15s cubic-bezier(.4,0,.2,1);
	margin: -6px -6px;
	position: relative;
	overflow: hidden;
	min-height: 100%;
	${above.md`
		flex: 5;
	`}
	${above.lg`
		flex: 6;
	`}
	${above.xg`
		flex: 9;
	`}
	flex: ${p => !p.size && `3 !important`}
`

const Image = styled.img`
	display: block;
	overflow: hidden;
	object-fit: cover;
	height: 100%;
	min-width: 100%;
	max-height: ${maxHeight};
	flex: 1;
	${above.md`
		min-height: 100%;
		position: absolute;
	`};
`

const Text = styled.div`
	flex: 2;
	padding: 1.5rem 1rem 2rem;
	${above.md`
		padding: 2rem 1.875rem 3.5rem;
	`};
`

const Meta = styled.div`
	text-transform: uppercase;
	font-size: 11px;
	line-height: 1.25rem;
	font-weight: 600;
	letter-spacing: 0.5px;
	${above.md`
		font-size: 0.75rem;
	`};
`

const PostDate = styled.div`
	opacity: 0.66;
`

const Anchor = styled(Link)`
	display: block;
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`

const Title = styled.div`
	font-size: 17px;
	line-height: 1.27273;
	font-weight: 500;
	letter-spacing: 0.015em;
	font-family: ${fonts.display};
	margin: 1rem 0 0;
	word-wrap: break-word;
	${above.md`
		font-size: 22px;
		margin: 1.5rem 0 0;
	`};
`

const Tags = styled.div`
	display: block;
`

const Tag = styled.div`
	display: block;
`

const PostCard = ({
	url,
	title,
	date,
	tags = [],
	size,
	thumbnail,
	dark = false,
}) => (
	<CardCell xs={12} md={size ? 12 : 6}>
		<Wrapper>
			<Padding>
				<Inset dark={dark}>
					<PostContent>
						{thumbnail && (
							<ImageWrapper size={size}>
								<Image src={thumbnail} />
							</ImageWrapper>
						)}
						<Text>
							<Meta>
								<Tags>
									{tags.map(tag => <Tag key={`tag-${tag}`}>{` ${tag}`}</Tag>)}
								</Tags>
								<PostDate>{`${new Date(date).toLocaleDateString('pt-BR', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}`}</PostDate>
							</Meta>
							<Title>{title}</Title>
						</Text>
					</PostContent>
				</Inset>
			</Padding>
			<Anchor to={url} />
		</Wrapper>
	</CardCell>
)

export default PostCard
