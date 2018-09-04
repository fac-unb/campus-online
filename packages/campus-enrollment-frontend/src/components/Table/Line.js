import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import Checkbox from '../Checkbox'

const Wrapper = styled.div`
	line-height: 1.5rem;
	border-bottom: 1px solid ${colors.base11};
	display: flex;
	align-items: center;
	padding: 0 0.5rem;
`

const Flex = styled.div`
	padding: 0.5rem;
	${above.md`
		padding: 0;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
	`}
`

const Name = styled.div`
	font-weight: 600;
	${above.md`padding: 1rem 0.5rem;`}
`

const Mail = styled.div`
	color: ${colors.base88};
	${above.md`padding: 1rem 0.5rem;`}
`

const When = styled.div`
	font-size: 0.875rem;
	font-weight: 500;
	color: ${colors.base44};
	${above.md`padding: 1rem 0.5rem;`}
`

const Line = ({name, mail, date}) => (
	<Wrapper>
		<Checkbox style={{marginLeft: '0.5rem'}}/>
		<Flex>
			<Name>{name}</Name>
			<Mail>{mail}</Mail>
			<When>{date}</When>
		</Flex>
	</Wrapper>
)

export default Line
