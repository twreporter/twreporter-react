import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Route, useLocation, matchPath } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

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
import { MY_READING } from '@twreporter/core/lib/constants/feature-flag'
import RedirectToSignIn from '@twreporter/react-components/lib/bookmark-list/redirect-to-sign-in'

// components
import MemberMenuList from '../components/member-page/menu-list'
import MemberData from '../components/member-page/member-data'
import MemberRoleCard from '../components/member-page/member-role-card'
import MemberDonationPage from '../components/member-page/donation'
import EmailSubscription from '../components/member-page/email-subscription'
import MobileMemberPage from '../components/member-page/mobile-page/mobile-member-page'

// constants
import siteMeta from '../constants/site-meta'
import routesOld from '../constants/routes-old'
import routesNew from '../constants/routes'

// lodash
import get from 'lodash/get'
import { READING_TIME_UNIT } from '@twreporter/core/lib/constants/reading-time-unit'

const routes = MY_READING ? routesNew : routesOld

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
    grid-column: ${props =>
      props.path === routes.memberPage.path ? '3 / 10' : '3 / 13'}
  `}
  ${mq.desktopAndAbove`
    grid-column: ${props =>
      props.path === routes.memberPage.path ? '3 / 10' : '3 / 11'}
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

const MemberPage = ({
  memberData,
  jwt,
  isAuthed,
  readPostsCount,
  readPostsSec,
}) => {
  const { pathname } = useLocation()
  const { releaseBranch } = useContext(CoreContext)
  const [currentHref, setCurrentHref] = useState('')
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
      return '電子報設定'
    } else {
      return '個人專區'
    }
  }

  const titleText = getSiteTitle(pathname)
  const title = titleText + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}${pathname}`

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
            <MemberMenuList />
          </MenuContainer>
          <ContentContainer path={pathname}>
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
                <MemberDonationPage />
              </Route>
              <Route path={routes.memberPage.memberEmailSubscriptionPage.path}>
                <EmailSubscription />
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
              roleKey={memberData.role.key}
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
              <MemberDonationPage />
            </ContentContainer>
          </Route>
          <Route path={routes.memberPage.memberEmailSubscriptionPage.path}>
            <ContentContainer>
              <EmailSubscription />
            </ContentContainer>
          </Route>
        </Switch>
      </MobileOnly>
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
  readPostsCount: PropTypes.number,
  readPostsSec: PropTypes.number,
}

const { reduxStateFields } = twreporterRedux
const mapStateToProps = state => {
  const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'], '')
  const isAuthed = _.get(state, [reduxStateFields.auth, 'isAuthed'], false)
  const email = _.get(state, [reduxStateFields.user, 'email'])
  const firstName = _.get(state, [reduxStateFields.user, 'firstName'])
  const lastName = _.get(state, [reduxStateFields.user, 'lastName'])
  const roles = _.get(state, [reduxStateFields.user, 'roles'], [])
  const registrationDate = _.get(state, [
    reduxStateFields.user,
    'registrationDate',
  ])
  const readPostsCount = _.get(
    state,
    [reduxStateFields.user, 'readPostsCount'],
    0
  )
  const readPostsSec = _.get(state, [reduxStateFields.user, 'readPostsSec'], 0)
  return {
    jwt,
    isAuthed,
    memberData: {
      email,
      name: `${lastName}${firstName}`,
      role: {
        ...roles[0],
        key: roles[0]?.key ? MEMBER_ROLE[roles[0].key] : MEMBER_ROLE.explorer,
      },
      joinDate: date2yyyymmdd(registrationDate, '/'),
    },
    readPostsCount,
    readPostsSec,
  }
}

export default connect(mapStateToProps)(MemberPage)
