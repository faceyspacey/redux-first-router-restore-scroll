import ScrollBehavior from 'scroll-behavior'
import SessionStorage from './SessionStorage'

export default (
  { shouldUpdateScroll, manual, stateStorage } = {}
) => history => {
  if (typeof window === 'undefined') return

  const behaviorStateStorage = stateStorage || new SessionStorage()
  const behavior = new ScrollBehavior({
    addTransitionHook: history.listen,
    stateStorage: behaviorStateStorage,
    getCurrentLocation: () => ({
      ...history.location,
      action: history.action
    }),
    shouldUpdateScroll
  })

  behavior.setPrevKey = () => {
    const key = history.location.key || history.location.hash || 'loadPage'
    behaviorStateStorage.setPrevKey(key)
  }

  behavior.manual = manual

  return behavior
}
