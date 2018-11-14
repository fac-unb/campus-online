import React from 'react'
import styled from 'styled-components/macro'
import {colors} from '../constants'
import Navbar from './Navbar'
import Container from './Container'
import Main from './Main'

const Wrapper = styled.div`
	min-height: 100%;
	min-height: 100vh;
	flex: 1;
	display: flex;
	flex-direction: column;
	background: ${colors.base03}
`

const Home = () => (
	<Wrapper>
		<Navbar/>
		<Container style={{display: 'flex', flexDirection: 'column', flex: 1}}>
			<Main/>
		</Container>
	</Wrapper>
)

export default Home
