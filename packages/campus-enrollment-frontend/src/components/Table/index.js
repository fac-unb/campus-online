import React from 'react'
import styled from 'styled-components'
import Line from './Line'

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const Table = ({students}) => (
	<Wrapper>
		{students.map(student => <Line {...student}/>)}
	</Wrapper>
)

export default Table
