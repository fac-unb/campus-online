import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Container from './Container.js'
import LogoIcon from './LogoIcon'
import {colors} from '../constants'

const Wrapper = styled.footer`
	padding-top: 1rem;
	padding-bottom: 1rem;
	background: ${colors.base};
	min-height: 12rem;
	color: white;
	@media print {
		display: none;
	}
`

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`

const Logo = styled.a`
	display: block;
	margin-right: 3rem;
	height: 1.5rem;
	color: ${colors.base88};
	svg {
		height: 100%;
		width: auto;
	}
	&:hover, &:focus, &:active{
		color: ${colors.base3};
	}
`

const Links = styled.ul`
	display: flex;
	align-items: center;
	margin-left: -1rem;
	margin-right: -1rem;
`

const Anchor = styled.a`
	color: ${colors.base66};
	text-decoration: none;
	display: block;
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: lowercase;
	letter-spacing: 0.5px;
	padding: 1rem 0.75rem;
	:hover, :focus, :active {
		color: ${colors.base03};
		text-decoration: underline;
	}
`

const LinkItem = ({href, label}) => (
	<li style={{listStyle: 'none'}}>
		<Link href={href}>
			<Anchor href={href}>{label}</Anchor>
		</Link>
	</li>
)


const Footer = () => (
	<Wrapper>
		<Container>
			<Flex>
				<Logo href='/'>
					<LogoIcon/>
				</Logo>
				<Links>
					<LinkItem href='/posts' label='Posts'/>
				</Links>
			</Flex>
		</Container>
	</Wrapper>
)

export default Footer
