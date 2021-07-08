class Extension {
  toggle () {
    if (window.top !== window.self) {
      return;
    }
    if (this.el) {
      this.toggleVisibility();
    } else {
      this.install();
    }
  }

  toggleVisibility () {
  }

  install () {
    this.el = document.createElement('iframe');
    this.el.id = "comment-viewer-ex";
    this.el.src = this.src();
    document.body.appendChild(this.el);
  }

  src () {
    return chrome.runtime.getURL(`pages/popup.html`)
  }

}

const extension = new Extension()

chrome.runtime.onMessage.addListener(message => {
  switch (message) {
    case "toggle_sidebar":
      extension.toggle()
      break
    default:
      break
  }
})
