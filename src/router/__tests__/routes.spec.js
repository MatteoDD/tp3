import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import routes from '../routes.js'
import Vuex from 'vuex'
import Vue from 'vue'
import HomeComponent from '@/views/Home.vue'
import LoginComponent from '@/views/Login.vue'
import SignupComponent from '@/views/Signup.vue'
import Admin from '@/views/AdminP.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import Logout from '@/views/Logout.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

jest.mock('@/views/Login.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/Home.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/AdminP.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/Logout.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/PageNotFound.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/Signup.vue', () => ({
  render: () => ''
}))

let wrapper
let router
let getters
let store
Vue.use(Vuex)
beforeEach(() => {
  router = new VueRouter({ routes, mode: 'abstract' })
  getters = {
    logged: () => true,
    isAdmin: () => true
  }
  store = new Vuex.Store({
    getters
  })

  wrapper = mount(App, {
    localVue,
    router,
    store
  })
})

describe('routes.js', () => {
  test('/ doit afficher la page home.', async () => {
    await router.push('/')

    expect(wrapper.findComponent(HomeComponent).exists()).toBe(true)
  })

  test('/login doit afficher la page de login.', async () => {
    await router.push('/login')

    expect(wrapper.findComponent(LoginComponent).exists()).toBe(true)
  })
  test('/signup doit afficher la page signup.', async () => {
    await router.push('/signup')

    expect(wrapper.findComponent(SignupComponent).exists()).toBe(true)
  })

  test('/logout doit afficher la page logout.', async () => {
    await router.push('/logout')

    expect(wrapper.findComponent(Logout).exists()).toBe(true)
  })

  test('/admin doit afficher la page admin.', async () => {
    await router.push('/admin')

    expect(wrapper.findComponent(Admin).exists()).toBe(true)
  })

  test('/* doit afficher la PageNotFound.', async () => {
    await router.push('/ooooooooo')

    expect(wrapper.findComponent(PageNotFound).exists()).toBe(true)
  })
})
