import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Route, useLocation, matchPath } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'

// context
import { CoreContext } from '../contexts'

// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  MobileOnly,
  TabletAndAbove,
} from '@twreporter/react-components/lib/rwd'
import twreporterRedux from '@twreporter/redux'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { MEMBER_ROLE } from '@twreporter/core/lib/constants/member-role'
import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'
import EmptyState from '@twreporter/react-components/lib/empty-state'
import RedirectToSignIn from '@twreporter/react-components/lib/bookmark-list/redirect-to-sign-in'
import { OFFLINE_DONATION } from '@twreporter/core/lib/constants/feature-flag'

// components
import MemberMenuList from '../components/member-page/menu-list'
import MemberData from '../components/member-page/member-data'
import MemberRoleCard from '../components/member-page/member-role-card'
import MemberDonationPage from '../components/member-page/donation/index'
import OldMemberDonationPage from '../components/member-page/donation/index-old'
import EmailSubscription from '../components/member-page/email-subscription'
import MobileMemberPage from '../components/member-page/mobile-page/mobile-member-page'
import ExclusiveOffers from '../components/member-page/exclusive-offers'

// constants
import siteMeta from '../constants/site-meta'
import routes from '../constants/routes'

// lodash
import get from 'lodash/get'
import { READING_TIME_UNIT } from '@twreporter/core/lib/constants/reading-time-unit'

const _ = {
  get,
}

const PageContainer = styled.div`
  width: 100%;
  ${mq.mobileOnly`
    padding: 24px 24px 64px;
  `}
  ${mq.tabletAndAbove`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  `}
  ${mq.tabletOnly`
    padding: 32px 32px 200px;
    grid-column-gap: 24px;
  `}
  ${mq.desktopAndAbove`
    padding: 64px 48px 200px;
    grid-column-gap: 32px;
  `}
  ${mq.hdOnly`
    padding: 64px 0px 200px;
    width: 1280px;
    margin: auto;
  `}
`

const MenuContainer = styled.div`
  grid-column: 1 / 3;
`

const ContentContainer = styled.div`
  ${mq.tabletOnly`
    ${props => {
      if (props.$path === routes.memberPage.memberDonationPage.path) {
        return 'grid-column: 3 / 13'
      }
      if (
        props.$path === routes.memberPage.memberEmailSubscriptionPage.path ||
        props.$path === routes.memberPage.exclusiveOffersPage.path
      ) {
        return 'grid-column: 3 / 13'
      }
      if (props.$path === routes.memberPage.path) {
        return 'grid-column: 3 / 10'
      }
      return ''
    }}
  `}
  ${mq.desktopAndAbove`
    ${props => {
      if (props.$path === routes.memberPage.memberDonationPage.path) {
        return 'grid-column: 3 / 13'
      }
      if (
        props.$path === routes.memberPage.memberEmailSubscriptionPage.path ||
        props.$path === routes.memberPage.exclusiveOffersPage.path
      ) {
        return 'grid-column: 3 / 11'
      }
      if (props.$path === routes.memberPage.path) {
        return 'grid-column: 3 / 10'
      }
      return ''
    }}
  `}
  ${mq.mobileOnly`
    padding: 24px 24px 200px;
  `}
`

const RoleCardContainer = styled.div`
  grid-column: 10 / 13;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginContainer = styled.div`
  margin-top: 72px;
  margin-bottom: 120px;
`

const OnlyForGTM = styled.div`
  visibility: hidden;
`

const { actions, reduxStateFields } = twreporterRedux
const { getUserData } = actions

const MemberPage = () => {
  const { pathname } = useLocation()
  const { releaseBranch } = useContext(CoreContext)
  const dispatch = useDispatch()
  const [currentHref, setCurrentHref] = useState('')

  const jwt = useSelector(state =>
    get(state, [reduxStateFields.auth, 'accessToken'], '')
  )
  const isAuthed = useSelector(state =>
    get(state, [reduxStateFields.auth, 'isAuthed'], false)
  )
  const userID = useSelector(state =>
    get(state, [reduxStateFields.auth, 'userInfo', 'user_id'], -1)
  )
  const email = useSelector(state =>
    get(state, [reduxStateFields.user, 'email'])
  )
  const firstName = useSelector(state =>
    get(state, [reduxStateFields.user, 'firstName'])
  )
  const lastName = useSelector(state =>
    get(state, [reduxStateFields.user, 'lastName'])
  )
  const roles = useSelector(state =>
    get(state, [reduxStateFields.user, 'roles'], [])
  )
  const registrationDate = useSelector(state =>
    get(state, [reduxStateFields.user, 'registrationDate'])
  )
  const readPostsCount = useSelector(state =>
    get(state, [reduxStateFields.user, 'readPostsCount'], 0)
  )
  const readPostsSec = useSelector(state =>
    get(state, [reduxStateFields.user, 'readPostsSec'], 0)
  )
  const isPeriodicPatron = useSelector(state =>
    get(state, [reduxStateFields.user, 'isPeriodicPatron'])
  )

  const memberData = {
    email,
    name: `${lastName}${firstName}`,
    role: {
      ...roles[0],
      key: roles[0]?.key ? MEMBER_ROLE[roles[0].key] : MEMBER_ROLE.explorer,
    },
    joinDate: date2yyyymmdd(registrationDate, '/'),
  }

  const isEmailSubscription = matchPath(pathname, {
    path: routes.memberPage.memberEmailSubscriptionPage.path,
    exact: true,
  })

  useEffect(() => {
    // check authorization
    // redirect to singin page if user has not been authorized
    setCurrentHref(typeof window === 'undefined' ? '' : window.location.href)
    if ((!isAuthed || !jwt) && !isEmailSubscription) {
      setTimeout(() => {
        window.location.href = getSignInHref(currentHref)
      }, 2000)
    }
    // force to get data while CSR
    dispatch(getUserData(jwt, userID))
  }, [])

  if (!isAuthed || !jwt) {
    if (isEmailSubscription) {
      return (
        <LoginContainer>
          <EmptyState
            style={EmptyState.Style.DEFAULT}
            title="請先登入/註冊"
            guide="登入《報導者》網站，即可免費訂閱報導精選與幕後電子報。"
            buttonText="立即登入"
            buttonUrl={getSignInHref(currentHref)}
            releaseBranch={releaseBranch}
          />
        </LoginContainer>
      )
    } else {
      return <RedirectToSignIn>您尚未登入，將跳轉至登入頁</RedirectToSignIn>
    }
  }

  const getSiteTitle = pathname => {
    if (matchPath(pathname, routes.memberPage.memberDonationPage.path)) {
      return '贊助紀錄'
    } else if (
      matchPath(pathname, routes.memberPage.memberEmailSubscriptionPage.path)
    ) {
      return '訂閱電子報'
    } else if (
      matchPath(pathname, routes.memberPage.exclusiveOffersPage.path)
    ) {
      return '專屬優惠'
    } else {
      return '個人專區'
    }
  }

  const titleText = getSiteTitle(pathname)
  const title = titleText + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}${pathname}`
  const roleKey = _.get(memberData, 'role.key', '')

  const getReadingTimeAndUnit = readingSec => {
    const minutes = Math.floor(readingSec / 60)
    if (minutes < 10000) {
      return {
        articleReadingTime: minutes,
        articleReadingTimeUnit: READING_TIME_UNIT.minute,
      }
    } else if (minutes < 1000 * 60) {
      const hours = Math.floor(minutes / 60)
      return {
        articleReadingTime: hours,
        articleReadingTimeUnit: READING_TIME_UNIT.hour,
      }
    } else {
      const days = Math.floor(minutes / (60 * 24))
      return {
        articleReadingTime: days,
        articleReadingTimeUnit: READING_TIME_UNIT.day,
      }
    }
  }

  const { articleReadingTime, articleReadingTimeUnit } = getReadingTimeAndUnit(
    readPostsSec
  )

  return (
    <div>
      <Helmet
        title={title}
        link={[{ rel: 'canonical', href: canonical }]}
        meta={[
          { name: 'description', content: siteMeta.desc },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: siteMeta.desc },
          { name: 'twitter:image', content: siteMeta.ogImage.url },
          { property: 'og:title', content: title },
          { property: 'og:description', content: siteMeta.desc },
          { property: 'og:image', content: siteMeta.ogImage.url },
          { property: 'og:image:width', content: siteMeta.ogImage.width },
          { property: 'og:image:height', content: siteMeta.ogImage.height },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: canonical },
        ]}
      />
      <TabletAndAbove>
        <PageContainer>
          <MenuContainer>
            <MemberMenuList role={memberData.role} />
          </MenuContainer>
          <ContentContainer $path={pathname}>
            <Switch>
              <Route exact path={routes.memberPage.path}>
                <MemberData
                  role={memberData.role}
                  email={memberData.email}
                  joinDate={memberData.joinDate}
                  name={memberData.name || ''}
                  hideInfo={false} // change after user agree data collection
                  articleReadCount={readPostsCount}
                  articleReadingTime={articleReadingTime}
                  articleReadingTimeUnit={articleReadingTimeUnit}
                />
              </Route>
              <Route path={routes.memberPage.memberDonationPage.path}>
                {OFFLINE_DONATION ? (
                  <MemberDonationPage />
                ) : (
                  <OldMemberDonationPage />
                )}
              </Route>
              <Route path={routes.memberPage.memberEmailSubscriptionPage.path}>
                <EmailSubscription />
              </Route>
              <Route path={routes.memberPage.exclusiveOffersPage.path}>
                <ExclusiveOffers
                  role={memberData.role}
                  isPeriodicPatron={isPeriodicPatron}
                />
              </Route>
            </Switch>
          </ContentContainer>
          <Route exact path={routes.memberPage.path}>
            <RoleCardContainer>
              <MemberRoleCard roleKey={memberData.role.key} />
            </RoleCardContainer>
          </Route>
        </PageContainer>
      </TabletAndAbove>
      <MobileOnly>
        <Route exact path={routes.memberPage.path}>
          <PageContainer>
            <MobileMemberPage
              role={memberData.role}
              email={memberData.email}
              joinDate={memberData.joinDate}
              name={memberData.name || ''}
              hideInfo={false} // change after user agree data collection
              articleReadCount={readPostsCount}
              articleReadingTime={articleReadingTime}
              articleReadingTimeUnit={articleReadingTimeUnit}
            />
          </PageContainer>
        </Route>
        <Switch>
          <Route path={routes.memberPage.memberDonationPage.path}>
            <ContentContainer>
              {OFFLINE_DONATION ? (
                <MemberDonationPage />
              ) : (
                <OldMemberDonationPage />
              )}
            </ContentContainer>
          </Route>
          <Route path={routes.memberPage.memberEmailSubscriptionPage.path}>
            <ContentContainer>
              <EmailSubscription />
            </ContentContainer>
          </Route>
          <Route path={routes.memberPage.exclusiveOffersPage.path}>
            <ContentContainer>
              <ExclusiveOffers
                role={memberData.role}
                isPeriodicPatron={isPeriodicPatron}
              />
            </ContentContainer>
          </Route>
        </Switch>
      </MobileOnly>
      <OnlyForGTM id="role-key">{roleKey}</OnlyForGTM>
    </div>
  )
}

MemberPage.propTypes = {
  memberData: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.shape({
      id: PropTypes.string,
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      name_en: PropTypes.string,
    }),
    joinDate: PropTypes.string,
  }),
  isAuthed: PropTypes.bool.isRequired,
  jwt: PropTypes.string.isRequired,
  userID: PropTypes.number.isRequired,
  readPostsCount: PropTypes.number,
  readPostsSec: PropTypes.number,
  getUserData: PropTypes.func.isRequired,
}

export default MemberPage
