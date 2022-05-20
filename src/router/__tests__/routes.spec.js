import { mount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import { routes } from '../routes'
import HomeComponent from '@/components/HomeComponent.vue'
import LoginComponent from '@/components/LoginComponent.vue'
import SignupComponent from '@/components/SignupComponent.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)

jest.mock('@/views/Login.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/Home.vue', () => ({
  render: () => ''
}))
jest.mock('@/views/Signup.vue', () => ({
  render: () => ''
}))

let wrapper
let router

beforeEach(() => {
  router = new VueRouter({ routes, mode: 'abstract' })

  // mount VS shallowMount
  wrapper = mount(App, {
    localVue,
    router
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
})
