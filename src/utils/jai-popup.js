import { INACTIVE_TIME } from '../constants/jai-ab-test'

export function selectCandidateSlugs(slugs, currentSlug, count = 2) {
  const candidates = [...new Set(slugs)].filter(
    slug => typeof slug === 'string' && slug.length > 0 && slug !== currentSlug
  )
  const selected = []
  while (candidates.length && selected.length < count) {
    const index = Math.floor(Math.random() * candidates.length)
    selected.push(candidates.splice(index, 1)[0])
  }
  return selected
}

// Observe a single article visit. Activity resets the entire inactivity period.
// Hidden tabs may throttle timers, so recheck elapsed time when returning.
export function observePopupEligibility({ win, doc, onEligible }) {
  let lastActivity = Date.now()
  let timer
  let stopped = false
  const activityEvents = [
    'pointermove',
    'pointerdown',
    'keydown',
    'touchstart',
    'wheel',
    'scroll',
  ]
  const pastHalfway = () => {
    const scrollableHeight = doc.documentElement.scrollHeight - win.innerHeight
    return (
      scrollableHeight > 0 &&
      (win.scrollY || doc.documentElement.scrollTop) / scrollableHeight > 0.5
    )
  }
  const check = () => {
    if (
      !stopped &&
      doc.visibilityState === 'visible' &&
      Date.now() - lastActivity > INACTIVE_TIME &&
      pastHalfway()
    ) {
      stop()
      onEligible()
    }
  }
  const schedule = () => {
    win.clearTimeout(timer)
    timer = win.setTimeout(check, INACTIVE_TIME + 1)
  }
  const activity = () => {
    lastActivity = Date.now()
    schedule()
  }
  const visibilityChange = () => {
    if (doc.visibilityState === 'visible') {
      check()
      if (!stopped) activity()
    }
  }
  function stop() {
    stopped = true
    win.clearTimeout(timer)
    activityEvents.forEach(event => doc.removeEventListener(event, activity))
    doc.removeEventListener('visibilitychange', visibilityChange)
    win.removeEventListener('focus', visibilityChange)
    win.removeEventListener('resize', check)
  }
  activityEvents.forEach(event =>
    doc.addEventListener(event, activity, { passive: true })
  )
  doc.addEventListener('visibilitychange', visibilityChange)
  win.addEventListener('focus', visibilityChange)
  win.addEventListener('resize', check)
  schedule()
  return stop
}
