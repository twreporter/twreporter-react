import deviceConst from '../constants/device'
import screen from '../constants/screen'

/**
 *
 *
 * @export
 * @param {number} width
 * @returns {string}
 */
export default function getScreenType(width) {
  if (width < screen.tablet.minWidth) {
    return deviceConst.type.mobile
  } else if (width < screen.desktop.minWidth) {
    return deviceConst.type.tablet
  } else {
    return deviceConst.type.desktop
  }
}

