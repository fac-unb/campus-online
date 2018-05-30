import React from 'react'
import styled from 'styled-components'
import {above} from '../utils/responsive'
import Link from './StylableLink'

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: baseline;
	position: relative;
	margin-bottom: 2rem;
`

const Title = styled.div`
	font-size: 2rem;
	font-weight: 600;
	line-height: 2.5rem;
	position: relative;
	${above.md`
		font-size: 3rem;
		line-height: 3.5rem;
	`};
`

const Anchor = styled(Link)`
	display: block;
	font-size: 1.125rem;
	line-height: 1.5rem;
	opacity: 0.66;
	font-weight: 600;
	text-decoration: none;
	padding-top: 1rem;
	padding-bottom: 1rem;
	color: currentColor;
	:hover {
		opacity: 1;
	}
`

const StoriesTitle = ({title, label, to}) => (
	<Wrapper>
		<Title>{title}</Title>
		<Anchor to={to}>{label}</Anchor>
	</Wrapper>
)

export default StoriesTitle
