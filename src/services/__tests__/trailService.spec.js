import Vue from 'vue'
import { config } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'  
import trailService  from '../trailService.js'
import fakeTrails from '../data/fakeTrails.js'
import fakeParks from '../data/fakeTrails.js'
import fakeSegments from '../data/fakeSegments.js'
import requestInterceptor from '@/shared/requestInterceptor'
import trails from '../data/fakeTrails.js'

jest.mock('@/shared/requestInterceptor')
let parksList
let segmentsList
let trailsList
beforeEach(() => {
  trailsList = [...fakeTrails]
  parksList = [...fakeParks]
  segmentsList = [...fakeSegments]
  jest.clearAllMocks()
})


describe('trailService', () => {
    test("getTrailById retourne le sentier attaché à l'id", async () => {
        const id = 0
        let mock = { data: trailsList[id] }
        requestInterceptor.get.mockResolvedValue(mock)
    
        const response = await trailService.getTrailsId(id)
        expect(response).toEqual(trailsList[id])
    })
  
    test("getSegmentsId retourne les segments attaché à l'id", async () => {
        const id = 1
        let mock = { data: segmentsList[id] }
        requestInterceptor.get.mockResolvedValue(mock)
    
        const response = await trailService.getSegment(id)
        expect(response).toEqual(segmentsList[id])
    })

    test('getParks retourne une liste de tout les parcs', async () => {
        let mockPark = { data: parksList }
        requestInterceptor.get.mockResolvedValue(mockPark)
    
        const response = await trailService.getParks()
        expect(response).toEqual(parksList)
    })

    test('getTrails retourne une liste de tout les trails', async () => {
        let mockTrails = { data: trailsList }
        requestInterceptor.get.mockResolvedValue(mockTrails)
    
        const response = await trailService.getTrails()
        expect(response).toEqual(trailsList)
    })

    test('getAllSegments retourne les segment données par la liste', async () => {
        let listRandom = [0]
        let mock = { data: segmentsList[0] }
        let listAll = []
        listAll.push(segmentsList[0])
    
        requestInterceptor.get.mockResolvedValue(mock)
    
        const response = await trailService.getAllSegments(listRandom)
        expect(response).toEqual(listAll)
      })
  })
