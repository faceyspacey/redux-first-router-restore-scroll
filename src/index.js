import ScrollBehavior from 'scroll-behavior'
import SessionStorage from './SessionStorage'

export default ({ shouldUpdateScroll, manual } = {}) => history => {
  if (typeof window === 'undefined') return
  const stateStorage = new SessionStorage()

  const behavior = new ScrollBehavior({
    addTransitionHook: history.listen,
    stateStorage,
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
