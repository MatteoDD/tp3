import { fakeUser } from '@/../tests/data/fakeUser'
import { userService }  from '../../../services/userService.js'
import likeStore from '../likes.js'
import { fakeLikes } from '@/../tests/data/fakeLikes'

const flushPromises = require('flush-promises') 
jest.mock('@/services/userService')
let user
let likesList
let fakeLike
let fakeProfileId
let fakeTrailId
beforeEach(() => {
    user = [...fakeUser]
    likesList = [fakeLikes]
    fakeProfileId = 'fakeID'
    fakeLike = {}
    fakeTrailId = 15
})

describe('like store module', () => {
    describe('getters', () => {
      test('getLikes doit retourner les likes', async () => {
        const state = { likes: likesList}
        const likes = state.likes
  
        const getterLikes = likeStore.getters.getLikes(state)
        expect(getterLikes).toStrictEqual(likes)
      })

      test("getError doit retourner l'etat des erreurs ", async () => {
        const state = { onError: true}
        const stateError = state.onError
  
        const getterError = likeStore.getters.getError(state)
        expect(getterError).toStrictEqual(stateError)
      })
    })

    describe('mutations', () => {
        test("setLike doit set le like ", () => {
            const state = { likeToAdd: {}}
            likeStore.mutations.setLike(state, user)
        
            expect(state.likeToAdd).toEqual(user)
        })

        test("getLike doit get le like ", () => {
            const state = { likes: {}}
            likeStore.mutations.getLikes(state, likesList)
        
            expect(state.likes).toEqual(likesList)
        })

        test("setOnError doit mettre l'état en erreur", async () => {
            const state = {
              onError: false
            }
      
            likeStore.mutations.setOnError(state, true)
      
            expect(state.onError).toStrictEqual(true)
        })

        test("sendLike envoie le like ", async () => {
            const state = { addedLike: {}}
            likeStore.mutations.sendLike(state, fakeLike)
        
            expect(state.addedLike).toEqual(fakeLike)
        })

        test("setProfileId doit get le like ", () => {
            const state = { profileId: ''}
            likeStore.mutations.getLikes(state, fakeProfileId)
        
            expect(state.likes).toEqual(fakeProfileId)
        })

        test("setOnError doit mettre l'état en erreur", async () => {
            const state = {
              onError: false
            }
      
            likeStore.mutations.setOnError(state, true)
      
            expect(state.onError).toStrictEqual(true)
          })
    })

    describe('actions', () => {
        test('like peut être appelé', () => {
          const commit = jest.fn()
          likeStore.actions.like({ commit }, fakeLike)
          
          expect(commit).toHaveBeenCalledWith('setLike', fakeLike)
          expect(commit).toHaveBeenCalledWith('sendLike', Object)

        })

        test('deleteLike peut être appelé', () => {
            const commit = jest.fn()
            likeStore.actions.deleteLike({ commit }, fakeTrailId)
            
            expect(commit).toHaveBeenCalledWith('deleteLike', fakeTrailId)  
        })

        test('initializeLikes peut être appelé', async () => {
            const commit = jest.fn()
            await userService.getLikes.mockResolvedValue(fakeLike)
            likeStore.actions.initializeLikes({ commit }, fakeProfileId)
            await flushPromises()

        
            expect(userService.getLikes).toHaveBeenCalled()    
            expect(commit).toHaveBeenCalledWith('setProfileId', fakeProfileId)  
            expect(commit).toHaveBeenCalledWith('getLikes', fakeLike)  
        })
    })
})