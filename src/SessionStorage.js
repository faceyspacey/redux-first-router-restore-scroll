const STATE_KEY_PREFIX = '@@scroll|'

let prevKey = null

export default class SessionStorage {
  setPrevKey(key) {
    prevKey = key
  }

  read(location, key) {
    const stateKey = this.getStateKey(location, key)
    try {
      const value = sessionStorage.getItem(stateKey)
      return JSON.parse(value)
    }
    catch (e) {
      console.warn(e)
    }
  }

  save(location, key, value) {
    if (key) {
      location = { key: prevKey, hash: location.hash }
    }

    const stateKey = this.getStateKey(location, key)
    const storedValue = JSON.stringify(value)

    try {
      sessionStorage.setItem(stateKey, storedValue)
    }
    catch (e) {
      console.warn(e)
    }

    if (key) {
      const newKey = location.key || location.hash || 'loadPage'
      if (newKey !== prevKey) {
        prevKey = newKey
      }
    }
  }

  getStateKey(location, key) {
    const locationKey = location.key || location.hash || 'loadPage'
    const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`
    return key == null ? stateKeyBase : `${stateKeyBase}|${key}`
  }
}
