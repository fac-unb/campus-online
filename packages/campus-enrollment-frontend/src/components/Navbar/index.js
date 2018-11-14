import React from 'react'
import styled from 'styled-components/macro'
import {canonicalURL} from '../../constants'
import {above} from '../../utils/responsive'
import Container from '../Container'
import Anchor from './Anchor'
import AuthButton from './AuthButton'

const Wrapper = styled.div`
	padding: 1rem 0;
`

const Main = styled.div`
	display: flex;
	user-select: none;
	align-items: center;
	justify-content: space-between;
`

const Right = styled.div`
	display: flex;
	align-items: center;
`

const Links = styled.div`
	display: none;
	${above.md`
		display: flex;
		align-items: center;
	`}
`

const Navbar = ({links}) => (
	<Wrapper>
		<Container>
			<Main>
				<img alt='campus logo' src='/assets/images/logo-enroll.svg'/>
				<Right>
					<Links>
						{links.map(({href, label}) => (
							<Anchor key={href} href={href}>{label}</Anchor>
						))}
					</Links>
					<AuthButton/>
				</Right>
			</Main>
		</Container>
	</Wrapper>
)

Navbar.defaultProps = {
	links: [
		{href: `${canonicalURL}/admin`, label: 'cms'},
		{href: `${canonicalURL}`, label: 'site'},
	],
}

export default Navbar
