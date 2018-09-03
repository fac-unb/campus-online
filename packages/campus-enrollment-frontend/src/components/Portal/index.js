import ReactDOM from 'react-dom'

const Portal = ({children}) => {
	if (typeof document === 'undefined') return null
	const root = document.getElementById('portal-root')
	return ReactDOM.createPortal(children, root)
}

export default Portal
