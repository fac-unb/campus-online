import React from 'react'
import styled from 'styled-components/macro'
import {ReactComponent as ButtonImage} from './login-with-netlify.svg'

const Wrapper = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Background = styled.div`
	border-radius: 0.5rem;
	padding: 1.5rem;
	align-self: center;
	justify-self: center;
	background: white;
`

const Button = styled(ButtonImage)`
	max-width: 50vw;
	height: auto;
	display: block;
	opacity: ${p => p.disabled ? '0.88' : '1'};
	cursor: ${p => p.disabled ? 'default' : 'pointer'};
	filter: ${p => p.disabled ? 'grayscale(1)' : 'none'};
	pointer-events: ${p => p.disabled ? 'none' : 'auto'};
`

const LoginButton = ({isLoading, onClick}) => (
	<Wrapper>
		<Background>
			<Button onClick={onClick} disabled={isLoading}/>
		</Background>
	</Wrapper>
)

export default LoginButton
