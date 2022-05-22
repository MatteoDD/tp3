import Vue from 'vue'
import { config } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'  
import trailService  from '../trailService.js'
import { fakeTrails } from '@/../tests/data/fakeTrails'
import  { fakeParks } from '@/../tests/data/fakeParks'
import { fakeSegments }  from '@/../tests/data/fakeSegments'
import requestInterceptor from '@/shared/requestInterceptor'


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

    /*
    test('getAllSegments retourne les segment données par la liste', async () => {
        let idList = [0, 1, 2, 3, 4, 5]
        let mock = { data: segmentsList }
        let listAll = segmentsList
        
    
        requestInterceptor.get.mockResolvedValue(mock)
    
        const response = await trailService.getAllSegments(idList)
        console.log(response)
        expect(response).toEqual(listAll)
      })
    */
  })
