import React from 'react'
import styled from 'styled-components/macro'
import {colors} from '../../constants'
import {above} from '../../utils/responsive'

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 1rem 1rem 1.75rem;
	border-top: 2px dashed ${colors.base11};
	border-bottom: 2px dashed ${colors.base11};
	${above.md`
		padding: 2rem 1.5rem;
	`}
`

const Emoji = styled.div`
	margin-right: 2rem;
	font-size: 2.5rem;
	${above.md`
		font-size: 4rem;
	`}
`

const Text = styled.div``

const Title = styled.div`
	color: ${colors.base66};
	font-weight: 500;
	font-size: 1.5rem;
	line-height: 1.25;
	${above.md`
		font-size: 2rem;
	`}
`

const Description = styled.div`
	color: ${colors.base22};
	font-size: 1.125rem
	strong{
		text-decoration: underline;
	}
	${above.md`
		font-size: 1.5rem
	`}
`


const EmptyState = () => (
	<Wrapper>
		<Emoji>
			<span role='img' aria-label='point up'>👆</span>
			<span role='img' aria-label='write'>📝</span>
		</Emoji>
		<Text>
			<Title>use o formulário acima para adicionar alunos </Title>
			<Description>
				<strong>nome</strong>,&nbsp;
				<em>tab</em>,&nbsp;
				<strong>email</strong>,&nbsp;
				<em>enter</em>
				. ✨
			</Description>
		</Text>
	</Wrapper>
)

export default EmptyState
