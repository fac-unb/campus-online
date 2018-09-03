import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import Separator from '../Separator'
import Line from './Line'

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	border-top: 1px solid ${colors.base11}
`

const Table = ({students}) => (
	<Wrapper>
		<Separator/>
		{students.map(student => <Line {...student}/>)}
	</Wrapper>
)

export default Table
