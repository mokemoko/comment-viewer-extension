import { GET_PAGE_INFO } from "./util/constant";
import { IS_VISIBLE, IS_DARK_MODE, IS_NICO_MODE } from "./util/constant";

function onChange(event) {
  const el = event.target;
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: el.id, value: el.checked });
  });
}

function bindValue() {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: GET_PAGE_INFO }, info => {
      [IS_VISIBLE, IS_DARK_MODE, IS_NICO_MODE].forEach(key => {
        const el = document.querySelector(`#${key}`)
        el.checked = info[key];
        el.addEventListener("change", onChange);
      });
    });
  });
}

function onLoad() {
  bindValue();
}

onLoad();
