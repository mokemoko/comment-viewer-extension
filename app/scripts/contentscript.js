import { GET_PAGE_INFO, IS_VISIBLE, IS_DARK_MODE, IS_NICO_MODE } from "./util/constant";
import {sleep} from "./util/util";

// TODO: allow flexible settings
const animDuration = 8;
const commentSize = 32;

class Extension {
  constructor() {
    this.isDarkMode = false;
    this.isNicoMode = false;

    chrome.runtime.onMessage.addListener((req, sender, callback) => {
      switch (req.type) {
        case IS_VISIBLE:
          this.switchVisible(req.value);
          break;
        case IS_DARK_MODE:
          this.switchDarkMode(req.value);
          break;
        case IS_NICO_MODE:
          this.switchNicoMode(req.value);
          break;
        case GET_PAGE_INFO:
          callback(this.info());
          break;
      }
    });

    window.addEventListener("message", e => {
      if (this.isNicoMode) {
        e.data.forEach(this.addComment);
      }
    });
  }

  info () {
    return {
      isVisible: this.el && this.el.style.display === "",
      isDarkMode: this.isDarkMode,
      isNicoMode: this.isNicoMode,
    };
  }

  switchDarkMode (flg) {
    this.el.contentWindow.postMessage(flg, "*");
    this.isDarkMode = flg;
  }

  switchNicoMode (flg) {
    this.isNicoMode = flg;
  }

  switchVisible (flg) {
    if (!this.el) {
      this.install();
    }
    this.el.style.display = flg ? "" : "none";
  }

  install () {
    this.el = document.createElement("iframe");
    this.el.id = "comment-viewer-ex";
    this.el.src = chrome.runtime.getURL("pages/inner_content.html");
    document.body.appendChild(this.el);
  }

  async addComment (comment) {
    const el = document.createElement("p");
    el.className = "cve-comment";
    el.style.fontSize = `${commentSize}px`;
    el.style.animationDuration = `${animDuration}s`;
    el.style.top = `${20 + Math.random() * (window.innerHeight - 60)}px`;
    el.innerText = comment.text;
    document.body.appendChild(el);
    await sleep(animDuration * 1000);
    el.remove();
  }
}

new Extension();
