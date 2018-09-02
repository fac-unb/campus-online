import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import AuthState from '../AuthState'
import Icon from '../Icon'

const Wrapper = styled.button`
	display: block;
	border: none;
	margin: 0;
	padding: 0;
	background: transparent;
	color: inherit;
	font: inherit;
	line-height: normal;
	appearance: none;
	cursor: pointer;
	padding: 0.5rem;
	margin-right: -0.5rem;
`

const Inner = styled.div`
	background: ${colors.base11};
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	color: ${colors.base66};
	display: flex;
	align-items: center;
	justify-content: center;
	:hover{
		background: ${colors.base88};
		color: ${colors.base03};
	}
	svg{
		display: block;
	}
`

const Button = ({icon, onClick, props}) => (
	<Wrapper {...props} onClick={onClick}>
		<Inner>
			<Icon size={20} icon={icon}/>
		</Inner>
	</Wrapper>
)

const External = ({render, children = render}) => (
	<AuthState
		render={({isLoggedIn, action}) => children({
			icon: isLoggedIn ? 'log-out' : 'log-in',
			onClick: action, disabled: !action,
		})}
	/>
)

const AuthButton = () => (
	<External render={props => <Button color='white' {...props}/>}
/>)

export default AuthButton
