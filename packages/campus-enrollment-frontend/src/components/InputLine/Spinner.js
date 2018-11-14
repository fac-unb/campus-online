import React from 'react'
import styled, {keyframes} from 'styled-components/macro'

const offset = 42
const duration = 1400

const rotate = keyframes`
	from { transform: rotate(0deg); }
	to { transform: rotate(270deg); }
`

const dash = keyframes`
	0% {
		stroke-dashoffset: ${offset};
	}
	50% {
		stroke-dashoffset: ${offset / 4};
		transform: rotate(135deg);
	}
	100% {
		stroke-dashoffset: ${offset};
		transform: rotate(450deg);
	}
`

const SvgWrapperElement = styled.svg`
	animation: ${rotate} ${duration}ms linear infinite;
`

const Circle = styled.circle`
	fill: none;
	stroke: currentColor;
	stroke-dasharray: ${offset};
	stroke-dashoffset: 0;
	stroke-linecap: round;
	transform-origin: center;
	animation: ${dash} ${duration}ms ease-in-out infinite;
`

const Spinner = ({size = 14, strokeWidth = 1}) => {
	const dimension = `${size}px`
	const viewBox = `0 0 ${size} ${size}`
	const center = size / 2
	const radius = center - strokeWidth
	return (
		<SvgWrapperElement width={dimension} height={dimension} viewBox={viewBox}>
			<Circle cx={center} cy={center} r={radius} strokeWidth={strokeWidth}/>
		</SvgWrapperElement>
	)
}

export default Spinner
