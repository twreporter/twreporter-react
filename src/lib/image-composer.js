const imagePrefix = 'https://www.twreporter.org/data/files/organization/60826/image/derivative/';
const desktopScale = 'scale~1200x0~';
const mobileScale = 'scale~1200x0~';
const desktopImagePrefix = imagePrefix + desktopScale;
const mobileImagePrefix = imagePrefix + mobileScale;

const isImage = (image) => {
  if (image && (image.indexOf('.jpg') > -1 || image.indexOf('.png') > -1 || image.indexOf('.gif') > -1)) {
    return true;
  } else {
    return false
  }
}

export const imageComposer = (article, device) => {
    let image;
    let firstImage = article.firstImage;
    let previewImage = article.previewImage;
    let facebookImage = article.facebookImage;

    if (facebookImage) {
        return device === 'desktop' ? desktopImagePrefix + facebookImage : mobileImagePrefix + facebookImage;
    }

    if (isImage(firstImage)) {
        image = firstImage;
    } else if (isImage(previewImage)) {
        image = previewImage;
    }

    let source;
    if (image) {
        const regex = /.+~(.+)/;
        source = image.match(regex);
        source = source ? source[1] : '';
    }

    // display logo when the image is empty
    if (source) {
        image = device === 'desktop' ? desktopImagePrefix + source : mobileImagePrefix + source;
    } else {
        image = '/asset/review.png';
    }

    return image;
}
