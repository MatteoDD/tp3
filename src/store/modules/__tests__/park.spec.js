import { fakeParks } from '@/../tests/data/fakeParks'
import { fakeTrails } from '@/../tests/data/fakeTrails'
import { fakeSegments } from '@/../tests/data/fakeSegments'
import { fakeLikes } from '@/../tests/data/fakeLikes'
import trailService  from '../../../services/trailService.js'
import parkStore from '../park.js'

const flushPromises = require('flush-promises')
let fakeListPark
let firstPark
let fakeListTrail
let firstTrail
let fakeSegmentsList
let firstSegment
let fakeLikesList

jest.mock('@/services/trailService')
beforeEach(() => {
  fakeListPark = [...fakeParks] 
  firstPark = { ...fakeParks[0] } 
  fakeListTrail = [...fakeTrails]
  firstTrail = { ...fakeTrails[0] }
  fakeSegmentsList = [...fakeSegments]
  firstSegment = { ...fakeSegments[0] }
  fakeLikesList = [...fakeLikes]
  trailService.getParks.mockResolvedValue(fakeListPark)
  trailService.getTrails.mockResolvedValue(fakeListTrail)
  trailService.getNbLikesAssociated.mockResolvedValue(fakeLikesList)
})

describe('Pqrk store module', () => {
    describe('getters', () => {
      test('getSelectPark doit retourner le park choisi', async () => {
        const state = { selectedPark: firstPark}
        const selectedPark = state.selectedPark
  
        const park = parkStore.getters.getSelectPark(state)
        expect(park).toStrictEqual(selectedPark)
      })

      test('getSelectTrail doit retourner le trail choisi', async () => {
        const state = { selectedTrail: firstTrail}
        const selectedTrail = state.selectedTrail
  
        const trail = parkStore.getters.getSelectTrail(state)
        expect(trail).toStrictEqual(selectedTrail)
      })

      test('getParkList doit retourner la liste de park', async () => {
        const state = { parkList: fakeListPark}
        const list = state.parkList
  
        const park = parkStore.getters.getParkList(state)
        expect(park).toStrictEqual(list)
      })

      test('getTrailList doit retourner la liste de trails', async () => {
        const state = { trailList: fakeListTrail}
        const list = state.trailList
  
        const trail = parkStore.getters.getTrailList(state)
        expect(trail).toStrictEqual(list)
      })

      test('getSegmentsList doit retourner la liste de segments', async () => {
        const state = { segmentList: fakeSegmentsList}
        const list = state.segmentList
  
        const segments = parkStore.getters.getSegmentList(state)
        expect(segments).toStrictEqual(list)
      })
      
      test("getSegments doit retourner la liste de segments d'un trail", async () => {
        const state = { segments: firstTrail.segments}
        const list = state.segments
  
        const segments = parkStore.getters.getSegments(state)
        expect(segments).toStrictEqual(list)
      })

      test("getNbLikesAssociated doit retourner le nombre de like a un trail", async () => {
        const state = { nbLikesAssociated: firstTrail.segments}
        const list = state.nbLikesAssociated
  
        const likes = parkStore.getters.getNbLikesAssociated(state)
        expect(likes).toStrictEqual(list.length)
      })
    })
  
    describe('mutations', () => {
      test('buildParkList doit initialiser la liste de park', async () => {
        const state = { parkList: [] }
        
        parkStore.mutations.buildParkList(state, fakeListPark)
        await flushPromises()
        
        expect(state.parkList).toEqual(fakeListPark)
      })

      test('buildTrailList doit initialiser la liste de trail', async () => {
        const state = { trailList: [] }
        
        parkStore.mutations.buildTrailList(state, fakeListTrail)
        await flushPromises()
        
        expect(state.trailList).toEqual(fakeListTrail)
      })

      test('STORE_PARK change le current Park', async () => {
        const state = { selectedPark: {} }
        
        parkStore.mutations.STORE_PARK(state, firstPark)
        
        expect(state.selectedPark).toEqual(firstPark)
      })

      test('STORE_TRAIL change le current Trail', () => {
        const state = { selectedTrail: {} }
        
        parkStore.mutations.STORE_TRAIL(state, firstTrail)
        
        expect(state.selectedTrail).toEqual(firstTrail)
      })

      test("setOnError doit mettre l'état en erreur", async () => {
        const state = {
          onError: false
        }
  
        parkStore.mutations.setOnError(state)
  
        expect(state.onError).toStrictEqual(true)
      })
    
      test('STORE_SEGMENTS sauvegarde la liste des ID des segments', () => {
        const state = { segments: [] }
        
        parkStore.mutations.STORE_SEGMENTS(state, firstTrail.segments)
        
        expect(state.segments).toEqual(firstTrail.segments)
      })

      test('STORE_SEGLIST sauvegarde les segments', () => {
        const state = { segmentList: [] }
        
        parkStore.mutations.STORE_SEGLIST(state, fakeSegmentsList)
        
        expect(state.segmentList).toEqual(fakeSegmentsList)
      })

      /*
      test('COMPUTE_LIKES_ASSOCIATED fetch le nombre de like associe au trail', async () => {
        const state = { nbLikesAssociated: [] }
        
       // Faut donner acces a la bd ?..
        parkStore.mutations.COMPUTE_LIKES_ASSOCIATED(state)
        await flushPromises()
        
        expect(state.nbLikesAssociated).toEqual(fakeLikesList)
      })
      */
    })

    describe('actions', () => {
        test('initializeParks peut être appelé', async () => {
          const commit = jest.fn()

          trailService.getParks.mockResolvedValue(fakeListPark)

          await parkStore.actions.initializeParks({ commit })
          await flushPromises()
        
          expect(commit).toHaveBeenCalledWith('buildParkList', fakeListPark)

        })

        test('initializeTrails peut être appelé', async () => {
            const commit = jest.fn()
  
            trailService.getTrails.mockResolvedValue(fakeListTrail)
  
            await parkStore.actions.initializeTrails({ commit })
            await flushPromises()
          
            expect(commit).toHaveBeenCalledWith('buildTrailList', fakeListTrail)
  
        })

        test('setPark peut être appelé',  () => {
            const commit = jest.fn()

            parkStore.actions.setPark({ commit }, firstPark)
          
            expect(commit).toHaveBeenCalledWith('STORE_PARK', firstPark)  
        })

        test('setTrail peut être appelé',  async () => {
            const commit = jest.fn()
            
            await trailService.getTrailsId.mockResolvedValue(firstTrail)
            await trailService.getAllSegments.mockResolvedValue(fakeSegmentsList)
            await parkStore.actions.setTrail({ commit }, firstTrail)
            await flushPromises()

            expect(trailService.getTrailsId).toHaveBeenCalled()
            expect(trailService.getAllSegments).toHaveBeenCalled
            expect(commit).toHaveBeenCalledWith('STORE_TRAIL', firstTrail)
            expect(commit).toHaveBeenCalledWith('STORE_SEGMENTS', firstTrail.segments)
            expect(commit).toHaveBeenCalledWith('STORE_SEGLIST', fakeSegmentsList)
        })

        test('getLikesAssociated peut être appelé',  () => {
            const commit = jest.fn()

            parkStore.actions.getLikesAssociated({ commit })
          
            expect(commit).toHaveBeenCalledWith('COMPUTE_LIKES_ASSOCIATED')  
        })
    })
})