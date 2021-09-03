import Vue from "vue";
import App from "./App.vue";
import "./index.css";
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

Vue.filter("truncate", function(text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
});
