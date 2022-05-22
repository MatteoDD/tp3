import  { userService }  from '../userService.js'
import requestInterceptor from '@/shared/requestInterceptor'
import  { fakeLikeObject } from '@/../tests/data/fakeLikeObject'
import  { fakeUser }  from '@/../tests/data/fakeUser'
import { fakeLikes } from '@/../tests/data/fakeLikes'

const flushPromises = require('flush-promises') 
jest.mock('@/shared/requestInterceptor')
let fakeLikesList
let fakeListUsers
let firstUser 
let firstLike
let fakeLikesIds
beforeEach(() => {
  fakeLikesList = [...fakeLikeObject]
  fakeListUsers = [...fakeUser]
  firstUser = fakeListUsers[0]
  firstLike = fakeLikesList[0]
  fakeLikesIds = fakeLikes
  jest.clearAllMocks()
})


describe('authService', () => {
    test("getUserById retourne le user au id associé", async () => {
        const id = 0
        let mock = { data: fakeListUsers[id] }
        requestInterceptor.get.mockResolvedValue(mock)
        
        const response = await userService.getUserById(id)
        expect(response).toEqual(fakeListUsers[id])
    })

    test("setUser retourne le nouvel utilisateur", async () => {
        let mock = { data: firstUser }
        requestInterceptor.post.mockResolvedValue(mock)
        
        const response = await userService.setUser(mock)
        expect(response).toEqual(firstUser)
    })

    test("sendLike retourne le like qui viens d\'être envoyé", async () => {
        let mock = { data: firstLike }
        requestInterceptor.post.mockResolvedValue(mock)
        
        const response = await userService.sendLike(mock)
        expect(response).toEqual(firstLike)
    })

    test("deleteLike retourne le like qui viens d\'être supprimé", async () => {
        let id = firstUser.id
        let mock = { data: fakeLikesIds }
        requestInterceptor.get.mockResolvedValue(mock)
        
        const response = await userService.getLikes(id)
        expect(response).toEqual(fakeLikesIds)
    })
  })