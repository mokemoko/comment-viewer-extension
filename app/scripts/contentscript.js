import { GET_PAGE_INFO, IS_VISIBLE, IS_DARK_MODE } from "./util/constant";

class Extension {
  constructor() {
    this.isDarkMode = false;
    chrome.runtime.onMessage.addListener((req, sender, callback) => {
      switch (req.type) {
        case IS_VISIBLE:
          this.toggle();
          break;
        case IS_DARK_MODE:
          this.switchDarkMode(req.value);
          break;
        case GET_PAGE_INFO:
          callback(this.info());
          break;
      }
    });
  }

  info () {
    return {
      isVisible: this.el && this.el.style.display === "",
      isDarkMode: this.isDarkMode,
    };
  }

  switchDarkMode (flg) {
    this.el.contentWindow.postMessage(flg, "*");
    this.isDarkMode = flg;
  }

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
    const style = this.el.style;
    style.display = style.display === "" ? "none" : "";
  }

  install () {
    this.el = document.createElement("iframe");
    this.el.id = "comment-viewer-ex";
    this.el.src = chrome.runtime.getURL("pages/inner_content.html");
    document.body.appendChild(this.el);
  }
}

new Extension();
