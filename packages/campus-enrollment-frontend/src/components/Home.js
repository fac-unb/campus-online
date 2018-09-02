import React from 'react'
import styled from 'styled-components'
import {colors} from '../constants'
import Navbar from './Navbar'

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
	</Wrapper>
)

export default Home
