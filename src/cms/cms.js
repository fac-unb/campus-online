import CMS from 'netlify-cms'
import AboutPagePreview from '../templates/about-page/preview'
import BlogPostPreview from '../templates/blog-post/preview'
import withStyleSheet from './withStyleSheet'

window.___loader = window.___loader || {enqueue: () => undefined}

CMS.registerPreviewTemplate('about', withStyleSheet(AboutPagePreview))
CMS.registerPreviewTemplate('blog', withStyleSheet(BlogPostPreview))
