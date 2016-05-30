export const imageComposer = (article) => {
  let image
  let heroImage = article.heroImage[0]
  let facebookImage = article.ogImage[0]

  if (heroImage) {
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
  if (facebookImage) {
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
