import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import Link from '../StylableLink'
import Navbar from '../Navbar'
import Container from '../Container'

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	background: ${p => (p.background ? p.background : colors.base)};
	color: white;
	position: relative;
	overflow: hidden;
	z-index: 3;
`

const ImageWrapper = styled.figure`
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	align-items: center;
	justify-content: center;
	object-fit: cover;
`

const Image = styled.img`
	display: block;
	overflow: hidden;
	object-fit: cover;
	height: 100%;
	min-width: 100%;
	flex: 1;
`

const Text = styled.div`
	margin-top: 6rem;
	margin-bottom: 3rem;
	${above.md`
		margin-top: 10rem;
		margin-bottom: 6rem;
	`};
`

const Sup = styled.div`
	display: block;
	font-size: 0.75rem;
	text-transform: uppercase;
	font-weight: 500;
	margin-bottom: 0.5rem;
	opacity: 0.66;
`

const Sub = Sup.extend`
	margin-top: 0.5rem;
`

const Title = styled.div`
	font-size: 2rem;
	line-height: 2.5rem;
	text-transform: capitalize;
	font-weight: 300;
	${above.md`
		font-size: 3rem;
		line-height: 3.5rem;
	`};
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

const TextHero = ({
	url,
	sup,
	title,
	sub,
	cover,
	background,
	shadow,
	dark,
	navbar = true,
}) => (
	<Wrapper background={background}>
		<div
			style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				clip: 'rect(auto,auto,auto,auto)',
				clipPath: 'inset(0)',
				zIndex: 4,
				pointerEvents: 'none',
			}}
		>
			{navbar && (
				<Navbar
					shadow={shadow}
					dark={dark}
					links={[
						{href: '/about', label: 'Sobre'},
						{href: '/contact', label: 'Contato'},
					]}
					style={{
						position: 'fixed',
						background: 'none',
						pointerEvents: 'all',
					}}
				/>
			)}
		</div>
		{cover && (
			<ImageWrapper>
				<Image src={cover} />
			</ImageWrapper>
		)}
		<Text>
			<Container>
				{sup && <Sup>{sup}</Sup>}
				{title && <Title>{title}</Title>}
				{sub && <Sub>{sub}</Sub>}
			</Container>
		</Text>
		{url && <Anchor to={url} />}
	</Wrapper>
)

export default TextHero
