import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import Link from '../StylableLink'

const Wrapper = styled.div`
	display: flex;
	line-height: 1.5rem;
	align-items: baseline;
	margin-left: -1rem;
	margin-right: -1rem;
	overflow: hidden;
`

const Title = styled(Link)`
	display: block;
	position: relative;
	z-index: 1;
	font-weight: 500;
	color: currentColor;
	text-decoration: none;
	padding: 1rem;
	&:after {
		content: '';
		background: linear-gradient(to left, transparent, ${colors.base});
		position: absolute;
		height: 100%;
		left: 100%;
		width: 3rem;
	}
`

// [TODO]: black magic scroll bars and dynamic shadows
const List = styled.ul`
	display: flex;
	overflow: scroll;
	flex: 1;
`

const Item = styled(Link)`
	color: currentColor;
	display: block;
	text-decoration: none;
	font-size: 0.75rem;
	text-transform: uppercase;
	font-weight: 600;
	padding: 1rem;
	white-space: nowrap;
	opacity: 0.66;
	&:hover {
		opacity: 1;
	}
`

const ShowMore = styled.div`
	display: block;
	cursor: pointer;
	position: relative;
	padding: 1rem;
	&:before {
		content: '';
		background: linear-gradient(to right, transparent, ${colors.base});
		position: absolute;
		height: 100%;
		right: 100%;
		width: 3rem;
	}
`

const ScrollList = ({title, to, list, style, className}) => (
	<Wrapper to={to} style={style} className={className}>
		<Title>{title}</Title>
		<List>
			{list.map(({label, url}) => (
				<li key={url}>
					<Item to={url}>{label}</Item>
				</li>
			))}
		</List>
		<ShowMore>···</ShowMore>
	</Wrapper>
)

export default ScrollList
