/* eslint-env node */
module.exports = {
	siteMetadata: {
		title: 'Campus Online',
	},
	mapping: {
		'MarkdownRemark.fields.author': 'MarkdownRemark',
		'MarkdownRemark.fields.editorial': 'MarkdownRemark',
		'MarkdownRemark.fields.posts': 'MarkdownRemark',
	},
	plugins: [
		'gatsby-plugin-styled-components',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: '#29d',
				showSpinner: false,
			},
		},
		{
			resolve: 'gatsby-plugin-eslint',
			options: {
				test: /\.js$|\.jsx$/,
				exclude: /(node_modules|cache|public)/,
				options: {
					emitWarning: true,
					failOnError: false,
				},
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/uploads`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-relative-images',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 761,
							linkImagesToOriginal: false,
						},
					},
					'gatsby-remark-external-links',
					'gatsby-remark-responsive-iframe',
				],
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-transformer-campus-post',
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
}
