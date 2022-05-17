import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['authentication/isLoggedIn']) {
    next({
      name: 'Login',
      query: { redirect: to.path }
    })
  } else if (to.meta.authPage && store.getters['authentication/isLoggedIn']) {
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})

export default router
