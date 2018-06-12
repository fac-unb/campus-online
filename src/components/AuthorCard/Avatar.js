import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'

const initials = name =>
	(name.includes(' ')
		? name
				.split(' ')
				.slice(0, 2)
				.map(word => word[0])
				.join('')
		: name.slice(0, 2)
	).toUpperCase()

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	object-fit: cover;
	overflow: hidden;
	width: 3rem;
	height: 3rem;
	background: ${colors.base06};
	font-weight: 700;
	letter-spacing: 0.1em;
	font-size: 0.875rem;
	color: ${colors.base44};
	text-align: center;
	border-radius: 2rem;
	margin-right: 1rem;
`

const Image = styled.img`
	display: block;
	object-fit: cover;
	min-height: 100%;
	min-width: 100%;
	flex: 1;
`

const Avatar = ({name, avatar}) => (
	<Wrapper>
		{avatar && <Image src={avatar} />}
		{!avatar && initials(name)}
	</Wrapper>
)

export default Avatar
