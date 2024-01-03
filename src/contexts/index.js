import { createContext } from 'react'
import PropTypes from 'prop-types'
// @twreporter
import {
  BRANCH,
  BRANCH_PROP_TYPES,
} from '@twreporter/core/lib/constants/release-branch'

export const CoreContext = createContext({
  propTypes: {
    releaseBranch: BRANCH_PROP_TYPES,
    referrerPath: PropTypes.string,
  },
  defaultProps: {
    releaseBranch: BRANCH.master,
    referrerPath: '',
  },
})

export const PromoContext = createContext({
  propTypes: {
    isShowPromo: PropTypes.bool,
    closePromo: PropTypes.func,
    openPromo: PropTypes.func,
  },
})

export const ArticlePromoContext = createContext({
  propTypes: {
    isShowPromo: PropTypes.bool,
    closePromo: PropTypes.func,
  },
})
