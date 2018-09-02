import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.label`
	flex: 0;
	flex-grow: 0;
`

const Input = styled.input``

const Checkbox = ({style, className}) => (
	<Wrapper style={style} className={className}>
		<Input type='checkbox'/>
	</Wrapper>
)

export default Checkbox
