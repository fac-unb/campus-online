import React from 'react'
import styled from 'styled-components/macro'
import {colors} from '../../constants'
import Icon from '../Icon'

const Wrapper = styled.button`
	appearance: none;
	user-select: none;
	display: flex;
	margin: 0;
	padding: 0.5rem 0.625rem;
	align-items: center;
	justify-content: space-between;
	background: ${colors.white};
	color: ${colors.blue};
	border: 1px solid ${colors.blue};
	border-radius: 0.25rem;
	line-height: 1rem;
	outline: none;
	cursor: pointer;
	:hover, :focus{
		background: ${colors.blue};
		color: ${colors.white};
	}
`

const Main = styled(
	// eslint-disable-next-line no-unused-vars
	({icon, ...props}) => <div {...props}/>
)`
	font-size: 0.75rem;
	text-transform: uppercase;
	font-weight: 700;
	letter-spacing: 0.025rem;
	${p => p.icon && `margin-right: 0.375rem`}
	flex: 1;
`

const Button = ({children, icon, ...props}) => (
	<Wrapper {...props}>
		{children && <Main icon={!!icon}>{children}</Main>}
		{icon && <Icon size={14} strokeWidth={2.5} icon={icon}/>}
	</Wrapper>
)

export default Button
