import '../reset.css'
import '../fonts.css'
import React from 'react'
import styled from 'styled-components'
import {colors, fonts} from '../constants'
import Footer from '../components/Footer'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	color: ${colors.base};
	font-family: ${fonts.sans};
	background: ${colors.base03};
`

const Inner = styled.div`
	flex: 1 0 auto;
	width: 100%;
	padding-bottom: 8rem;
`

const Layout = ({children}) => (
	<Wrapper>
		<Inner>{typeof children === 'function' ? children() : children}</Inner>
		<Footer style={{flex: 'none'}} />
	</Wrapper>
)

export default Layout
