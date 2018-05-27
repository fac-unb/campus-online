import CMS from 'netlify-cms'
import AboutPagePreview from '../templates/about-page/preview'
import BlogPostPreview from '../templates/blog-post/preview'
import ProductPagePreview from '../templates/product-page/preview'
import withStyleSheet from './withStyleSheet'

global.___loader = global.___loader || {enqueue: () => undefined}

CMS.registerPreviewTemplate('about', withStyleSheet(AboutPagePreview))
CMS.registerPreviewTemplate('products', withStyleSheet(ProductPagePreview))
CMS.registerPreviewTemplate('blog', withStyleSheet(BlogPostPreview))
