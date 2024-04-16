import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// @twreporter
import mq from '@twreporter/core/lib/utils/media-query'
// components
import { TableHeader } from './table/header'
import { TableRow } from './table/row'

const TableContainer = styled.div`
  width: 100%;
  ${mq.mobileOnly`
    padding: 24px 0px 64px;
  `}
  ${mq.tabletAndAbove`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 8px;
    padding: 32px 0px 120px;
  `}
`

export const Table = ({ records }) => (
  <TableContainer>
    <TableHeader />
    {records.map(record => (
      <React.Fragment key={record.order_number}>
        <TableRow record={record} />
      </React.Fragment>
    ))}
  </TableContainer>
)

Table.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
}
