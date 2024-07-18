import { useState, useEffect, useRef } from 'react'
import { matchPath } from 'react-router-dom'
import localForage from 'localforage'
import * as dayjs from 'dayjs'
// constants
import routes from '../constants/routes'
// lodash
import some from 'lodash/some'
import map from 'lodash/map'
const _ = {
  some,
  map,
}

const PromoType = {
  POPUP: 'popup',
  BANNER: 'banner',
}
const usePromo = (pathname, isAuthed, showHamburger) => {
  const [isShowPromo, setIsShowPromo] = useState(false)
  const [isOpened, setIsOpened] = useState(false)
  const [promoType, setPromoType] = useState(PromoType.POPUP)

  // clear status when initializing
  // todo: move status info to redux state after redux upgrading to v9
  useEffect(() => {
    clearPromoStatus()
  }, [])

  const setPromoStatus = async promoType => {
    await localForage.setItem('membership-promo-status', promoType)
  }
  const clearPromoStatus = async () => {
    await localForage.removeItem('membership-promo-status')
  }
  const wait = async ms => {
    await new Promise((resolve, reject) => setTimeout(resolve, ms))
  }
  const checkPromoPriority = async promo => {
    if (promo === PromoType.POPUP) {
      return true
    }
    await wait(300)
    const webpushPromoStatus = await localForage.getItem('webpush-promo-status')
    return !webpushPromoStatus
  }
  const closePromo = async () => {
    document.body.classList.remove('disable-scroll')
    setIsShowPromo(false)
    await localForage.setItem(
      'membership-promo',
      dayjs()
        .add(15, 'day')
        .format()
    )
    clearPromoStatus()
  }
  const openPromo = async () => {
    const nextShowDate = await localForage.getItem('membership-promo')
    if (nextShowDate && dayjs().isBefore(dayjs(nextShowDate))) {
      return
    }

    const nextPromoType = nextShowDate ? PromoType.BANNER : PromoType.POPUP
    const isValid = await checkPromoPriority(nextPromoType)
    if (!isValid) {
      return
    }

    await setPromoStatus(nextPromoType)
    setPromoType(nextPromoType)
    setIsShowPromo(true)
    setIsOpened(true)
    if (nextPromoType === PromoType.POPUP) {
      document.body.classList.add('disable-scroll')
    }
  }
  const timerId = useRef()
  const isPathShowPopup = pathname => {
    const { homePage, topicListPage, categoryListPage, latestPage } = routes
    return _.some(
      _.map(
        [homePage, topicListPage, categoryListPage, latestPage],
        ({ path }) => ({ path, exact: true })
      ),
      route => matchPath(pathname, route)
    )
  }

  useEffect(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current)
    }
    if (!isOpened && !isAuthed && !showHamburger && isPathShowPopup(pathname)) {
      timerId.current = window.setTimeout(openPromo, 3000)
    }
  }, [pathname, showHamburger, isOpened])

  return { isShowPromo, closePromo, openPromo, promoType, PromoType }
}

export default usePromo
