import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Container from './Container'
import {colors} from '../constants'
import LogoIcon from './LogoIcon'

const Wrapper = styled.nav`
	background: white;
`

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`

const Logo = styled.a`
	display: block;
	cursor: pointer;
	display: block;
	margin-top: 1.25rem;
	margin-bottom: 1.25rem;
	margin-right: 3rem;
	height: 2rem;
	color: ${colors.base22};
	svg {
		display: block;
		height: 100%;
		width: auto;
	}
	&:hover{
		color: ${colors.base88}
	}
`

const Navigation = styled.div`
	display: block;
	height: 3.75rem;
	overflow: hidden;
	position: relative;
	margin-left: -1rem;
	margin-right: -1rem;
	&::before, &::after {
		content: '';
		position: absolute;
		left: 0;
		z-index: 1;
		pointer-events: none;
		top: 0;
		height: 3.75rem;
		width: 1.25rem;
		background: linear-gradient(90deg, white, rgba(255,2550,255,0));
	}
	&::after{
		left: initial;
		right: 0;
		background: linear-gradient(-90deg, white, rgba(255,255,255,0));
	}
`

const Links = styled.ul`
	display: flex;
	overflow-x: scroll;
	overflow-y: hidden;
	position: relative;
	height: 6rem;
`

const Anchor = styled(Link)`
	display: block;
	cursor: pointer;
	text-decoration: none;
	color: ${colors.base44};
	display: block;
	text-decoration: none;
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 1px;
	padding: 1.5rem 1rem;
	:hover, :focus, :active {
		color: ${colors.base88};
	}
`


const LinkItem = ({href, label}) => (
	<li style={{listStyle: 'none', display: 'block'}}>
		<Anchor to={href}>{label}</Anchor>
	</li>
)


const Navbar = () => (
	<Wrapper>
		<Container>
			<Flex>
				<Link href='/'>
					<Logo href='/'>
						<LogoIcon/>
					</Logo>
				</Link>
				<Navigation>
					<Links>
						<LinkItem href='/posts' label='Posts'/>
					</Links>
				</Navigation>
			</Flex>
		</Container>
	</Wrapper>
)

export default Navbar
