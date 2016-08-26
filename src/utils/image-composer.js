'use strict'
import _ from 'lodash'
import { replaceStorageUrlPrefix } from './index'

export const imageComposer = (article) => {
  let image
  let heroImage = article.heroImage
  let facebookImage = article.ogImage

  if (heroImage && heroImage.image) {
    return {
      desktopImage: replaceStorageUrlPrefix(_.get(heroImage, 'image.resizedTargets.desktop.url')),
      mobileImage: replaceStorageUrlPrefix(_.get(heroImage, 'image.resizedTargets.mobile.url'))
    }
  }

  let source
  if (image) {
    const regex = /.+~(.+)/
    source = image.match(regex)
    source = source ? source[1] : ''
  }

  let imageSet = {}
  if (facebookImage && facebookImage.image) {
    imageSet = {
      desktopImage: replaceStorageUrlPrefix(_.get(facebookImage, 'image.resizedTargets.desktop.url')),
      mobileImage: replaceStorageUrlPrefix(_.get(facebookImage, 'image.resizedTargets.mobile.url'))
    }
  } else {
    // display logo when the image is empty
    image = '/asset/review.png'
    imageSet = {
      desktopImage: image,
      mobileImage: image
    }
  }

  return imageSet
}
