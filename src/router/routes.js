import Home from '../views/Home.vue'
import PageNotFound from '@/views/PageNotFound'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () =>
      import(/* webpackChunkName: "Pointage" */ '../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Pointage" */ '../views/Login.vue'),
    meta: {
      authPage: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () =>
      import(/* webpackChunkName: "Pointage" */ '../views/Logout.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "secret" */ '../views/AdminP.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]
