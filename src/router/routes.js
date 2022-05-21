import Home from '../views/Home.vue'

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
      import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      authPage: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () =>
      import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  },
  {
    path: '/admin32323232',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "secret" */ '../views/AdminP.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: () =>
      import(/* webpackChunkName: "404" */ '../views/PageNotFound.vue')
  }
]
