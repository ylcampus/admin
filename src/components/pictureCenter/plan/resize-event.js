// https://github.com/sdecima/javascript-detect-element-resize/blob/master/detect-element-resize.js
const isServer = typeof window === 'undefined'
const requestFrame = (function () {
  if (isServer) return
  const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    function (fn) {
      return window.setTimeout(fn, 20)
    }
  return function (fn) {
    return raf(fn)
  }
})()

const cancelFrame = (function () {
  if (isServer) return
  const cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout
  return function (id) {
    return cancel(id)
  }
})()

const resetTriggers = function (element) {
  const triggers = element.__resizeTriggers__
  const expand = triggers.firstElementChild
  const contract = triggers.lastElementChild
  const expandChild = expand.firstElementChild

  contract.scrollLeft = contract.scrollWidth
  contract.scrollTop = contract.scrollHeight
  expandChild.style.width = expand.offsetWidth + 1 + 'px'
  expandChild.style.height = expand.offsetHeight + 1 + 'px'
  expand.scrollLeft = expand.scrollWidth
  expand.scrollTop = expand.scrollHeight
}

const checkTriggers = function (element) {
  return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height
}

const scrollListener = function (event) {
  resetTriggers(this)
  if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__)
  this.__resizeRAF__ = requestFrame(() => {
    if (checkTriggers(this)) {
      this.__resizeLast__.width = this.offsetWidth
      this.__resizeLast__.height = this.offsetHeight
      this.__resizeListeners__.forEach((fn) => {
        fn.call(this, event)
      })
    }
  })
}

const attachEvent = isServer ? {} : document.attachEvent
const DOM_PREFIXES = 'Webkit Moz O ms'.split(' ')
const SRART_EVENTS = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' ')
const RESIZE_ANIMATTON_NAME = 'resizeanim'
let animation = false
let keyFramePrefix = ''
let animationStartEvent = 'animationstart'

if (!attachEvent && !isServer) {
  const testElement = document.createElement('fakeelement')
  if (testElement.style.animationName !== undefined) {
    animation = true
  }

  if (animation === false) {
    let prefix = ''
    for (let i = 0; i < DOM_PREFIXES.length; i++) {
      if (testElement.style[ DOM_PREFIXES[i] + 'AnimationName' ] !== undefined) {
        prefix = DOM_PREFIXES[i]
        keyFramePrefix = '-' + prefix.toLowerCase() + '-'
        animationStartEvent = SRART_EVENTS[i]
        animation = true
        break
      }
    }
  }
}

let stylesCreated = false

const createStyles = function () {
  if (!stylesCreated && !isServer) {
    const animationKeyFrames = `@${keyFramePrefix}keyframes ${RESIZE_ANIMATTON_NAME} {from { opacity: 0; } to { opcity: 0}}`
    const animationStyle = `${keyFramePrefix}animation: 1ms ${RESIZE_ANIMATTON_NAME};`
    // //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    const css = `${animationKeyFrames}
      .resize-triggers { ${animationStyle} visibility: hidden; opacity: 0; }
      .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: "";
      display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1}
      .resize-triggers > div { background: #eee; overflow: auto; }
      .contract-trigger:before { width: 200%; height: 200%; }`

    const head = document.head || document.getElementById('head')[0]
    const style = document.createElement('style')

    style.type = 'text/css'
    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(document.createTextNode(css))
    }

    head.appendChild(style)
    stylesCreated = true
  }
}

export const addResizeListener = function (element, fn) {
  if (isServer) return
  if (attachEvent) {
    element.attachEvent('onresize', fn)
  } else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative'
      }
      createStyles()
      element.__resizeLast__ = {}
      element.__resizeListeners__ = []

      const resizeTrigger = element.__resizeTrigger__ = document.createElement('div')
      resizeTrigger.className = 'resize-triggers'
      resizeTrigger.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>'

      element.appendChild(resizeTrigger)
      resetTriggers(element)
      element.addEventListener('scroll', scrollListener, true)

      if (animationStartEvent) {
        resizeTrigger.addEventListener(animationStartEvent, function (event) {
          if (event.animationName === RESIZE_ANIMATTON_NAME) {
            resetTriggers(element)
          }
        })
      }
    }
    element.__resizeListeners__.push(fn)
  }
}

export const removeResizeListener = function (element, fn) {
  if (attachEvent) {
    element.detachEvent('onresize', fn)
  } else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener)
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
    }
  }
}

addResizeListener()
