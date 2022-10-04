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

//localStorage.controlProyectosToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzIiwidXNlcm5hbWUiOiJqdWFuLmdvbWV6IiwiZXhwIjoxNjY0ODIyNTY5LCJpc3MiOiJzbWVzay5pbiIsImF1ZCI6InJlYWRlcnMifQ.CbNLGxoZsLLAloaIoWBuU6xJ2OID2TqmjY4p6w23Wmo"

new Vue({
  router,
  watch:{
    '$route' (to){
      if(to.currentRoute.meta.reload==true){window.location.reload()}
    }
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
