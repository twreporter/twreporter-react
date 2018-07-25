import InfoBox from './more-info-box'
import InfoPanel from './more-info-panel'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

const Container = styled.div `
  position: relative;
`

export default class MoreInfo extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { rowNumber, selectedLogo, selectedRow, closeInfoBox, initial, selectedContent, infoPageNum, nextPage } = this.props
    return (
      <Container>
        { 
          selectedLogo === null ? null :
            <React.Fragment>
              <InfoBox
                selectedContent={selectedContent}
                infoPageNum={infoPageNum}
                nextPage={nextPage}
                closeInfoBox={closeInfoBox}
              />
              { 
                initial ? null :
                  <InfoPanel
                    rowNumber={rowNumber}
                    selectedLogo={selectedLogo}
                    selectedRow={selectedRow}
                    closeInfoBox={closeInfoBox}
                    initial={initial}
                    selectedContent={selectedContent}
                    infoPageNum={infoPageNum}
                    nextPage={nextPage}
                  />
              }
            </React.Fragment>
        }
      </Container>
    )
  }
}

MoreInfo.defaultProps = {
  rowNumber: 0,
  selectedContent: [],
  infoPageNum: 0,
  selectedLogo: 0,
  selectedRow: 0
}

MoreInfo.propTypes = {
  rowNumber: PropTypes.number.isRequired,
  selectedContent: PropTypes.array.isRequired,
  infoPageNum: PropTypes.number.isRequired,
  selectedLogo: PropTypes.number,
  selectedRow: PropTypes.number,
  closeInfoBox: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
}


