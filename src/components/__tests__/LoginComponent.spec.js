import { shallowMount, createLocalVue } from '@vue/test-utils'
import LoginComponent from '@/components/LoginComponent.vue'
import VueRouter from 'vue-router'
import authentication from '../../store/modules/authentication'



jest.mock('@/store/modules/authentication')

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('LoginComponent tests', () => {

    test('click sur login avec bon credential devrait renvoyer a l\'acueil', async () => {
        // arrange
        const wrapper = shallowMount(LoginComponent, {
            propsData: {
                newProfile: {
                    email: 'user@uses.com',
                    password: 'password'
                }
            },
            mocks: {
                $store: {
                  dispatch: () => { login: 'authentication/login' }
                },
               
            },
            computed: {
                isLogged() {
                    return true
                }
            },
            localVue,
            router
        })
        const button = wrapper.find('.btn-primary')
        // act
        await button.trigger('click')
        

        // assert
        expect(mock).toHaveBeenCalled()
    })
})