import {Component} from 'react'
import windowSize from 'react-window-size'
import {breakpoints} from '../../constants'

class MediaQuery extends Component {
	state = {visible: false}
	static defaultProps = {above: 0, inverse: false}
	static getDerivedStateFromProps({above, windowWidth = -1, inverse}, state) {
		const {width: min} = breakpoints[above] || {width: above || 0}
		const vis = windowWidth >= min
		const visible = inverse ? !vis : vis
		return state.visible === visible ? null : {visible}
	}
	render() {
		const {visible} = this.state
		const {render, children = render} = this.props
		if (typeof children === 'function') return children(visible)
		return visible ? children || null : null
	}
}

// [TODO]: move window width to global context
export default windowSize(MediaQuery)
