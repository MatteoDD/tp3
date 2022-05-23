import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Admin from '../views/AdminP.vue'
import PageNotFound from '../views/PageNotFound.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      authPage: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]
