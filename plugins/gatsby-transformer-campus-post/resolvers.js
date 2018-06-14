const fp = require('lodash/fp')
const {parse, nodeToHTML, reduceWith} = require('./utils')

const getAST = fp.flow([
	fp.getOr('', 'internal.content'),
	parse,
	fp.getOr([], 'children'),
])

const isH1 = fp.matches({type: 'heading', depth: 1})
const isH2 = fp.matches({type: 'heading', depth: 2})

const segregate = questions => [fp.initial(questions), fp.last(questions)]

const actions = {
	create: (questions = [], node) => [...questions, {title: nodeToHTML(node)}],
	append: (questions = [], node) => {
		const [before, {title, children = []}] = segregate(questions)
		return [...before, {title, children: [...children, node]}]
	},
}

module.exports = {
	getTitle: fp.flow([getAST, fp.find(isH1), nodeToHTML]),
	getQuestions: fp.flow([
		getAST,
		fp.dropWhile(isH1),
		reduceWith(node => actions[isH2(node) ? 'create' : 'append']),
		fp.map(({title, children}) => ({title, answer: nodeToHTML({children})})),
	]),
}
