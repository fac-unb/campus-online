import React from 'react'
import styled from 'styled-components'
import {colors} from '../constants'
import Link from './StylableLink'
import Container from './Container.js'
import LogoIcon from './LogoIcon'

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

const Logo = styled(Link)`
	display: block;
	margin-right: 3rem;
	height: 1.5rem;
	color: ${colors.base22};
	&:hover,
	&:focus,
	&:active {
		color: ${colors.base03};
	}
`

const Links = styled.ul`
	display: flex;
	align-items: center;
	margin-left: -1rem;
	margin-right: -1rem;
`

const StyledLink = styled(Link)`
	color: ${colors.base66};
	text-decoration: none;
	display: block;
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: lowercase;
	letter-spacing: 0.5px;
	padding: 1rem 0.75rem;
	:hover,
	:focus,
	:active {
		color: ${colors.base03};
	}
`

const StyledAnchor = StyledLink.withComponent('a')

const LinkItem = ({to, href, label}) => (
	<li style={{listStyle: 'none'}}>
		{to && <StyledLink to={to}>{label}</StyledLink>}
		{href && <StyledAnchor href={href}>{label}</StyledAnchor>}
	</li>
)

const Footer = () => (
	<Wrapper>
		<Container>
			<Flex>
				<Logo to="/">
					<LogoIcon />
				</Logo>
				<Links>
					<LinkItem href="https://kunst.com.br" label="kunst" />
				</Links>
			</Flex>
		</Container>
	</Wrapper>
)

export default Footer
