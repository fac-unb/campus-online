import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {colors} from '../constants'
import {above} from '../utils/responsive'
import Container from './Container'
import LogoIcon from './LogoIcon'

const Wrapper = styled.nav`
	background: white;
	display: block;
	position: relative;
	margin-bottom: 2rem;
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
	color: ${colors.base};
	height: 3.5rem;
	padding-top: 1rem;
	padding-bottom: 1rem;
	position: relative;
	${above.md`
		height: 6rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
		:before{
			content: '';
			position: absolute;
			top: 1rem;
			left: 1rem;
			right: 1rem;
			bottom: 1rem;
			z-index: -1;
			background-position: 0 -0.25rem;
			background-size: 0 3.25em;
			background-repeat: no-repeat;
			transition: all .2s ease-out;
		}
		:hover{
			:before{
				background-image: linear-gradient(180deg, transparent 75%, ${colors.base06} 0);
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
	color: ${colors.base44};
	display: block;
	text-decoration: none;
	font-size: 1rem;
	line-height: 1.5rem;
	text-transform: lowercase;
	padding: 1rem;
	position: relative;
	:hover,
	:focus {
		color: ${colors.base88};
	}
	${above.md`
		font-size: 1.125rem;
		line-height: 2rem;
		padding: 2rem 1rem;
		:before{
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
			transition: all .2s ease-out;
		}
		:hover{
			:before{
				background-image: linear-gradient(180deg, transparent 75%, ${colors.base06} 0);
				background-size: 100% 2.25em;
			}
		}
	`};
`

const LinkItem = ({to, label}) => (
	<li style={{listStyle: 'none', display: 'block'}}>
		<Anchor to={to}>{label}</Anchor>
	</li>
)

const Navbar = ({links, style, ...props}) => (
	<Wrapper style={style} {...props}>
		<Container>
			<Flex>
				<Logo to="/">
					<LogoIcon />
				</Logo>
				{links && (
					<Navigation>
						<Links>
							{links.map((link, index) => (
								<LinkItem to={link.href} label={link.label} />
							))}
						</Links>
					</Navigation>
				)}
			</Flex>
		</Container>
	</Wrapper>
)

export default Navbar
