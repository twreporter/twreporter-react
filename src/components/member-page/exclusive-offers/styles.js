import styled from 'styled-components'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 64px;
`

export const BenefitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const CardListContainer = styled.div`
  margin-top: 24px;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  ${mq.hdOnly`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${mq.mobileOnly`
    grid-template-columns: repeat(1, 1fr);
  `}
`
