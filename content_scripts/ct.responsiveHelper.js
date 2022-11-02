;(function () {
  const BREAKPOINTS = [
    { screen: "xxl", pixels: 1400 },
    { screen: "xl", pixels: 1200 },
    { screen: "lg", pixels: 992 },
    { screen: "md", pixels: 768 },
    { screen: "sm", pixels: 576 },
    { screen: "xs", pixels: 0 },
  ]

  function getResponsiveClass() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    let currentBreakpoint = BREAKPOINTS.find(x => {
      return vw >= x.pixels;
    })
    return currentBreakpoint ? currentBreakpoint.screen : null;
  }

  function sendMessage() {
    browser.runtime.sendMessage({
      responsiveClass: getResponsiveClass(),
    })
  }
  window.addEventListener('resize', resizeThrottler, false)

  // Inspired by: https://developer.mozilla.org/en-US/docs/Web/Events/resize
  var resizeTimeout
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null
        sendMessage()
        // Will execute at a rate of 15fps
      }, 66)
    }
  }
  sendMessage()
})()
