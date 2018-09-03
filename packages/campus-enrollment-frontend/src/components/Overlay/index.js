import styled, {keyframes} from 'styled-components'
import {rgba} from 'polished'
import {colors} from '../../constants'

const opacity = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${rgba(colors.base22, 0.66)};
	animation: ${opacity} 250ms ease-out;
	${p =>
		p.onClick &&
		`
		cursor: pointer;
	`};
`

export default Overlay
