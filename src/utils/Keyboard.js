const isMac = window.navigator.userAgent.toLowerCase().indexOf('mac os x') >= 0;

export const isCTRL = (e) => {
  if (isMac) {
    return e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey;
  }
  return e.ctrlKey && !e.altKey && !e.shiftKey;
}
