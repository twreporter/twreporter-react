export const imageComposer = (article) => {
  let image
  let heroImage = article.heroImage
  let facebookImage = article.ogImage

  if (heroImage && heroImage.image) {
    return {
      desktopImage: heroImage.image.resizedTargets.desktop.url,
      mobileImage: heroImage.image.resizedTargets.mobile.url
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
      desktopImage: facebookImage.image.resizedTargets.desktop.url,
      mobileImage: facebookImage.image.resizedTargets.mobile.url
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
