import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'

const Wrapper = styled.div`
	overflow: hidden;
	padding: 1rem 0rem;
	line-height: 1.5rem;
	border-bottom: 1px solid ${colors.base11};
	${above.md`
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0.5rem;
	`}
`

const Name = styled.div`
	font-weight: 600;
`

const Mail = styled.div`
	color: ${colors.base88};
`

const When = styled.div`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${colors.base44};
`

const Line = ({name, mail, date}) => (
	<Wrapper>
		<Name>{name}</Name>
		<Mail>{mail}</Mail>
		<When>{date}</When>
	</Wrapper>
)

export default Line
