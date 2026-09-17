import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import loggerFactory from '../logger'

const useJaiAbTestGroup = slug => {
  const dispatch = useDispatch()
  const group = useSelector(state =>
    get(state, 'auth.userInfo.jai_ab_test_group')
  )
  const isRequestingAuth = useSelector(state =>
    get(state, 'auth.isRequesting', false)
  )
  const authRevision = useSelector(state => get(state, 'auth.authRevision', 0))
  const pendingRevisions = useRef(new Set())

  useEffect(() => {
    // "none" is a cached assignment too. Wait until authentication settles;
    // the Redux reducer rejects responses belonging to an earlier auth revision.
    if (
      group != null ||
      isRequestingAuth ||
      pendingRevisions.current.has(authRevision)
    ) {
      return
    }
    const pending = pendingRevisions.current
    pending.add(authRevision)
    const fetchGroup = async () => {
      try {
        await dispatch(twreporterRedux.actions.getJaiAbTestGroup())
      } catch (error) {
        loggerFactory.getLogger().errorReport({
          report: error,
          message: 'Error fetching JAI A/B test group',
        })
      } finally {
        pending.delete(authRevision)
      }
    }
    fetchGroup()
  }, [dispatch, slug, group, isRequestingAuth, authRevision])

  return group
}

export default useJaiAbTestGroup
