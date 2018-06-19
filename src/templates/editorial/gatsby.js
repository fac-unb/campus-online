import {mapProps} from 'recompose'
import flattenEditorialInfo from '../../fragments/EditorialInfo'
import EditorialPage from '.'

const enhance = mapProps(({data: {editorial}}) => ({
	...flattenEditorialInfo(editorial),
	content: editorial.content,
}))

export default enhance(EditorialPage)

export const pageQuery = graphql`
	query EditorialByID($id: String!) {
		editorial: markdownRemark(id: {eq: $id}) {
			...EditorialInfo
			content: html
		}
	}
`
