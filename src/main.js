import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueSession from 'vue-session'

Vue.config.productionTip = false

var options = {
  persist: true
}
Vue.use(VueSession, options)

axios.defaults.baseURL = "http://localhost:64420/api"

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
