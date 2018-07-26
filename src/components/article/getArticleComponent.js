// polyfill webpack require.ensure for node environment
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import { AlignedImage } from './Image'
import { AlignedInfoBox } from './InfoBox'
import { Annotation } from './Annotation'
import { HeaderOne } from './HeaderOne'
import { HeaderTwo } from './HeaderTwo'
import { Paragraph } from './Paragraph'
import Loadable from 'react-loadable'
import React from 'react'

const modulePlaceHolder = null

const audioLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "audio" */
    './Audio'
  ),
  render(loaded, props) {
    const { Audio } = loaded
    return <Audio {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const blockquoteLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "blockquote" */
    './BlockQuote'
  ),
  render(loaded, props) {
    const { BlockQuote } = loaded
    return <BlockQuote {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const quotebyLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "quoteby" */
    './BlockQuote'
  ),
  render(loaded, props) {
    const { AlignedQuoteBy } = loaded
    return <AlignedQuoteBy {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const embeddedCodeLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "embeddedcode" */
    './Embedded'
  ),
  render(loaded, props) {
    const { AlignedEmbedded } = loaded
    return <AlignedEmbedded {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const imageDiffLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "imagediff" */
    './ImageDiff'
  ),
  render(loaded, props) {
    const { AlignedImageDiff } = loaded
    return <AlignedImageDiff {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const orderedListLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "imagediff" */
    './OrderedList'
  ),
  render(loaded, props) {
    const { OrderedList } = loaded
    return <OrderedList {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const unorderedListLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "unorderedlist" */
    './UnorderedList'
  ),
  render(loaded, props) {
    const { UnorderedList } = loaded
    return <UnorderedList {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const slideshowLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "slideshow" */
    './slideshow/slideshow'
  ),
  render(loaded, props) {
    const { Slideshow } = loaded
    return <Slideshow {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

const youtubeLoadable = Loadable({
  loader: () => import(
    /* webpackChunkName: "youtube" */
    './Youtube'
  ),
  render(loaded, props) {
    const { AlignedYoutube } = loaded
    return <AlignedYoutube {...props}/>
  },
  loading() {
    return modulePlaceHolder
  }
})

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'annotation':
      return Annotation
    case 'audio':
      return audioLoadable
    case 'blockquote':
      return blockquoteLoadable
    case 'quoteby':
      return quotebyLoadable
    case 'header-one':
      return HeaderOne
    case 'header-two':
      return HeaderTwo
    case 'code':
      return null
    case 'embeddedCode':
    case 'embeddedcode':
      return embeddedCodeLoadable
    case 'image':
      return AlignedImage
    case 'imageDiff':
    case 'imagediff':
      return imageDiffLoadable
    case 'infobox':
      return AlignedInfoBox
    case 'ordered-list-item':
      return orderedListLoadable
    case 'unordered-list-item':
      return unorderedListLoadable
    case 'unstyled':
      return Paragraph
    case 'slideshow':
      return slideshowLoadable
    case 'youtube':
      return youtubeLoadable
    default:
      return
  }
}
