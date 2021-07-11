function scrollBottom(sel) {
  const el = document.querySelector(sel)
  el.scrollTop = el.scrollHeight;
}

function isScrollBottom(sel) {
  const el = document.querySelector(sel)
  return el.scrollTop === el.scrollHeight - el.clientHeight;
}

export {
  scrollBottom,
  isScrollBottom,
}
