import styled from 'styled-components'
import {above} from '../../utils/responsive'

const Anchor = styled.a`
	display: block;
	cursor: pointer;
	text-decoration: none;
	color: currentColor;
	font-weight: 500;
	opacity: 0.66;
	display: block;
	text-decoration: none;
	font-size: 1rem;
	line-height: 1.5rem;
	text-transform: lowercase;
	padding: 0.75rem;
	position: relative;
	:hover,
	:focus {
		opacity: 1;
	}
	${above.md`
		font-size: 1.125rem;
		line-height: 2rem;
	`};
`

export default Anchor
