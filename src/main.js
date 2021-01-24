import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from "vue-i18n";
import * as ptBRMessages from "@/i18n/pt_BR";
import * as enUSMessages from "@/i18n/en_US";

Vue.config.productionTip = false;
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: process.env.VUE_APP_LOCALE,
  fallbackLocale: process.env.VUE_APP_FALLBACK_LOCALE,
  messages: { pt_BR: ptBRMessages, en_US: enUSMessages }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
