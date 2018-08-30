exports.onCreateWebpackConfig = ({actions: {setWebpackConfig}}, {package}) => {
	if(!package || typeof package !== 'string') return
	setWebpackConfig({resolve: {alias: {'netlify-cms': package}}})
}
