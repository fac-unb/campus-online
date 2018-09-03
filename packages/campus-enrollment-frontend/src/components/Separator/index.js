import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import Checkbox from '../Checkbox'

const Wrapper = styled.div`
	background: ${colors.base06};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem;
	box-shadow: 0 1px 0 0 ${colors.base11}, 0 -1px 0 0 ${colors.base11};
`

const Left = styled.div`
	display: flex;
	align-items: center;
`

const Title = styled.div`
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.025rem;
	text-transform: uppercase;
	color: ${colors.base66};
	margin-left: 0.5rem;
`

const Counter = styled.div`
	background: ${colors.white};
	font-size: 0.625rem;
	letter-spacing: 0.025rem;
	font-weight: 700;
	color: ${colors.base66};
	padding: 0.125rem 0.375rem;
	border-radius: 0.125rem
`


const Separator = () => (
	<Wrapper>
		<Left>
			<Checkbox/>
			<Title>6 Meses atrás</Title>
		</Left>
		<Counter>1/32</Counter>
	</Wrapper>
)

export default Separator
