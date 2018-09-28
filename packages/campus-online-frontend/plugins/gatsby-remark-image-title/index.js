const visit = require('unist-util-visit')

const toClassNameArray = input => {
	if(Array.isArray(input)) return input.filter(x => x && typeof x === 'string')
	if(typeof input === 'string') return input.split(' ')
	return []
}

const hastElement = (hName, className) => ({
	hName, hProperties: {className: toClassNameArray(className)},
})

module.exports = ({markdownAST}, {
	figureClassName = 'md-figure',
	captionClassName = 'md-figure-caption',
}) => {
	visit(markdownAST, 'image', node => {
		if(String(node.alt) === 'null') delete node.alt
		if(String(node.alt) === 'undefined') delete node.alt
		if(!node.alt) return delete node.alt

		const image = {...node, alt: null}
		const caption = {
			type: 'paragraph',
			children: [{type: 'text', value: node.alt}],
			data: hastElement('figcaption', captionClassName),
		}

		node.type = 'blockquote'
		node.data = hastElement('figure', figureClassName)
		node.children = [image, caption]
		delete node.alt
		delete node.title
		delete node.url
	})
}
