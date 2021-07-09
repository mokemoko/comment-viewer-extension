import { TOGGLE_SIDEBAR } from "./constant";

class Extension {
  constructor() {
    chrome.runtime.onMessage.addListener(message => {
      switch (message) {
        case TOGGLE_SIDEBAR:
          this.toggle();
          break;
        default:
          break;
      }
    });
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
