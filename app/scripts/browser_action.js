import { GET_PAGE_INFO } from "./util/constant";

function onChange(event) {
  const el = event.target;
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: el.id, value: el.checked });
  });
}

function bindValue() {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { type: GET_PAGE_INFO }, info => {
      ["isVisible", "isDarkMode"].forEach(key => {
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
