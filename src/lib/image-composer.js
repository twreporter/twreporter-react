const imagePrefix = 'https://www.twreporter.org/data/files/organization/60826/image/derivative/';
const desktopScale = 'scale~1800x0~';
const mobileScale = 'scale~800x0~';
const desktopImagePrefix = imagePrefix + desktopScale;
const mobileImagePrefix = imagePrefix + mobileScale;

export const imageComposer = (article, device) => {
    let image;
    let firstImage = article.firstImage;
    let previewImage = article.previewImage;
    let facebookImage = article.facebookImage;

    if (firstImage && (firstImage.indexOf('.jpg') > -1 || firstImage.indexOf('.png') > -1)) {
        image = firstImage;
    } else {
        image = previewImage;
    }

    let source;
    if (image && (image.indexOf('.jpg') > -1 || image.indexOf('.png') > -1)) {
        const regex = /.+~(.+)/;
        source = image.match(regex);
        source = source ? source[1] : '';
    }

    if (!source) {
        source = facebookImage;
    }
    // display logo when the image is empty
    if (source) {
        image = device === 'desktop' ? desktopImagePrefix + source : mobileImagePrefix + source;
    } else {
        image = '/asset/review.png';
    }

    return image;
}
