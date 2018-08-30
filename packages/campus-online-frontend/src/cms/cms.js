import CMS from 'netlify-cms'
import {nest, compose} from 'recompose'
import {StaticRouter} from 'react-router'
import AboutPagePreview from '../templates/about-page/preview'
import BlogPostPreview from '../templates/blog-post/preview'
import AuthorWidget from './widgets/Author'
import EditorialWidget from './widgets/Editorial'
import SemesterWidget from './widgets/Semester'
import withStyleSheet from './withStyleSheet'

const withStaticRouting = Component => nest(StaticRouter, Component)

window.___loader = window.___loader || {enqueue: () => undefined}

const enhance = compose(
	withStyleSheet,
	withStaticRouting,
)

CMS.registerPreviewTemplate('about', enhance(AboutPagePreview))
CMS.registerPreviewTemplate('blog', enhance(BlogPostPreview))
CMS.registerWidget('author', AuthorWidget)
CMS.registerWidget('editorial', EditorialWidget)
CMS.registerWidget('semester', SemesterWidget)
