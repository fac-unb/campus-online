import React from 'react'
import styled from 'styled-components'
import {canonicalURL} from '../../constants'
import Container from '../Container'
import Anchor from './Anchor'
import AuthButton from './AuthButton'

const Wrapper = styled.div`
	padding: 1rem 0;
`

const Main = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const Right = styled.div`
	display: flex;
	align-items: center;
`

const Navbar = ({links}) => (
	<Wrapper>
		<Container>
			<Main>
				<img alt='campus logo' src='/assets/images/logo-enroll.svg'/>
				<Right>
					{links.map(({href, label}) => (
						<Anchor key={href} href={href}>{label}</Anchor>
					))}
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
