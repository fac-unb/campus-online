import React, {Component} from 'react'
import {StyleSheetManager} from 'styled-components'
import resetCSS from '!raw!../reset.css'
import fontsCSS from '!raw!../fonts.css'
import {Wrapper} from '../layouts'

const css = [resetCSS, fontsCSS].join('\n')

class StyleSheetWrapper extends Component {
	state = {$head: null}
	componentDidMount() {
		const $iframe = document.querySelector('.nc-previewPane-frame')
		const $head = $iframe.contentDocument.head
		const $style = document.createElement('style')
		$style.appendChild(document.createTextNode(css))
		$head.appendChild($style)
		this.setState(state => ({...state, $head}))
	}
	render() {
		const {children} = this.props
		const {$head} = this.state
		if (!$head) return children
		return (
			<StyleSheetManager target={$head}>
				<Wrapper>{children}</Wrapper>
			</StyleSheetManager>
		)
	}
}

const withStyleSheet = WrappedComponent => {
	return class extends Component {
		render() {
			return (
				<StyleSheetWrapper>
					<WrappedComponent {...this.props} />
				</StyleSheetWrapper>
			)
		}
	}
}

export default withStyleSheet
