const {GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql')
const {getTitle, getQuestions} = require('./resolvers')

const QuestionType = new GraphQLObjectType({
	name: 'Question',
	fields: {
		title: {
			type: GraphQLString,
			resolve: question => question.title,
		},
		answer: {
			type: GraphQLString,
			resolve: question => question.answer,
		},
	},
})

module.exports = async ({type}) => {
	if (type.name !== 'CampusPost') return {}
	return {
		title: {
			type: GraphQLString,
			resolve: getTitle,
		},
		questions: {
			type: new GraphQLList(QuestionType),
			resolve: getQuestions,
		},
	}
}
