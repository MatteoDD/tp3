import { API } from '@/shared/config'
import requestInterceptor from '../shared/requestInterceptor'

async function getTrails () {
  const response = await requestInterceptor.get(`${API}/trails`)
  return response.data
}

async function getParks () {
  const response = await requestInterceptor.get(`${API}/parks`)
  return response.data
}

async function getSegment (id) {
  const response = await requestInterceptor.get(`${API}/segments/${id}`)
  return response.data
}

export default {
  getTrails,
  getParks,
  getSegment
}
