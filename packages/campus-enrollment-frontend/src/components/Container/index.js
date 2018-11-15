import styled from 'styled-components/macro'
import {above} from '../../utils/responsive'
import {containerWidth} from '../../constants'

const Container = styled.div`
	margin-left: auto;
	margin-right: auto;
	display: block;
	width: 100%;
	max-width: ${containerWidth + 'px'};
	padding: 0 1rem;
	${above.md`
		padding: 0;
		width: 90%;
	`} ${above.xg`
		width: 100%;
	`};
`

export default Container
