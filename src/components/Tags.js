import React from 'react'
import {kebabCase, padStart} from 'lodash'
import styled from 'styled-components'
import {colors} from '../constants'
import Link from './StylableLink'

const Wrapper = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin-left: -0.25rem;
	margin-right: -0.25rem;
`

const Tag = styled(Link)`
	display: block;
	background: ${colors.base11};
	text-decoration: none;
	text-transform: uppercase;
	font-weight: 600;
	color: ${colors.base66};
	font-size: 0.75rem;
	border-radius: 1rem;
	letter-spacing: 0.25px;
	line-height: 1rem;
	padding: 0.5rem 1rem;
	margin: 0.25rem;
	&:hover,
	&:focus,
	&:active {
		background: ${colors.base88};
		color: white;
	}
`

const Counter = styled.span`
	font-weight: 700;
	margin-left: 0.25rem;
	color: ${colors.base44};
`

const Tags = ({tags}) => (
	<Wrapper>
		{tags.map(tag => (
			<li key={tag}>
				<Tag to={`/tags/${kebabCase(tag)}/`}>{tag}</Tag>
			</li>
		))}
	</Wrapper>
)

export const TagsCounter = ({tags}) => (
	<Wrapper>
		{tags.map(tag => (
			<li key={tag.fieldValue}>
				<Tag to={`/tags/${kebabCase(tag.fieldValue)}/`}>
					{tag.fieldValue}&nbsp;
					<Counter>{padStart(tag.totalCount, 2, 0)}</Counter>
				</Tag>
			</li>
		))}
	</Wrapper>
)

export default Tags
