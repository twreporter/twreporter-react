import { createContext } from 'react'
import PropTypes from 'prop-types'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

export const PromoContext = createContext({
  propTypes: {
    isShowPromo: PropTypes.bool,
    closePromo: PropTypes.func,
    openPromo: PropTypes.func,
    releaseBranch: BRANCH_PROP_TYPES,
  },
  defaultProps: {
    releaseBranch: BRANCH.master,
  },
})

export const ArticlePromoContext = createContext({
  propTypes: {
    isShowPromo: PropTypes.bool,
    closePromo: PropTypes.func,
    openPromo: PropTypes.func,
    releaseBranch: BRANCH_PROP_TYPES,
  },
  defaultProps: {
    releaseBranch: BRANCH.master,
  },
})
