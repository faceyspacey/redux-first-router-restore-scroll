import ScrollBehavior from 'scroll-behavior'
import SessionStorage from './SessionStorage'

export default (
  { shouldUpdateScroll, manual, stateStorage } = {}
) => history => {
  if (typeof window === 'undefined') return

  const behavior = new ScrollBehavior({
    addTransitionHook: history.listen,
    stateStorage: stateStorage || new SessionStorage(),
    getCurrentLocation: () => ({
      ...history.location,
      action: history.action
    }),
    shouldUpdateScroll
  })

  behavior.setPrevKey = () => {
    const key = history.location.key || history.location.hash || 'loadPage'
    stateStorage.setPrevKey(key)
  }

  behavior.manual = manual

  return behavior
}
