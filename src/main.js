import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:64420/api"

localStorage.controlProyectosToken = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFjdW5xdWVybyIsImV4cCI6MTY2NDM1NDU2MSwiaXNzIjoic21lc2suaW4iLCJhdWQiOiJyZWFkZXJzIn0.oAu-O40D7XDRosRhgGbLvWUtWq6Vp-10nGMt6w0Txik"

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
