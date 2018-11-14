import React from 'react'
import styled from 'styled-components/macro'

// [TODO]: styling
// https://codepen.io/kenchen/pen/iCEeA

const Wrapper = styled.label`
	flex: 0;
	flex-grow: 0;
`

const Input = styled.input``

const Checkbox = ({style, className, ...props}) => (
	<Wrapper style={style} className={className}>
		<Input type='checkbox' {...props}/>
	</Wrapper>
)

export default Checkbox
