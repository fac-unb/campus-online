import styled from 'styled-components/macro'
import {colors, fonts} from '../../constants'

const Input = styled.input`
	border: 0;
	padding: 0;
	color: ${colors.base};
	font-size: 1rem;
	line-height: 1.5rem;
	font-family: ${fonts.sans};
	outline: 0;
	width: 100%;
	padding-right: 1rem;
	::placeholder{
		color: ${colors.base44};
	}
`

export default Input
