const imagePrefix = 'https://atavist.com/data/files/organization/60826/image/derivative/'
const desktopScale = 'scale~2000x0~'
const mobileScale = 'scale~1200x0~'
const desktopImagePrefix = imagePrefix + desktopScale
const mobileImagePrefix = imagePrefix + mobileScale

const isImage = (image) => {
  if (image && (image.indexOf('.jpg') > -1 || image.indexOf('.png') > -1 || image.indexOf('.gif') > -1)) {
    return true
  } else {
    return false
  }
}

export const imageComposer = (article) => {
  let image
  let firstImage = article.firstImage
  let previewImage = article.previewImage
  let facebookImage = article.facebookImage

  if (facebookImage) {
    return {
      desktopImage: desktopImagePrefix + facebookImage,
      mobileImage: mobileImagePrefix + facebookImage
    }
  }

  if (isImage(firstImage)) {
    image = firstImage
  } else if (isImage(previewImage)) {
    image = previewImage
  }

  let source
  if (image) {
    const regex = /.+~(.+)/
    source = image.match(regex)
    source = source ? source[1] : ''
  }

  let imageSet = {}
  if (source) {
    imageSet = {
      desktopImage: desktopImagePrefix + source,
      mobileImage: mobileImagePrefix + source
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
