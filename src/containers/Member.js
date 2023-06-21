import React from 'react'
import styled from 'styled-components'
import { Switch, Route, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
import {
  BRANCH_PROP_TYPES,
  BRANCH,
} from '@twreporter/core/lib/constants/release-branch'
import {
  MobileOnly,
  TabletAndAbove,
} from '@twreporter/react-components/lib/rwd'
import twreporterRedux from '@twreporter/redux'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'

// components
import MemberMenuList from '../components/member-page/menu-list'
import MemberData from '../components/member-page/member-data'
import MemberRoleCard from '../components/member-page/member-role-card'
import MemberDonationPage from '../components/member-page/donation'
import EmailSubscription from '../components/member-page/email-subscription'
import MobileMemberPage from '../components/member-page/mobile-page/mobile-member-page'
import routes from '../constants/routes'

// lodash
import get from 'lodash/get'
import propTypes from 'prop-types'

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

const MemberPage = ({ releaseBranch = BRANCH.master, memberData }) => {
  const { pathname } = useLocation()
  return (
    <div>
      <TabletAndAbove>
        <PageContainer>
          <MenuContainer>
            <MemberMenuList releaseBranch={releaseBranch} />
          </MenuContainer>
          <ContentContainer path={pathname}>
            <Switch>
              <Route exact path={routes.memberPage.path}>
                <MemberData
                  role={memberData.role}
                  email={memberData.email}
                  joinDate={memberData.joinDate}
                  name={memberData.name || ''}
                />
              </Route>
              <Route path={routes.memberPage.memberDonationPage.path}>
                <MemberDonationPage releaseBranch={releaseBranch} />
              </Route>
              <Route path={routes.memberPage.memberEmailSubscriptionPage.path}>
                <EmailSubscription />
              </Route>
            </Switch>
          </ContentContainer>
          <Route exact path={routes.memberPage.path}>
            <RoleCardContainer>
              <MemberRoleCard
                roleKey={memberData.role.key}
                releaseBranch={releaseBranch}
              />
            </RoleCardContainer>
          </Route>
        </PageContainer>
      </TabletAndAbove>
      <MobileOnly>
        <Route exact path={routes.memberPage.path}>
          <PageContainer>
            <MobileMemberPage
              roleKey={memberData.role.key}
              releaseBranch={releaseBranch}
              email={memberData.email}
              joinDate={memberData.joinDate}
              name={memberData.name || ''}
            />
          </PageContainer>
        </Route>
        <Switch>
          <Route path={routes.memberPage.memberDonationPage.path}>
            <ContentContainer>
              <MemberDonationPage releaseBranch={releaseBranch} />
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
  releaseBranch: BRANCH_PROP_TYPES,
  memberData: propTypes.object,
}

const { reduxStateFields } = twreporterRedux
const mapStateToProps = state => {
  const email = _.get(state, [reduxStateFields.user, 'email'])
  const firstName = _.get(state, [reduxStateFields.user, 'firstName'])
  const lastName = _.get(state, [reduxStateFields.user, 'lastName'])
  const roles = _.get(state, [reduxStateFields.user, 'roles'], [])
  const registrationDate = _.get(state, [
    reduxStateFields.user,
    'registrationDate',
  ])
  return {
    memberData: {
      email,
      name: `${lastName}${firstName}`,
      role: roles[0],
      joinDate: date2yyyymmdd(registrationDate, '/'),
    },
  }
}

export default connect(mapStateToProps)(MemberPage)
