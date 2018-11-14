import React from 'react'
import styled from 'styled-components/macro'
import {colors} from '../../constants'
import AuthState from '../AuthState'
import Icon from '../Icon'

const Wrapper = styled.button`
	display: flex;
	align-items: stretch;
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
	user-select: none;
`

const Inner = styled.div`
	position: relative;
	background: ${colors.base11};
	color: ${colors.base66};
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-right-radius: 0.25rem;
	border-bottom-right-radius: 0.25rem;
	${Wrapper}:hover &{
		background: ${colors.base88};
		color: ${colors.base03};
	}
	svg{
		display: block;
	}
`

const Text = styled.div`
	display: flex;
	align-items: center;
	font-size: 0.75rem;
	text-transform: uppercase;
	font-weight: 700;
	line-height: 1.25rem;
	top: 0;
	bottom: 0;
	right: 100%;
	background: ${colors.base11};
	color: ${colors.base66};
	white-space: nowrap;
	padding: 0.625rem 0.125rem 0.625rem 1rem;
	border-top-left-radius: 0.25rem;
	border-bottom-left-radius: 0.25rem;
	${Wrapper}:hover &{
		background: ${colors.base88};
		color: ${colors.base03};
	}
`



const Button = ({icon, text, onClick, props}) => (
	<Wrapper {...props} onClick={onClick}>
		<Text>{text}</Text>
		<Inner>
			<Icon size={18} icon={icon} strokeWidth={2.125}/>
		</Inner>
	</Wrapper>
)

const External = ({render, children = render}) => (
	<AuthState
		render={({isLoggedIn, action}) => children({
			icon: isLoggedIn ? 'log-out' : 'log-in',
			text: isLoggedIn ? 'Log out' : 'Log in',
			onClick: action, disabled: !action,
		})}
	/>
)

const AuthButton = () => (
	<External render={props => <Button color='white' {...props}/>}
/>)

export default AuthButton
