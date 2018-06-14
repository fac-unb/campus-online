import CMS from 'netlify-cms'
import AboutPagePreview from '../templates/about-page/preview'
import BlogPostPreview from '../templates/blog-post/preview'
import AuthorWidget from './widgets/Author'
import EditorialWidget from './widgets/Editorial'
import SemesterWidget from './widgets/Semester'

import withStyleSheet from './withStyleSheet'

window.___loader = window.___loader || {enqueue: () => undefined}

CMS.registerPreviewTemplate('about', withStyleSheet(AboutPagePreview))
CMS.registerPreviewTemplate('blog', withStyleSheet(BlogPostPreview))
CMS.registerWidget('author', AuthorWidget)
CMS.registerWidget('editorial', EditorialWidget)
CMS.registerWidget('semester', SemesterWidget)
