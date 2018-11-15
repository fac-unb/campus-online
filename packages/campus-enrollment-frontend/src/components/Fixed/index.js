import styled from 'styled-components/macro'

const Fixed = styled.div`
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	position: fixed;
	z-index: 10;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	-ms-scroll-chaining: none;
	overscroll-behavior: contain;
`

export default Fixed
