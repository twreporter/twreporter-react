import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
// context
import { CoreContext } from '../../../contexts'
// components
import RoleBenefits from './role-benefits'
import PeriodicBenefits from './periodic-benefits'
// @twreporter
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
import { H3 } from '@twreporter/react-components/lib/text/headline'
import mq from '@twreporter/core/lib/utils/media-query'
import FetchingWrapper from '@twreporter/react-components/lib/is-fetching-wrapper'
// lodash
import groupBy from 'lodash/groupBy'
const _ = {
  groupBy,
}

const ExclusiveOffersContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 32px;
  flex-direction: column;
  ${mq.mobileOnly`
    gap: 24px;
  `}
`

const PageTitle = styled(H3)`
  color: ${colorGrayscale.gray800};
`

const Loading = styled.div``
const LoadingMask = FetchingWrapper(Loading)

const ExclusiveOffers = ({ role, isPeriodicPatron }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isPeriodicPatronValue, setIsPeriodicPatronValue] = useState(false)
  const [periodicCards, setPeriodicCards] = useState([])
  const [roleCards, setRoleCards] = useState([])

  const { releaseBranch } = useContext(CoreContext)
  const getPeriodicCard = async () => {
    try {
      const { data } = await axios.get(
        `https://www.twreporter.org/assets/exclusive-offers/${releaseBranch}/periodic.json`
      )
      setPeriodicCards(data || [])
    } catch (err) {
      console.error('Error fetching periodic cards:', err)
    }
  }

  const getRoleCards = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `https://www.twreporter.org/assets/exclusive-offers/${releaseBranch}/${role.key}.json`
      )
      const groupedCards = _.groupBy(data, 'role')
      setRoleCards(groupedCards || [])
    } catch (err) {
      console.error('Error fetching role cards:', err)
      setError('Failed to load exclusive offers')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isPeriodicPatron !== undefined) {
      setIsPeriodicPatronValue(isPeriodicPatron)
    }
  }, [isPeriodicPatron])

  // fetch data from GCP
  useEffect(() => {
    if (isPeriodicPatronValue) {
      getPeriodicCard()
    }
  }, [isPeriodicPatronValue])

  useEffect(() => {
    if (role) {
      getRoleCards()
    }
  }, [role])

  // error state
  if (error) {
    return (
      <ExclusiveOffersContainer>
        <PageTitle text="支持方案專屬回饋" />
        <div>{error}</div>
      </ExclusiveOffersContainer>
    )
  }

  return (
    <ExclusiveOffersContainer>
      <PageTitle text="支持方案專屬回饋" />
      <LoadingMask isFetching={isLoading} showSpinner={isLoading}>
        {isPeriodicPatronValue && periodicCards.length > 0 ? (
          <PeriodicBenefits cards={periodicCards} />
        ) : null}
        {role ? <RoleBenefits role={role} cards={roleCards} /> : null}
      </LoadingMask>
    </ExclusiveOffersContainer>
  )
}

ExclusiveOffers.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    name_en: PropTypes.string,
  }),
  isPeriodicPatron: PropTypes.bool,
}

export default ExclusiveOffers
