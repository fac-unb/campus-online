import React from 'react'
import styled, {keyframes} from 'styled-components/macro'
import {withState, branch} from 'recompose'
import {above} from '../../utils/responsive'
import {colors} from '../../constants'
import Portal from '../Portal'
import Overlay from '../Overlay'
import Fixed from '../Fixed'
import DisableWindowScroll from '../DisableWindowScroll'

const Wrapper = styled.div`
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	position: relative;
	justify-content: center;
	padding: 0 0 4rem;
	cursor: pointer;
	pointer-events: none;
	${above.md`
		padding: 0;
	`};
`

const dropAnimation = keyframes`
	from {
		transform: translateY(3rem);
		opacity: 0;
		box-shadow: none;
	}
	to {
		transform: translateY(0);
		opacity: 0.88;
		box-shadow: inherit;
	}
`

const ModalContent = styled.div`
	position: relative;
	border-radius: 0.25rem;
	background: #fff;
	cursor: auto;
	margin: 2rem 1rem;
	animation: ${dropAnimation} 350ms ease;
	transition: 0.35s all;
	z-index: 1;
	pointer-events: auto;
`

const Close = styled.div.attrs({children: '×'})`
	position: relative;
	position: sticky;
	flex: 0;
	font-weight: 300;
	font-family: ${`
		"SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",
		sans-serif,-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,
		sans-serif
	`};
	right: 0.5rem;
	top: 0;
	margin-right: 1rem;
	font-size: 4rem;
	color: ${colors.base88};
	user-select: none;
	line-height: 1;
	z-index: 0;
	display: block;
	text-decoration: none;
	text-align: right;
	align-self: stretch;
	${above.md`
		font-size: 3rem;
		opacity: 0.66;
		position: fixed;
	`}
	${Overlay}:hover + ${Wrapper} > & {
		opacity: 1;
	}
	${ModalContent}:hover + & {
		opacity: 0.66;
	}
`

const Modal = ({
	children,
	isVisible,
	onChangeVisibility,
	style,
	className,
	closeable = true,
	wrapper = true,
}) =>
	!isVisible ? null : (
		<Portal>
			<DisableWindowScroll />
			<Fixed>
				<Overlay
					onClick={closeable ? () => onChangeVisibility(!isVisible) : undefined}
				/>
				<Wrapper>
					{wrapper ? (
						<ModalContent style={style} className={className}>
							{children}
						</ModalContent>
					) : (
						children
					)}
					{closeable && <Close />}
				</Wrapper>
			</Fixed>
		</Portal>
	)

export default branch(
	({onChangeVisibility}) => typeof onChangeVisibility !== 'function',
	withState('isVisible', 'onChangeVisibility', true),
)(Modal)
