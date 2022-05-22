import Vue from 'vue'
import { config } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'  
import  { authService }  from '../authService.js'
import fakeUsers from '../../../tests/data/fakeUser.js'
import { fakeToken } from '@/../tests/data/fakeToken'
import requestInterceptor from '@/shared/requestInterceptor'

const flushPromises = require('flush-promises') 
jest.mock('@/shared/requestInterceptor')
let usersList
let mockToken
beforeEach(() => {
  mockToken = fakeToken
  jest.clearAllMocks()
})

describe('authService', () => {
    test("getToken retourne le token voulu", async () => {
      requestInterceptor.post.mockResolvedValue(mockToken)

      const credential = {
        email: 'a@a.com',
        password: '123456789'
      }
      
      const response = await authService.getToken(credential)
      expect(response).toEqual(mockToken.data.accessToken)
    })

    test("Register retourne le token du nouvel utilisateur", async () => {
      requestInterceptor.post.mockResolvedValue(mockToken)

      const credential = {
        email: 'a@a.com',
        password: '123456789',
        name: 'Matteo'
      }
      
      const response = await authService.register(credential)
      expect(response).toEqual(mockToken.data.accessToken)
    })
  })
