import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import Link from '../StylableLink'
import Container from '../Container'
import Logo from './Logo'
import Dropdown from './Dropdown'
import Hamburguer from './Hamburguer'
import {withMenu} from './Context'
export {Provider} from './Context'

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
		background: none;
		&:before {
			content: '';
			top: 0;
			position: absolute;
			bottom: -2rem;
			left: 0;
			right: 0;
			padding-bottom: 2rem;
			background-blend-mode: multiply;
			background: linear-gradient(180deg, rgba(20, 22, 24, 0.88) 0%, rgba(20, 22, 24, 0) 100%);
		}
	`};
	${p =>
		p.isMenuOpen &&
		`
		background: white !important;
		color: ${colors.base} !important;
		&:before{
			opacity: 0;
		}
	`};
`

const Flex = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`

const Navigation = styled.div`
	display: block;
	margin-left: -1rem;
	margin-right: -1rem;
`

const Links = styled.ul`
	background: white;
	align-items: center;
	position: absolute;
	display: block;
	width: 100%;
	left: 0;
	top: 100%;
	transform: scaleY(0);
	transform-origin: 0 0;
	opacity: 0;
	transition: all 0.3s ease;
	padding-bottom: 1rem;
	:before, :after{
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	:before{
		height: 2rem;
		box-shadow: 0 0 6rem ${colors.base66};
		z-index: -1;
	}
	:after{
		height: 100%
		background: white;
		z-index: -1;
	}
	${p =>
		p.isMenuOpen &&
		`
		transform: none;
		color: black;
		opacity: 1;
	`}
	${above.md`
		color: inherit;
		padding-bottom: 0;
		opacity: 1;
		box-shadow: none;
		display: flex;
		transform: none;
		opacity: 1;
		top: initial;
		left: initial;
		width: auto;
		position: inherit;
		background: none;
		:before, :after {
			display: none;
		}
	`}
`

const Anchor = styled(Link)`
	display: block;
	cursor: pointer;
	text-decoration: none;
	color: currentColor;
	opacity: 0.66;
	display: block;
	text-decoration: none;
	font-size: 1rem;
	line-height: 1.5rem;
	text-transform: lowercase;
	padding: 1rem;
	position: relative;
	:hover,
	:focus {
		opacity: 1;
	}
	:before {
		content: '';
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		right: 0.5rem;
		bottom: 1.125rem;
		z-index: -1;
		background-position: 0 0;
		background-size: 0 100%;
		background-repeat: no-repeat;
		transition: all 0.2s ease-out;
		background-image: linear-gradient(
			180deg,
			transparent 37.5%,
			${colors.base06} 0
		);
		${p =>
			p.hero &&
			`
			pointer-events: auto;
			background-image: linear-gradient(180deg, transparent 37.5%, ${colors.base} 0);
		`};
	}
	${above.md`
		font-size: 1.125rem;
		line-height: 2rem;
		:hover{
			:before{
				background-size: 100% 100%;
			}
		}
	`};
`

const Main = styled.div`
	display: block;
`

const Left = styled.div`
	display: block;
`

const Right = styled.div`
	display: flex;
	align-items: center;
`

const LinkItem = ({to, label, hero, dropdownItems = []}) => (
	<li style={{listStyle: 'none', display: 'block'}}>
		<Anchor hero={hero} to={to}>
			{label}
		</Anchor>
		{dropdownItems.length > 0 && <Dropdown dropdownItems={dropdownItems} />}
	</li>
)

const Navbar = ({links, style, hero, isMenuOpen, onMenuClick, ...props}) => (
	<Wrapper style={style} hero={hero} isMenuOpen={isMenuOpen} {...props}>
		<Main>
			<Container>
				<Flex>
					<Left>
						<Logo to="/" hero={hero} />
					</Left>
					<Right>
						<Hamburguer hero={hero} isOpen={isMenuOpen} onClick={onMenuClick} />
						{links && (
							<Navigation>
								<Links isMenuOpen={isMenuOpen}>
									{links.map(link => (
										<LinkItem
											key={link.href}
											to={link.href}
											hero={hero}
											label={link.label}
											dropdownItems={link.dropdownItems}
										/>
									))}
								</Links>
							</Navigation>
						)}
					</Right>
				</Flex>
			</Container>
		</Main>
	</Wrapper>
)

export default withMenu(Navbar)
