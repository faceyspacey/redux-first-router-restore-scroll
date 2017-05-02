# redux-first-router-restore-scroll

This package provides complete scroll restoration for [redux-first-router](https://github.com/faceyspacey/redux-first-router) through the call of a single function. It also insures hash changes work as you would expect (e.g. like when you click `#links` to different section of a Github readme it automatically scrolls, and allows you to use the browser back/next buttons to move between sections you've visited). 

Example:

```js
import restoreScroll from 'redux-first-router-restore-scroll'
connectRoutes(history, routesMap, { restoreScroll: restoreScroll() })
```


## Advanced Usage
```js
import restoreScroll from 'redux-first-router-restore-scroll'

connectRoutes(history, routesMap, {
  restoreScroll: restoreScroll((prev, locationState) => {
    // disable scroll restoration on history state changes
    // note: this is useful if you want to maintain scroll position from previous route
    if (prev.type === 'HOME' && locationState.type === 'CATEGORY') {
      return false
    }

    // scroll into view HTML element with this ID or name attribute value
    else if (locationState.load && locationState.type === 'USER') {
      return 'profile-box'
    }


    // return an array of xy coordinates to scroll there
    else if (locationState.payload.coords) {
      return [coords.x, coords.y]
    }

    // Accurately emulate the default behavior of scrolling to the top on new history
    // entries, and to previous positions on pop state + hash changes.
    // This is the default behavior, and this callback is not needed if this is all you want.
    return true
  })
})
```

## Manual Scroll Position Updates
It's one of the core premises of `redux-first-router` that you avoid using various container components that update unnecessarily behind the scenes (such as the `route` component from *React Router*), and that Redux's `connect` + React's `shouldComponentUpdate` stay your primary mechanism for controlling updates. It's all too common for a lot more updates to be going on than you're aware. The browser isn't perfect and jank is a fact of life for large animation-heavy applications. 

**Everything `redux-first-router` is doing is to make Redux remain as your go-to for optimizing rendering performance.**

It's for this reason we avoid a `<ScrollContext />` provider component which listens and updates in response to every single `location` state change. It may just be the virtual DOM which re-renders, but cycles add up.

Therefore, in some cases you may want to update the scroll position manually. So rather than provide a `<ScrollContext />` container component, we expose an API so you can update scroll position in places you likely already are listening to such updates:

```js
import React from 'react'

// import `updateScroll` from the main 'redux-first-router' package:
import { updateScroll } from 'redux-first-router'

class MyComponent extends React.Component {
  componentDidUpdate() {
    const dispatch = this.props.dispatch
    requestData()
      .then(payload => dispatch({ type: 'NEW_DATA', payload })
      .then(() = updateScroll())
  }

  render() {...}
}
```

Note however that if you are using `redux-first-router`'s `thunk` capabilities, `updateScroll` will automatically be called for you after your promise resolves. So you may never need this.


## Notes
Modern browsers like Chrome attempt to provide the default behavior, but we have found
it to be flakey in fact. It's pretty good in Chrome, but doesn't always happen. If all you want is the default behavior and nothing more,
simply call `restoreScroll()` and assign it to the `restoreScroll` option of `redux-first-router`'s option map. That results in the same as
returning `true` above.


## Scroll Restoration for Elements other than `window`
We got you covered. Please checkout [redux-first-router-scroll-container](https://github.com/faceyspacey/redux-first-router-scroll-container).


## Scroll Restoration for React Native
We got you covered! Please checkout [redux-first-router-scroll-container-native](https://github.com/faceyspacey/redux-first-router-scroll-container-native).


## Thanks
Our Scroll Restoration package comes thanks to: https://github.com/taion/scroll-behavior, which powered [react-router-scroll](https://github.com/taion/react-router-scroll) in older versions of React Router. See either for more information on how this works.
