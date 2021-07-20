import { GET_PAGE_INFO } from "./util/constant";
import { IS_VISIBLE, IS_DARK_MODE, IS_NICO_MODE } from "./util/constant";

async function onChange(event) {
  const el = event.target;
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  await browser.tabs.sendMessage(tabs[0].id, { type: el.id, value: el.checked });
}

async function bindValue() {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  const info = await browser.tabs.sendMessage(tabs[0].id, { type: GET_PAGE_INFO });

  [IS_VISIBLE, IS_DARK_MODE, IS_NICO_MODE].forEach(key => {
    const el = document.querySelector(`#${key}`)
    el.checked = info[key];
    el.addEventListener("change", onChange);
  });
}

async function onLoad() {
  await bindValue();
}

onLoad();
