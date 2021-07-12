import Vue from "vue";
import App from "./components/App.vue";

new Vue({
  el: "#app",
  render: h => h(App),
});

window.addEventListener("message", e => {
  document.querySelector("html").dataset.theme = e.data ? "dark" : "light";
});
