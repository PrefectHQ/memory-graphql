import Vue from "vue";
import App from "./App.vue";
import { createProvider } from "./vue-apollo";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
