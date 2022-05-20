import Vue from 'vue'
import { config } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'  
import { trailService } from '../trailService.js'
import fakeTrails from '../data/fakeTrails.js'
import fakeParks from '../data/fakeTrails.js'

const flushPromises = require('flush-promises')
jest.mock('@/services/trailService')
let parksList
let trailsList
beforeEach(() => {
  jest.clearAllMocks()
  trailsList = [...fakeTrails]
  parksList = [...fakeParks]
  trailService.getTrails.mockResolvedValue(trailsList)
  trailService.getParks.mockResolvedValue(parksList)
})

describe('trailService', () => {
    test('getTrailsId retourne le bon trail au id passé', async () => {
      const id = 1
      flushPromises()
      const response = await trailService.getTrailsId(id)

      expect(response.name).toBe("Lac-Baie-de-la-Tour")
    })
  
    test('Le liste de ranking est triée', async () => {
      
    })
  })
