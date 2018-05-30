import styled from 'styled-components'
import {colors, fonts} from '../constants'
import {above} from '../utils/responsive'

const lineHeight = 2

const Text = styled.div`
	font-size: 1.25rem;
	line-height: ${lineHeight}rem;
	margin-bottom: 4rem;
	font-family: ${fonts.serifText};

	strong{
		font-weight: bold
	}

	*+*{
		margin-top: ${lineHeight}rem;
	}

	h1, h2, h3{
		margin-top: ${2 * lineHeight}rem;
		${above.lg`
			:before{
				transform: translateX(-100%);;
				margin-left: -0.5rem;
				font-weight: 500;
				position: absolute;;
				opacity: 0.25;
			}
		`}
	}

	h1+h2, h1+h3, h2+h1, h2+h3, h3+h1, h3+h2{
		margin-top: ${lineHeight}rem;
	}

	h1{
		font-size: 1.5rem;
		hyphens: none;
		${above.lg`
			:before{
				content: '#';
			}
		`}
	}

	h2 {
		hyphens: none;
		font-size: 1.25rem;
		color: ${colors.base44};
		position: relative;;
		${above.lg`
			:before{
				content: '##';
			}
		`}

	h3{
		${above.lg`
			:before{
				content: '###';
			}
		`}
	}


	a{
		color: currentColor;
		box-shadow: 0px 1px ${colors.base66};
		:hover{
			color: ${colors.base44};
			box-shadow: 0px 1px ${colors.base03};
		}
	}

	blockquote{
		hyphens: none;
		border-left: 3px solid ${colors.base88};
		font-size: 1.25em;
		padding: 1rem 0 1rem 1.25rem;
		${above.lg`
			margin-left: -1.25em;
		`}
		a{
			box-shadow: 0px 2px ${colors.base66};
			:hover{
				box-shadow: 0px 2px ${colors.base03};
			}
		}
	}

	hr{
		border: 1px dashed ${colors.base88};
		margin-top: ${1.5 * lineHeight}rem;
		margin-bottom: ${1.5 * lineHeight}rem;
		height: 0;
		${above.md`
			margin-left: 0;
			width: 20%;
		`}
	}

	li{
		margin-left: 1.1em;
		margin-top: ${0.5 * lineHeight}rem;
		:before{
			position: absolute;
			color: ${colors.base44};
			font-weight: 600;
			margin-left: -1.25rem;
			${above.lg`
				margin-left: 0;
			`}
		}
	}

	em{
		font-style: italic;;
		letter-spacing: -0.25px;
	}

	img{
		width: 100%;
	}

`

export default Text
