import ScrollBehavior from 'scroll-behavior'
import SessionStorage from './SessionStorage'

export default shouldUpdateScroll => history =>
  new ScrollBehavior({
    addTransitionHook: history.listen,
    stateStorage: new SessionStorage(),
    getCurrentLocation: () => ({
      ...history.location,
      action: history.action
    }),
    shouldUpdateScroll
  })
