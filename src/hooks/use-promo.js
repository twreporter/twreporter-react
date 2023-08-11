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
const usePromo = (pathname, isAuthed) => {
  const [isShowPromo, setIsShowPromo] = useState(false)
  const [promoType, setPromoType] = useState(PromoType.POPUP)
  const closePromo = async () => {
    document.body.classList.remove('disable-scroll')
    setIsShowPromo(false)
    await localForage.setItem(
      'membership-promo',
      dayjs()
        .add(15, 'day')
        .format()
    )
  }
  const openPromo = async () => {
    const nextShowDate = await localForage.getItem('membership-promo')
    if (nextShowDate) {
      setPromoType(PromoType.BANNER)
    } else {
      document.body.classList.add('disable-scroll')
    }

    if (!nextShowDate || dayjs().isAfter(dayjs(nextShowDate))) {
      setIsShowPromo(true)
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
    if (isAuthed) {
      return
    }
    if (isPathShowPopup(pathname)) {
      timerId.current = window.setTimeout(openPromo, 3000)
    }
  }, [pathname])

  return { isShowPromo, closePromo, openPromo, promoType, PromoType }
}

export default usePromo
