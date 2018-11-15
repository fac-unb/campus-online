import React from 'react'
import styled from 'styled-components/macro'

// [TODO]: styling
// https://codepen.io/kenchen/pen/iCEeA

const Wrapper = styled.label`
	flex: 0;
	flex-grow: 0;
`

const Input = styled.input``

const noop = () => {}

const Checkbox = ({style, className, ...props}) => (
	<Wrapper style={style} className={className}>
		<Input type='checkbox' {...props} onChange={props.onChange || noop}/>
	</Wrapper>
)

export default Checkbox
