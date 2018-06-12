import React from 'react'
import styled from 'styled-components'
import {padStart} from 'lodash'
import {colors} from '../../constants'
import Link from '../StylableLink'

const Wrapper = styled(Link)`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	font-weight: 500;
	color: ${colors.base44};
	font-weight: 1.125rem;
	line-height: 2rem;
	text-decoration: none;
	margin-bottom: 1rem;
	border-bottom: 1px solid ${colors.base22};
	&:hover,
	&:focus {
		color: ${colors.base66};
	}
`

const Counter = styled.div`
	font-size: 0.875rem;
	line-height: 1rem;
`

const SideSection = ({title, to, count, style}) => (
	<Wrapper to={to} style={style}>
		{title}
		{count && <Counter>{padStart(count.length, 2, 0)}</Counter>}
	</Wrapper>
)

export default SideSection
