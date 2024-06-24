import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

// @twreporter
import { Title2 } from '@twreporter/react-components/lib/title-bar'
import { TextButton } from '@twreporter/react-components/lib/button'
import { Arrow } from '@twreporter/react-components/lib/icon'
import {
  DesktopAndAbove,
  TabletAndBelow,
} from '@twreporter/react-components/lib/rwd'
import { CardList } from '@twreporter/react-components/lib/listing-page'
import { ShortStory } from '@twreporter/react-components/lib/card'
import mq from '@twreporter/core/lib/utils/media-query'
import Divider from '@twreporter/react-components/lib/divider'
import twreporterRedux from '@twreporter/redux'

// constants
import routes from '../../constants/routes'

// components
import EmptyBox from './empty-box'

// context
import { CoreContext } from '../../contexts'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const { actions, reduxStateFields } = twreporterRedux
const { getUserFootprints } = actions

const CardListContainer = styled.div`
  padding-top: 24px;
  padding-bottom: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 24px;
  ${mq.mobileOnly`
    grid-template-columns: repeat(1, 1fr);
  `}
  ${mq.tabletOnly`
    column-gap: 24px;
  `}
  ${mq.desktopAndAbove`
    column-gap: 32px;
  `}
`

const StyledDivider = styled(Divider)`
  margin-top: 24px;
`

const StyledTextButton = styled(TextButton)`
  height: 100%;
`

const Card = styled.div`
  width: 100%;
`

const BrowsingHistorySection = () => {
  const { releaseBranch } = useContext(CoreContext)
  const navigate = useHistory()
  const [browsingHistory, setBrowsingHistory] = useState([])
  const [totalBrowsingHistory, setTotalBrowsingHistory] = useState(-1)
  const dispatch = useDispatch()

  const footprints = useSelector(state =>
    _.get(state, [reduxStateFields.footprints, 'footprints'], [])
  )
  const totalFootprints = useSelector(state =>
    _.get(state, [reduxStateFields.footprints, 'total'], 0)
  )
  const isFetching = useSelector(state =>
    _.get(state, [reduxStateFields.footprints, 'isFetching'], false)
  )
  const jwt = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'accessToken'])
  )
  const userID = useSelector(state =>
    _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id'])
  )

  const moreHistoryBtn = () => {
    if (totalBrowsingHistory <= 0) return null
    return (
      <>
        <DesktopAndAbove>
          <StyledTextButton
            text="查看更多"
            rightIconComponent={<Arrow direction="right" />}
            onClick={() =>
              navigate.push(routes.myReadingPage.browsingHistoryPage.path)
            }
            size={TextButton.Size.L}
            releaseBranch={releaseBranch}
          />
        </DesktopAndAbove>
        <TabletAndBelow>
          <StyledTextButton
            text="查看更多"
            rightIconComponent={<Arrow direction="right" />}
            onClick={() =>
              navigate.push(routes.myReadingPage.browsingHistoryPage.path)
            }
            size={TextButton.Size.S}
            releaseBranch={releaseBranch}
          />
        </TabletAndBelow>
      </>
    )
  }

  const filterFootprint = footprint => {
    const { title, slug } = footprint
    const image = {
      src: _.get(
        footprint,
        ['hero_image', 'resized_targets', 'mobile', 'url'],
        ''
      ),
    }
    const category = _.get(footprint, 'category_set[0].category.name', '')
    return {
      slug,
      title,
      image,
      category,
    }
  }

  useEffect(() => {
    setBrowsingHistory(
      _.map(footprints, footprint => filterFootprint(footprint))
    )
    setTotalBrowsingHistory(totalFootprints)
  }, [footprints, totalFootprints])

  useEffect(() => {
    dispatch(getUserFootprints(jwt, userID, 0, 6))
  }, [dispatch, jwt, userID])

  if (isFetching) {
    return (
      <div>
        <Title2 title={'造訪紀錄'} />
        <CardList isFetching={true} showSpinner={true} data={[{}]} />
      </div>
    )
  }

  return (
    <div>
      <Title2 title={'造訪紀錄'} renderButton={moreHistoryBtn()} />
      {totalBrowsingHistory === 0 && (
        <EmptyBox type={EmptyBox.Type.BrowsingHistory} />
      )}
      {browsingHistory.length > 0 && (
        <CardListContainer>
          {browsingHistory.map((history, idx) => {
            return (
              <Card key={idx}>
                <DesktopAndAbove>
                  <ShortStory size={ShortStory.Size.L} {...history} />
                  <StyledDivider />
                </DesktopAndAbove>
                <TabletAndBelow>
                  <ShortStory size={ShortStory.Size.S} {...history} />
                  <StyledDivider />
                </TabletAndBelow>
              </Card>
            )
          })}
        </CardListContainer>
      )}
    </div>
  )
}

export default BrowsingHistorySection
