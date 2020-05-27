import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
axios.defaults.baseURL = "http://127.0.0.1:8000/api"

Vue.config.productionTip = false
import dashboard from './layouts/Dashboard'
import loginOrRegister from './layouts/LoginAndRegister'

Vue.component('Dashboard', dashboard)
Vue.component('LoginAndRegister', loginOrRegister)

Vue.router = router;
Vue.use(require("@websanova/vue-auth"), {
  auth: require("@websanova/vue-auth/drivers/auth/bearer.js"),
  http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
  router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js"),
  tokenStore: ["localStorage", "cookie"]
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
