import React from 'react'
import styled from 'styled-components'
import {colors} from '../constants'
import {above} from '../utils/responsive'
import * as format from '../utils/format'
import Link from './StylableLink'
import {CardCell} from './CardGrid'

const minHeight = '26rem'
const maxHeight = '16rem'

const timing = '0.15s cubic-bezier(0.4, 0, 0.2, 1)'
const Wrapper = styled.article`
	transition: padding ${timing}, margin ${timing}, box-shadow ${timing};
	z-index: 0;
	width: 100%;
	flex: 1;
	position: relative;
	margin-bottom: 0.5rem;
	${above.md`
		margin-bottom: 0;
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
	background: ${p =>
		!p.dark ? 'white' : p.alt ? 'rgba(255,255,255,0.03)' : colors.base};
	color: ${p => (p.dark ? 'white' : colors.base)};
	border-bottom: 1px solid ${p => (p.dark ? colors.base88 : colors.base11)};
	position: relative;
	overflow: hidden;
	transition: padding ${timing}, margin ${timing}, box-shadow ${timing};
	${above.md`
		border-bottom: 0;
	`} ${above.md`
		${Wrapper}:hover &, ${Wrapper}:focus &, ${Wrapper}:active &{
			padding: 6px;
			margin: -6px;
		}
	`};
`

const PostContent = styled.div`
	width: 100%;
	position: relative;
	${above.md`
		display: flex;
		align-items: stretch;
		min-height: ${p => (p.compact ? 'auto' : minHeight)};
		flex-direction: ${p => (p.reverse ? 'row' : 'row-reverse')};
	`};
`

const ImageWrapper = styled.figure`
	display: flex;
	flex: 2;
	align-items: center;
	justify-content: center;
	object-fit: cover;
	margin: -6px;
	position: relative;
	min-height: 100%;
	${above.md`
		flex: 4;
		max-width: ${p => (p.compact ? '14rem' : 'auto')};
	`}
	${above.lg`
		flex: 6;
	`}
	${above.xg`
		flex: 7;
	`}
	flex: ${p => !p.size && `3 !important`};
`

const Image = styled.img`
	display: block;
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
	padding: 1.5rem 1rem 1rem;
	display: flex;
	flex-direction: column;
	${above.md`
		padding: 2rem 1.875rem 2rem;
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
	outline-offset: -6px;
	transition: outline ${timing};
	${Wrapper}:hover &,
	${Wrapper}:active & {
		outline-offset: 0;
	}
`

const Title = styled.div`
	font-size: 17px;
	line-height: 1.27273;
	font-weight: 500;
	letter-spacing: 0.015em;
	margin: 1rem 0;
	word-wrap: break-word;
	max-width: 32em;
	${above.md`
		font-size: 22px;
		margin: 1.5rem 0 0;
	`};
`

const Editorial = styled.div`
	display: block;
`

const Author = styled.div`
	margin-top: auto;
	color: ${colors.base44};
	font-size: 0.75rem;
	line-height: 1.25rem;
	font-weight: 600;
	${above.md`
		padding-top: 2.5rem;
		font-size: 0.875rem;
	`};
`

const PostCard = ({
	url,
	title,
	date,
	editorial,
	author,
	cover,
	size = true,
	dark = false,
	alt = false,
	reverse = false,
	compact = false,
}) => (
	<CardCell xs={12} md={size ? 12 : 6}>
		<Wrapper>
			<Padding>
				<Inset dark={dark} alt={alt}>
					<PostContent reverse={reverse} compact={compact}>
						{cover && (
							<ImageWrapper size={size} compact={compact}>
								<Image src={cover} />
							</ImageWrapper>
						)}
						<Text>
							<Meta>
								{editorial && <Editorial>{editorial}</Editorial>}
								{date && <PostDate>{format.postDate(date)}</PostDate>}
							</Meta>
							{title && <Title>{title}</Title>}
							{author && <Author>{author}</Author>}
						</Text>
					</PostContent>
				</Inset>
			</Padding>
			<Anchor to={url} />
		</Wrapper>
	</CardCell>
)

export default PostCard
