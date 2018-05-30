import React from 'react'
import styled from 'styled-components'
import {colors} from '../constants'
import {above} from '../utils/responsive'
import Link from './StylableLink'
import Container from './Container'
import LogoIcon from './LogoIcon'

const Wrapper = styled.nav`
	background: white;
	display: block;
	position: relative;
	margin-bottom: 2rem;
	width: 100%;
	${p =>
		p.hero &&
		`
		position: fixed;
		top: 0;
		z-index: 3;
		padding-bottom: 2rem;
		background-blend-mode: multiply;
		background: linear-gradient(180deg, rgba(20, 22, 24, 0.88) 0%, rgba(20, 22, 24, 0) 100%);
	`};
`

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`

const Logo = styled(Link)`
	display: block;
	cursor: pointer;
	display: block;
	padding-right: 2rem;
	height: 3.5rem;
	color: currentColor;
	padding-top: 1rem;
	padding-bottom: 1rem;
	position: relative;
	:before {
		content: '';
		position: absolute;
		top: 1rem;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		z-index: -1;
		transition: all 0.2s ease-out;
		background-position: 0 -0.25rem;
		background-size: 0 3.25em;
		background-repeat: no-repeat;
		background-image: linear-gradient(
			180deg,
			transparent 75%,
			${colors.base06} 0
		);
		${p =>
			p.hero &&
			`
			pointer-events: auto;
			background-image: linear-gradient(180deg, transparent 75%, ${colors.base88} 0);
		`};
	}

	${above.md`
		height: 6rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
		:hover{
			:before{
				background-size: 100% 3.25em;
			}
		}
	`};
`

const Navigation = styled.div`
	display: block;
	margin-left: -1rem;
	margin-right: -1rem;
`

const Links = styled.ul`
	display: flex;
	overflow-x: scroll;
`

const Anchor = styled(Link)`
	display: block;
	cursor: pointer;
	text-decoration: none;
	color: currentColor;
	opacity: 0.44;
	display: block;
	text-decoration: none;
	font-size: 1rem;
	line-height: 1.5rem;
	text-transform: lowercase;
	padding: 1rem;
	position: relative;
	:hover,
	:focus {
		opacity: 0.88;
	}
	:before {
		content: '';
		position: absolute;
		top: 1rem;
		left: 1rem;
		right: 0.5rem;
		bottom: 1rem;
		z-index: -1;
		background-position: 0.375em 0.1875em;
		background-size: 0 2.25em;
		background-repeat: no-repeat;
		transition: all 0.2s ease-out;
		background-image: linear-gradient(
			180deg,
			transparent 75%,
			${colors.base06} 0
		);
		${p =>
			p.hero &&
			`
			pointer-events: auto;
			background-image: linear-gradient(180deg, transparent 75%, ${colors.base88} 0);
		`};
	}
	${above.md`
		font-size: 1.125rem;
		line-height: 2rem;
		padding: 2rem 1rem;
		:hover{
			:before{
				background-size: 100% 2.25em;
			}
		}
	`};
`

const LinkItem = ({to, label, hero}) => (
	<li style={{listStyle: 'none', display: 'block'}}>
		<Anchor hero={hero} to={to}>
			{label}
		</Anchor>
	</li>
)

const Navbar = ({links, style, hero, ...props}) => (
	<Wrapper style={style} hero={hero} {...props}>
		<Container>
			<Flex>
				<Logo to="/" hero={hero}>
					<LogoIcon />
				</Logo>
				{links && (
					<Navigation>
						<Links>
							{links.map(link => (
								<LinkItem
									key={link.href}
									to={link.href}
									hero={hero}
									label={link.label}
								/>
							))}
						</Links>
					</Navigation>
				)}
			</Flex>
		</Container>
	</Wrapper>
)

export default Navbar
