'use strict'

import { AlignedImage } from './Image'
import { AlignedInfoBox } from './InfoBox'
import { Annotation } from './Annotation'
import { HeaderOne } from './HeaderOne'
import { HeaderTwo } from './HeaderTwo'
import { Paragraph } from './Paragraph'
import Loadable from 'react-loadable'
import React from 'react'

const modulePlaceHolder = null

export default function getArticleComponent(type = 'unstyled') {
  switch (type) {
    case 'annotation':
      return Annotation
    case 'audio':
      return Loadable({
        loader: () => import(
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
    case 'blockquote':
      return Loadable({
        loader: () => import('./BlockQuote'),
        render(loaded, props) {
          const { BlockQuote } = loaded
          return <BlockQuote {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'quoteby':
      return Loadable({
        loader: () => import('./BlockQuote'),
        render(loaded, props) {
          const { AlignedQuoteBy } = loaded
          return <AlignedQuoteBy {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'header-one':
      return HeaderOne
    case 'header-two':
      return HeaderTwo
    case 'code':
      return null
    case 'embeddedCode':
    case 'embeddedcode':
      return Loadable({
        loader: () => import('./Embedded'),
        render(loaded, props) {
          const { AlignedEmbedded } = loaded
          return <AlignedEmbedded {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'image':
      return AlignedImage
    case 'imageDiff':
    case 'imagediff':
      return Loadable({
        loader: () => import('./ImageDiff'),
        render(loaded, props) {
          const { AlignedImageDiff } = loaded
          return <AlignedImageDiff {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'infobox':
      return AlignedInfoBox
    case 'ordered-list-item':
      return Loadable({
        loader: () => import('./OrderedList'),
        render(loaded, props) {
          const { OrderedList } = loaded
          return <OrderedList {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'unordered-list-item':
      return Loadable({
        loader: () => import('./UnorderedList'),
        render(loaded, props) {
          const { UnorderedList } = loaded
          return <UnorderedList {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'unstyled':
      return Paragraph
    case 'slideshow':
      return Loadable({
        loader: () => import('./slideshow/slideshow'),
        render(loaded, props) {
          const { Slideshow } = loaded
          return <Slideshow {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    case 'youtube':
      return Loadable({
        loader: () => import('./Youtube'),
        render(loaded, props) {
          const { AlignedYoutube } = loaded
          return <AlignedYoutube {...props}/>
        },
        loading() {
          return modulePlaceHolder
        }
      })
    default:
      return
  }
}
