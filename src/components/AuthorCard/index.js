import React from 'react'
import styled from 'styled-components'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'
import Link from '../StylableLink'
import Avatar from '../Avatar'

const Wrapper = styled(Link)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: currentColor;
	position: relative;
	margin-top: 2rem;
`

const Title = styled.div`
	font-size: 1.25rem;
	line-height: 1.5rem;
	color: ${colors.base88};
	${above.md`
		font-size: 1.25rem;
		line-height: 1.75rem;
	`};
`

const AuthorCard = ({slug, name, avatar}) => (
	<Wrapper to={slug}>
		<Avatar avatar={avatar} name={name} />
		{name && <Title>{name}</Title>}
	</Wrapper>
)

export default AuthorCard
