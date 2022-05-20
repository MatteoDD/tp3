import Vue from 'vue'
import { config } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'  
import  { authService }  from '../authService.js'
import fakeUsers from '../data/fakeUser.js'
import token from '../data/fakeToken.js'
import requestInterceptor from '@/shared/requestInterceptor'

jest.mock('@/shared/requestInterceptor')
let usersList
let fakeToken
beforeEach(() => {
  usersList = [...fakeUsers]
  fakeToken = token
  jest.clearAllMocks()
})

describe('authService', () => {
    test("getToken retourne le token voulu", async () => {
        requestInterceptor.post.mockResolvedValue(fakeToken)
        const credential = {
        email: 'mail123@gmail.com',
        password: 'motdepasse'
        }
    const response = await authService.getToken(credential)
    expect(response).toEqual(fakeToken)
    })
  })
