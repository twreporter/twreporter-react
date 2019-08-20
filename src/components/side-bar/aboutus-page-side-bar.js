import { SITE_META } from '../about-us/constants/data/index'
import { buildFbShareLink } from '../about-us/utils/build-fb-share-link'
import { colors, typography } from '../../themes/common-variables'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { screen } from '../about-us/utils/screen'
import { storageUrlPrefix } from '../about-us/utils/config'
import anchorlist from '../about-us/constants/data/sidebar-anchor'
import baseComponents from './base-components'
import DonationLink from '@twreporter/react-components/lib/donation-link-with-utm'
import hrefs from '../about-us/constants/data/sidebar-link'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledAnchor = styled(baseComponents.StyledAnchor)`
  position: relative;
  height: 100%;
  color: ${props => props.highlight ? colors.black : colors.gray.gray50};
  border-right: 2px solid ${props => props.highlight ? colors.black : colors.gray.gray50};
  opacity: ${props => props.highlight ? '2' : '0.5'};
  padding-right: 17px;
  padding-top: calc((170px / 6) / 2);
  padding-bottom: calc((170px / 6) / 2);
  transition: all 200ms linear;
`

const Order = styled.div `
  font-size: ${typography.font.size.xSmall};
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  text-align: right;
  transform: translateX(-100%);
  line-height: calc(170px / 6);
  opacity: 0;
`

class Anchors extends baseComponents.Anchors {
  constructor(props) {
    super(props)
    this.Anchor = StyledAnchor
  }

  _renderAnchor(anchorObj) {
    const Anchor = this.Anchor
    return (
      <Anchor
        highlight={anchorObj.highlight}
        onClick={(e) => { anchorObj.handleClick(anchorObj.id, e) }}
        key={`SectionButton_${anchorObj.id}`}
      >
        <Order>{`${anchorlist[anchorObj.index - 1].label}`}</Order>
      </Anchor>
    )
  }
}

Anchors.defaultProps = {
  handleClickAnchor: () => {},
  data: []
}

Anchors.propTypes = {
  handleClickAnchor: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string
  }))
}

const AnchorsContainer = styled.div`
  z-index: 200;
  position: fixed;
  color: ${colors.gray.gray50};
  right: 0;
  top: 50%;
  transform: translate(-49px, -50%);
  transition: opacity 0.5s linear;
  &:hover {
    ${Order} {
      opacity: 1;
      transition: all 200ms linear;
    }
  }
  ${screen.desktop`
    transform: translate(-47px, -50%);
  `}
  ${screen.tabletBelow`
    display: none;
  `}
`

const Icons = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  ${screen.desktop`
    transform: translateX(50%) translateY(226px);
    img{
      width: 30px;
      margin-bottom: 16.7px;
    }
  `}

  ${screen.overDesktop`
    transform: translateX(50%) translateY(376px);
    img{
      width: 45px;
      margin-bottom: 25px;
    }
  `}
`

class AboutusPageSideBar extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    // currentAnchorId and handleClickAnchor are passed from `SideBarHOC`
    const { anchors, children, currentAnchorId, handleClickAnchor } = this.props
    return (
      <div>
        <AnchorsContainer>
          <Anchors
            data={anchors}
            handleClickAnchor={handleClickAnchor}
            currentAnchorId={currentAnchorId}
          />
          <Icons>
            <DonationLink
              utmMedium="about-us"
            >
              <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/sidebar-icon1.png`)}`} />
            </DonationLink>
            <a href={hrefs.subscribe} target="_blank">
              <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/sidebar-icon2.png`)}`} />
            </a>
            <a href={buildFbShareLink(SITE_META.URL)} target="_blank">
              <img src={`${replaceGCSUrlOrigin(`${storageUrlPrefix}/sidebar-icon3.png`)}`} />
            </a>
          </Icons>
        </AnchorsContainer>
        {children}
      </div>
    )
  }
}

AboutusPageSideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {}
}

AboutusPageSideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func
}

export default AboutusPageSideBar
