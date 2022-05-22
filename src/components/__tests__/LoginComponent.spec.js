import { mount } from '@vue/test-utils'
import LoginComponent from '@/components/LoginComponent.vue'

describe('LoginComponent tests', () => {

    test('click sur login avec bon credential devrait renvoyer a l\'acueil', () => {
        // arrange
        const wrapper = mount(LoginComponent, {
            propsData: {
                newProfile: {
                    email: 'user@uses.com',
                    password: 'password'
                }
            }
        })
        const button = wrapper.find('.button')

        // act
        button.trigger('click')

        // assert
        expect(wrapper.emitted().missionNext).toBeTruthy()
    })
})