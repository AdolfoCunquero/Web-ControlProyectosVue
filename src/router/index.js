import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProyectoView from '../views/ProyectoView.vue'
import ClientView from '../views/ClientView.vue'
import ProspectingView from '../views/ProspectingView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import ProjectStageView from '../views/ProjectStageView.vue'
import StageTaskView from '../views/StageTaskView.vue'
import TracingView from '../views/TracingView.vue'
import UserView from '../views/UserView.vue'
import GroupView from '../views/GroupView.vue'
import UserGroupView from '../views/UserGroupView'
import GroupPermissionsView from '../views/GroupPermissionsView'
import LoginView from '../views/LoginView'
import ReportsView from '../views/ReportsView'
import AssignationUserProjectView from '../views/AssignationUserProjectView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta:{
      reload:false
    }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{
      reload:true
    }
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
  {
    path: '/invoice',
    name: 'invoice',
    component: InvoiceView
  },
  {
    path: '/project/stage',
    name: 'stage',
    component: ProjectStageView
  },
  {
    path: '/stage/task',
    name: 'task',
    component: StageTaskView
  },
  {
    path: '/task/tracing',
    name: 'tracing',
    component: TracingView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/group',
    name: 'group',
    component: GroupView
  },
  {
    path: '/user-group/:id',
    name: 'user-group',
    component: UserGroupView
  },
  {
    path: '/group-permissions/:id',
    name: 'group-permissions',
    component: GroupPermissionsView
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsView
  },
  {
    path: '/user-projects/:id',
    name: 'user-projects',
    component: AssignationUserProjectView
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
