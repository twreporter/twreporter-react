import { useState, useEffect, useRef } from 'react'
import { matchPath } from 'react-router-dom'
import localForage from 'localforage'
import dayjs from 'dayjs'
// constants
import routes from '../constants/routes'
// lodash
import some from 'lodash/some'
import map from 'lodash/map'
const _ = {
  some,
  map,
}

const webpushType = 'WEB_PUSH'
const webpushKey = 'webpush-promo'
const useWebpush = (pathname, isSubscribed, showHamburger) => {
  const [isShowPromo, setIsShowPromo] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  // clear status when initializing
  // todo: move status info to redux state after redux upgrading to v9
  useEffect(() => {
    clearPromoStatus()
  }, [])
  const setPromoStatus = async () => {
    await localForage.setItem(`${webpushKey}-status`, webpushType)
  }
  const clearPromoStatus = async () => {
    await localForage.removeItem(`${webpushKey}-status`)
  }
  const checkPromoPriority = async () => {
    const membershipPromoStatus = await localForage.getItem(
      'membership-promo-status'
    )
    return membershipPromoStatus !== 'popup'
  }
  const closePromo = async () => {
    setIsShowPromo(false)
    await localForage.setItem(
      webpushKey,
      dayjs()
        .add(15, 'day')
        .format()
    )
    await clearPromoStatus()
  }
  const openPromo = async () => {
    const nextShowDate = await localForage.getItem(webpushKey)
    if (nextShowDate && dayjs().isBefore(dayjs(nextShowDate))) {
      return
    }

    const isValid = await checkPromoPriority()
    if (!isValid) {
      return
    }
    await setPromoStatus(webpushType)
    setIsShowPromo(true)
    setIsOpened(true)
  }
  const timerId = useRef()
  const isPathShowPopup = pathname => {
    const {
      homePage,
      topicListPage,
      categoryListPage,
      latestPage,
      articlePage,
    } = routes
    return _.some(
      _.map(
        [homePage, topicListPage, categoryListPage, latestPage, articlePage],
        ({ path }) => ({ path, exact: true })
      ),
      route => matchPath(pathname, route)
    )
  }

  useEffect(() => {
    if (timerId.current) {
      window.clearTimeout(timerId.current)
    }
    if (
      !isOpened &&
      !isSubscribed &&
      !showHamburger &&
      isPathShowPopup(pathname)
    ) {
      timerId.current = window.setTimeout(openPromo, 3000)
    }
  }, [pathname, showHamburger, isOpened, isSubscribed])

  return { isShowPromo, closePromo, openPromo }
}

export default useWebpush
