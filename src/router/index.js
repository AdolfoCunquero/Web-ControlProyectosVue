import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProyectoView from '../views/ProyectoView.vue'
import ClientView from '../views/ClientView.vue'
import ProspectingView from '../views/ProspectingView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/project',
    name: 'project',
    component: ProyectoView
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView
  },
  {
    path: '/prospecting',
    name: 'prospecting',
    component: ProspectingView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router