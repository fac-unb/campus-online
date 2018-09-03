import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 1rem;
	padding: 0.5rem 1.25rem;
	line-height: 1.5rem;
`

const Name = styled.div`
	color: ${colors.base88};
	font-weight: 600;
`

const Mail = styled.div`
	color: ${colors.base66};
`

const DeleteLine = ({name, mail}) => (
	<Wrapper>
		<Name>{name}</Name>
		<Mail>{mail}</Mail>
	</Wrapper>
)

export default DeleteLine
