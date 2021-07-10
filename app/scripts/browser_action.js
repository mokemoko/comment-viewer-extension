import { TOGGLE_SIDEBAR } from "./util/constant";

const onClick = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, TOGGLE_SIDEBAR);
  });
};
document.querySelector("#switch").addEventListener("click", onClick);
