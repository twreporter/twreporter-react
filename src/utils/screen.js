import deviceConst from '../constants/device'
import sz from '../constants/screen-size'

export function getScreenType(width) {
  if(width <= sz.smallScreenMaxWidth) {
    return deviceConst.type.mobile
  } else if (width >= sz.mediumScreenMinWidth  && width <= sz.mediumScreenMaxWidth) {
    return deviceConst.type.tablet
  } else {
    return deviceConst.type.desktop
  }
}

